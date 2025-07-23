import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, Calendar, MessageCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search",
      description: "Find verified hair experts in your city using our smart search filters.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Compare",
      description: "View profiles, read genuine reviews, and compare prices transparently.",
      color: "text-secondary"
    },
    {
      icon: Calendar,
      title: "Book",
      description: "Select available slots and book instantly with live calendar sync.",
      color: "text-green-400"
    },
    {
      icon: MessageCircle,
      title: "Consult",
      description: "Meet your expert and get the best hair care treatment you deserve.",
      color: "text-yellow-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-allenoire font-bold mb-6">
            How It <span className="bg-gradient-primary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting the perfect hair treatment is now as simple as ordering food online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-background to-muted mb-6 group-hover:animate-pulse ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-allenoire font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;