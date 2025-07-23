import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShieldCheck, Star, Clock, Gift } from "lucide-react";

const CustomerBenefits = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Verified Clinics Only",
      description: "Every expert is credential-checked and clinic-verified — no fake listings.",
      glowColor: "glow-success"
    },
    {
      icon: Star,
      title: "Transparent Ratings",
      description: "Read real reviews from real patients. No paid placements, no manipulation.",
      glowColor: "glow-warning"
    },
    {
      icon: Clock,
      title: "Book in Seconds",
      description: "Skip the DM game. Select your service, pick a time, and you're booked.",
      glowColor: "glow-primary"
    },
    {
      icon: Gift,
      title: "Deals You Can Trust",
      description: "Access exclusive offers directly from clinics — no middlemen markup.",
      glowColor: "glow-secondary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-allenoire font-bold mb-6">
            Why Book Through <span className="bg-gradient-primary bg-clip-text text-transparent">JustHair?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've reimagined hair care booking to put transparency, trust, and convenience first
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className={`group hover:scale-105 transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:${benefit.glowColor}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:animate-pulse`}>
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-allenoire font-bold text-foreground">
                    {benefit.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerBenefits;