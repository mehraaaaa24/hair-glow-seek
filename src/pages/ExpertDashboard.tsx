import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Eye, 
  Star, 
  Edit, 
  Share, 
  FileText, 
  CreditCard,
  LogOut,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Profile {
  full_name: string;
  email: string;
}

const ExpertDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else if (!authLoading && !user) {
      // Redirect to auth if no user and not loading
      window.location.href = '/auth/expert';
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

  const doctorName = profile?.full_name || 'Doctor';
  const firstName = doctorName.split(' ')[0];

  const metrics = [
    {
      title: 'Appointments this Week',
      value: '24',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Profile Views',
      value: '156',
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Pending Reviews',
      value: '3',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  const recentReviews = [
    {
      patient: 'Priya S.',
      rating: 5,
      comment: 'Excellent treatment for hair fall. Very professional and caring.',
      date: '2 days ago'
    },
    {
      patient: 'Rahul M.',
      rating: 5,
      comment: 'Amazing PRP treatment results. Highly recommended!',
      date: '1 week ago'
    },
    {
      patient: 'Sneha K.',
      rating: 4,
      comment: 'Good consultation and clear explanation of the treatment plan.',
      date: '2 weeks ago'
    }
  ];

  const upcomingAppointments = [
    { time: '10:00 AM', patient: 'Amit Sharma', treatment: 'Hair Consultation' },
    { time: '11:30 AM', patient: 'Riya Patel', treatment: 'PRP Treatment' },
    { time: '2:00 PM', patient: 'Vikash Kumar', treatment: 'Follow-up' },
    { time: '3:30 PM', patient: 'Neha Singh', treatment: 'Hair Styling' }
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
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                  👩‍⚕️
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-allenoire text-foreground">
                  Hi Dr. {firstName} 👩‍⚕️
                </h1>
                <p className="text-muted-foreground">
                  Here's an overview of your JustHair profile
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button variant="ghost" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metrics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Calendar Preview */}
          <Card className="bg-card/80 backdrop-blur-xl border border-border/50">
            <CardHeader>
              <CardTitle className="font-allenoire text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-primary font-medium">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.treatment}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest Reviews */}
          <Card className="bg-card/80 backdrop-blur-xl border border-border/50">
            <CardHeader>
              <CardTitle className="font-allenoire text-xl flex items-center gap-2">
                <Star className="w-5 h-5" />
                Latest Patient Reviews
              </CardTitle>
              <CardDescription>Recent feedback from your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{review.patient}</span>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button className="h-16 bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              <Share className="w-5 h-5" />
              <span className="font-medium">Share Your Public Profile</span>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-br from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground shadow-lg hover:shadow-accent/25 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="font-medium">View Treatment Plans</span>
            </div>
          </Button>
          
          <Button className="h-16 bg-gradient-to-br from-secondary to-muted hover:from-secondary/90 hover:to-muted/90 text-secondary-foreground shadow-lg hover:shadow-secondary/25 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">View Subscription</span>
            </div>
          </Button>
        </div>

        {/* Performance Insights */}
        <Card className="bg-card/80 backdrop-blur-xl border border-border/50">
          <CardHeader>
            <CardTitle className="font-allenoire text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Overview
            </CardTitle>
            <CardDescription>Your JustHair profile performance this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-green-500 mb-1">89%</div>
                <div className="text-sm text-muted-foreground">Booking Rate</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-500 mb-1">247</div>
                <div className="text-sm text-muted-foreground">Total Patients</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">₹45k</div>
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertDashboard;