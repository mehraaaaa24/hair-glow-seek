import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  MessageCircle, 
  Heart, 
  Search, 
  Star, 
  MapPin, 
  PhoneCall,
  HelpCircle,
  FileText,
  LogOut
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Profile {
  full_name: string;
  email: string;
}

const CustomerDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else if (!authLoading && !user) {
      // Redirect to auth if no user and not loading
      window.location.href = '/auth/customer';
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out successfully',
      description: 'You have been logged out of your account.',
    });
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'User';

  const featuredExperts = [
    {
      name: 'Dr. Priya Sharma',
      specialization: 'Trichologist',
      city: 'Mumbai',
      rating: 4.9,
      reviews: 342,
      price: '₹800',
      image: 'PS'
    },
    {
      name: 'Dr. Rajesh Kumar',
      specialization: 'Hair Surgeon',
      city: 'Delhi',
      rating: 4.8,
      reviews: 567,
      price: '₹1200',
      image: 'RK'
    },
    {
      name: 'Dr. Meera Patel',
      specialization: 'Dermatologist',
      city: 'Bangalore',
      rating: 4.9,
      reviews: 445,
      price: '₹900',
      image: 'MP'
    }
  ];

  const treatments = [
    'PRP Treatment', 'Hair Styling', 'Ayurveda', 'Hair Spa', 'Beard Care'
  ];

  const blogArticles = [
    'Top 5 Hair Care Tips for Monsoon Season',
    'Understanding Hair Loss: Causes and Solutions',
    'PRP Treatment: Everything You Need to Know'
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-xl border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-allenoire text-foreground">
                Welcome, {firstName}! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's everything you need for your hair journey.
              </p>
            </div>
            <Button variant="ghost" onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search Bar */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/50">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search experts, clinics, or treatments" 
                className="pl-10 h-12 text-base bg-background/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button className="h-20 bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="font-medium">View Appointments</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-gradient-to-br from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground shadow-lg hover:shadow-accent/25 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <span className="font-medium">Messages</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-gradient-to-br from-secondary to-muted hover:from-secondary/90 hover:to-muted/90 text-secondary-foreground shadow-lg hover:shadow-secondary/25 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-6 h-6" />
              <span className="font-medium">Saved Experts</span>
            </div>
          </Button>
        </div>

        {/* Recommended Experts */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/50">
          <CardHeader>
            <CardTitle className="font-allenoire text-xl">Recommended Experts Near You</CardTitle>
            <CardDescription>Top-rated hair care professionals in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredExperts.map((expert, index) => (
                <Card key={index} className="bg-background/50 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {expert.image}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{expert.name}</h3>
                        <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {expert.city}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{expert.rating}</span>
                        <span className="text-muted-foreground">({expert.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">{expert.price}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Book Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Treatments */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/50">
          <CardHeader>
            <CardTitle className="font-allenoire text-xl">Popular Treatments</CardTitle>
            <CardDescription>Explore the most sought-after hair care services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {treatments.map((treatment, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {treatment}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Blog */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/50">
          <CardHeader>
            <CardTitle className="font-allenoire text-xl">Latest Health Articles</CardTitle>
            <CardDescription>Stay informed with expert insights and tips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blogArticles.map((article, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30 hover:border-primary/50 transition-colors cursor-pointer">
                  <span className="text-foreground font-medium">{article}</span>
                  <Button variant="ghost" size="sm">Read More</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="bg-card/50 backdrop-blur-xl border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <PhoneCall className="w-4 h-4" />
              Support
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <Calendar className="w-4 h-4" />
              Book Expert
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <FileText className="w-4 h-4" />
              Terms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;