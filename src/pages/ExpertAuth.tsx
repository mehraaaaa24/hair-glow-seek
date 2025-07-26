import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

const expertSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  specialization: z.enum(['trichologist', 'dermatologist', 'surgeon', 'hair_stylist']).refine(val => val !== undefined, {
    message: 'Please select a specialization',
  }),
  clinicName: z.string().min(2, 'Clinic name must be at least 2 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  yearsExperience: z.number().min(0, 'Years of experience must be 0 or more'),
  startingPrice: z.number().min(1, 'Starting price must be at least ₹1'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type ExpertFormData = z.infer<typeof expertSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const ExpertAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const treatments = [
    'Hair fall', 'PRP', 'Styling', 'Hair Transplant', 
    'Ayurveda', 'Beard Restoration', 'Dandruff', 'Hair Spa'
  ];

  const signUpForm = useForm<ExpertFormData>({
    resolver: zodResolver(expertSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      clinicName: '',
      city: '',
      yearsExperience: 0,
      startingPrice: 500,
      password: '',
    },
    mode: 'onChange',
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const toggleTreatment = (treatment: string) => {
    setSelectedTreatments(prev => 
      prev.includes(treatment) 
        ? prev.filter(t => t !== treatment)
        : [...prev, treatment]
    );
  };

  const onSignUp = async (data: ExpertFormData) => {
    if (selectedTreatments.length === 0) {
      toast({
        title: 'Please select at least one treatment',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Create profile after successful signup
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            user_type: 'expert',
            full_name: data.fullName,
            phone_number: data.phoneNumber,
            email: data.email,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      toast({
        title: 'Expert profile submitted!',
        description: 'You can now access your dashboard.',
      });

      // Navigate after a short delay to allow auth state to update
      setTimeout(() => {
        navigate('/dashboard-expert');
      }, 500);
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: 'Welcome back!',
        description: 'Successfully signed in.',
      });

      // Navigate after a short delay to allow auth state to update
      setTimeout(() => {
        navigate('/dashboard-expert');
      }, 500);
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-allenoire text-foreground">
            {isLogin ? 'Welcome Back' : 'Join as a Verified JustHair Expert'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin ? 'Access your expert dashboard' : 'Grow your hair care practice with verified visibility and direct bookings.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isLogin ? (
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={signUpForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signUpForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="doctor@clinic.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a secure password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={signUpForm.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="trichologist">Trichologist</SelectItem>
                            <SelectItem value="dermatologist">Dermatologist</SelectItem>
                            <SelectItem value="surgeon">Hair Surgeon</SelectItem>
                            <SelectItem value="hair_stylist">Hair Stylist</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={signUpForm.control}
                    name="clinicName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clinic / Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Hair Care Clinic" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={signUpForm.control}
                  name="startingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Starting Price (INR)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="500" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <FormLabel>Treatments Offered</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {treatments.map((treatment) => (
                      <Badge
                        key={treatment}
                        variant={selectedTreatments.includes(treatment) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
                        onClick={() => toggleTreatment(treatment)}
                      >
                        {treatment}
                        {selectedTreatments.includes(treatment) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium h-12 rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting Profile...' : 'Submit Profile & Join JustHair'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  We verify all experts within 24 hours
                </p>
              </form>
            </Form>
          ) : (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium h-12 rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          )}
          
          <div className="text-center">
            <button
              onClick={() => {
                const newLoginState = !isLogin;
                setIsLogin(newLoginState);
                setIsLoading(false);
                // Reset selected treatments for expert signup
                setSelectedTreatments([]);
                // Force re-render with a small delay to ensure state is updated
                setTimeout(() => {
                  if (newLoginState) {
                    loginForm.reset({
                      email: '',
                      password: '',
                    });
                  } else {
                    signUpForm.reset({
                      fullName: '',
                      phoneNumber: '',
                      email: '',
                      clinicName: '',
                      city: '',
                      yearsExperience: 0,
                      startingPrice: 500,
                      password: '',
                    });
                  }
                }, 0);
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              disabled={isLoading}
            >
              {isLogin ? "Don't have an account? Join as Expert" : 'Already have an account? Log in'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertAuth;