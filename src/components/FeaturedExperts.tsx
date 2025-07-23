import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, ShieldCheck } from "lucide-react";

const FeaturedExperts = () => {
  const experts = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Trichologist & Hair Transplant",
      city: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviews: 342,
      price: "₹1,200",
      verified: true
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Dermatologist",
      city: "Delhi",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      reviews: 256,
      price: "₹800",
      verified: true
    },
    {
      id: 3,
      name: "Dr. Anita Desai",
      specialization: "Hair Loss Specialist",
      city: "Bangalore",
      avatar: "https://images.unsplash.com/photo-1594824985128-28b529d650b5?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviews: 189,
      price: "₹950",
      verified: true
    },
    {
      id: 4,
      name: "Dr. Vikram Singh",
      specialization: "PRP & Mesotherapy",
      city: "Chennai",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      rating: 4.7,
      reviews: 203,
      price: "₹1,500",
      verified: true
    }
  ];

  return (
    <section id="experts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-allenoire font-bold mb-6">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Hair Experts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet our top-rated professionals who deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert) => (
            <Card key={expert.id} className="group hover:scale-105 transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:glow-primary overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-20 h-20 border-2 border-primary/50">
                    <AvatarImage src={expert.avatar} alt={expert.name} />
                    <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {expert.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="font-allenoire font-bold text-lg text-foreground mb-1">
                  {expert.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {expert.specialization}
                </p>

                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{expert.city}</span>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-foreground">{expert.rating}</span>
                    <span className="text-sm text-muted-foreground">({expert.reviews})</span>
                  </div>
                  
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                    {expert.price}
                  </Badge>
                </div>

                {expert.verified && (
                  <Badge className="w-full justify-center bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified Expert
                  </Badge>
                )}
              </CardContent>

              <CardFooter className="px-6 pt-0">
                <Button className="w-full bg-gradient-primary hover:scale-105 transition-transform glow-primary">
                  Book Appointment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 border-primary/50 text-primary hover:bg-primary hover:text-white">
            View All Experts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperts;