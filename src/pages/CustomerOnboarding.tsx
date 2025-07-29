import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';

// --- SCHEMAS ---
const countryPhoneLengths: Record<string, number> = {
  '+91': 10, // India
  '+1': 10,  // US/Canada
  '+44': 10, // UK (simplified)
  '+61': 9,  // Australia (simplified)
};
const page1Schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  countryCode: z.enum(['+91', '+1', '+44', '+61']),
  phone: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
}).superRefine((val, ctx) => {
  const len = countryPhoneLengths[val.countryCode];
  if (val.phone.length !== len || !/^\d+$/.test(val.phone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number for selected country',
      path: ['phone'],
    });
  }
});
const page2Schema = z.object({
  age: z.string().min(1, 'Required'),
  gender: z.enum(['male', 'female', 'nonbinary', 'prefer_not_to_say']),
  city: z.string().min(1, 'Required'),
});
const page3Schema = z.object({
  hairConcerns: z.array(z.string()).min(1, 'Select at least one'),
  hairType: z.enum(['straight', 'wavy', 'curly', 'coily']),
  agree: z.boolean().refine(val => val === true, { message: 'You must agree to continue' }),
  promo: z.boolean().optional(),
});

// --- MAIN COMPONENT ---
const CustomerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [page1, setPage1] = useState(null);
  const [page2, setPage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Page 1: Account Info + Social
  const form1 = useForm<z.infer<typeof page1Schema>>({ resolver: zodResolver(page1Schema), defaultValues: { name: '', email: '', countryCode: '+91', phone: '', password: '' } });
  // Page 2: Demographics
  const form2 = useForm<z.infer<typeof page2Schema>>({ resolver: zodResolver(page2Schema), defaultValues: { age: '', gender: 'male', city: '' } });
  // Page 3: Hair Profile
  const form3 = useForm({ resolver: zodResolver(page3Schema), defaultValues: { hairConcerns: [], hairType: 'straight', agree: false, promo: false } });

  // --- SOCIAL LOGIN HANDLERS ---
  const handleSocial = async (provider: 'google' | 'facebook' | 'apple') => {
    // Use current origin + onboarding path for redirect
    const redirectTo = `${window.location.origin}/auth/customer`;
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
  };
  // --- ON MOUNT: If user is already authenticated, skip to step 2 ---
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setStep(2);
      }
    };
    checkAuth();
  }, []);

  // --- PAGE 1 SUBMIT ---
  const onPage1 = (data: any) => {
    setPage1(data);
    setStep(2);
  };
  // --- PAGE 2 SUBMIT ---
  const onPage2 = (data: any) => {
    setPage2(data);
    setStep(3);
  };
  // --- PAGE 3 SUBMIT ---
  const onPage3 = async (data: any) => {
    setIsLoading(true);
    // Combine all data
    const payload = { ...page1, ...page2, ...data };
    // Combine country code and phone for Supabase
    const fullPhone = `${payload.countryCode}${payload.phone}`;
    // Sign up with Supabase
    const { error, data: signUpData } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      phone: fullPhone,
    });
    // Optionally: Save demographics/hair profile to a user profile table
    setIsLoading(false);
    if (!error) {
      // Success: redirect to customer dashboard
      navigate('/dashboard-customer');
    } else {
      alert(error.message);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md bg-card/80 p-8 rounded-xl shadow-xl">
        {step === 1 && (
          <Form {...form1} key="page1">
            <form onSubmit={form1.handleSubmit(onPage1)} className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Start Your Hair Journey</h2>
              <FormField control={form1.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input type="text" placeholder="Enter your name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form1.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl><Input type="email" placeholder="Enter your email address" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex flex-col gap-1">
                <FormLabel>Phone number</FormLabel>
                <div className="flex w-full rounded-lg overflow-hidden border border-muted-foreground/30 bg-black">
                  <FormField control={form1.control} name="countryCode" render={({ field }) => (
                    <FormItem className="w-36 flex-shrink-0">
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-full bg-black text-white px-3 py-2 focus:outline-none focus:bg-zinc-900 border-0 border-r border-muted-foreground/30 appearance-none font-medium"
                        >
                          <option value="+91">IN (+91)</option>
                          <option value="+1">US (+1)</option>
                          <option value="+44">UK (+44)</option>
                          <option value="+61">AUS (+61)</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form1.control} name="phone" render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <input
                          type="tel"
                          maxLength={countryPhoneLengths[form1.watch('countryCode')]}
                          placeholder="Add your phone number"
                          className="w-full h-full bg-black text-white px-3 py-2 focus:outline-none focus:bg-zinc-900 border-0"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>
                {/* Error message for phone field, shown below the group */}
                <div className="flex gap-2">
                  <div className="w-36"></div>
                  <div className="flex-1">
                    {/* Place FormMessage inside the phone FormField render so it works correctly */}
                    {form1.formState.errors.phone && (
                      <p className="text-sm text-destructive mt-1">{form1.formState.errors.phone.message as string}</p>
                    )}
                  </div>
                </div>
              </div>
              <FormField control={form1.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" placeholder="Create a password" value={field.value || ''} onChange={field.onChange} /> </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex flex-col gap-2">
                <Button type="button" variant="outline" onClick={() => handleSocial('google')}>Continue with Google</Button>
                <Button type="button" variant="outline" onClick={() => handleSocial('facebook')}>Continue with Facebook</Button>
                <Button type="button" variant="outline" onClick={() => handleSocial('apple')}>Continue with Apple</Button>
              </div>
              <Button type="submit" className="w-full">Continue</Button>
              <div className="text-center mt-2">
                <a href="/auth/customer" className="text-sm text-muted-foreground hover:text-primary">Already a user? Login</a>
              </div>
            </form>
          </Form>
        )}
        {step === 2 && (
          <Form {...form2} key="page2">
            <form onSubmit={form2.handleSubmit(onPage2)} className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Tell Us About You</h2>
              <FormField control={form2.control} name="age" render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl><Input type="number" min="1" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form2.control} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label><input type="radio" value="male" checked={field.value === 'male'} onChange={field.onChange} /> Male</label>
                      <label><input type="radio" value="female" checked={field.value === 'female'} onChange={field.onChange} /> Female</label>
                      <label><input type="radio" value="nonbinary" checked={field.value === 'nonbinary'} onChange={field.onChange} /> Non-binary</label>
                      <label><input type="radio" value="prefer_not_to_say" checked={field.value === 'prefer_not_to_say'} onChange={field.onChange} /> Prefer not to say</label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form2.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>City or Postal Code</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full">Next</Button>
            </form>
          </Form>
        )}
        {step === 3 && (
          <Form {...form3} key="page3">
            <form onSubmit={form3.handleSubmit(onPage3)} className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Your Hair Profile</h2>
              <FormField control={form3.control} name="hairConcerns" render={({ field }) => (
                <FormItem>
                  <FormLabel>Hair Concerns</FormLabel>
                  <FormControl>
                    <select multiple value={field.value} onChange={e => field.onChange(Array.from(e.target.selectedOptions, o => o.value))} className="w-full bg-background border p-2 rounded">
                      <option value="hair_fall">Hair Fall</option>
                      <option value="balding">Balding</option>
                      <option value="greying">Greying</option>
                      <option value="dandruff">Dandruff</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form3.control} name="hairType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Hair Type</FormLabel>
                  <FormControl>
                    <select value={field.value} onChange={field.onChange} className="w-full bg-background border p-2 rounded">
                      <option value="straight">Straight</option>
                      <option value="wavy">Wavy</option>
                      <option value="curly">Curly</option>
                      <option value="coily">Coily</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form3.control} name="agree" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={!!field.value} onChange={e => field.onChange(e.target.checked)} required />
                      I agree to the Terms & Conditions and Privacy Policy
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form3.control} name="promo" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={!!field.value} onChange={e => field.onChange(e.target.checked)} />
                      I’d like to receive occasional promotional offers
                    </label>
                  </FormControl>
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Finishing...' : 'Finish Onboarding'}</Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CustomerOnboarding;
