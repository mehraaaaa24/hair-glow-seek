
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';


const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const CustomerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Redirect to dashboard if already authenticated (e.g. after Google OAuth), but only if not already on dashboard
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user && location.pathname !== '/dashboard-customer') {
        navigate('/dashboard-customer');
      }
    };
    checkSession();
  }, [navigate, location.pathname]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);
    if (!error) {
      navigate('/dashboard-customer');
    } else {
      alert(error.message);
    }
  };

  const handleSocial = async (provider: 'google') => {
    const redirectTo = `${window.location.origin}/login/customer`;
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md bg-card/80 p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Customer Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl><Input type="email" placeholder="Enter your email address" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" placeholder="Enter your password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
          </form>
        </Form>
        <div className="flex flex-col gap-2 mt-6">
          <Button type="button" variant="outline" onClick={() => handleSocial('google')}>Continue with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
