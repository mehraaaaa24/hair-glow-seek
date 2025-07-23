import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, CalendarCheck, Wallet, BarChart } from "lucide-react";

const ExpertBenefits = () => {
  const benefits = [
    {
      icon: Briefcase,
      title: "Get Verified Visibility",
      description: "Appear in a curated list of India's best hair professionals. Build trust instantly with verified listings.",
      color: "text-purple-400",
      bg: "from-purple-500/20 to-primary/20"
    },
    {
      icon: CalendarCheck,
      title: "Fill Your Calendar",
      description: "Let patients book real-time slots — no more chasing DMs or manual confirmations.",
      color: "text-green-400",
      bg: "from-green-500/20 to-primary/20"
    },
    {
      icon: Wallet,
      title: "Flat ₹500/month Plan",
      description: "No commission, no hidden fees — just steady bookings for a flat subscription.",
      color: "text-blue-400",
      bg: "from-blue-500/20 to-primary/20"
    },
    {
      icon: BarChart,
      title: "Your Practice, Powered",
      description: "Get reviews, insights, and patient loyalty — all from one clean dashboard.",
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-primary/20"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-allenoire font-bold mb-6">
            Why Hair Experts Choose <span className="bg-gradient-secondary bg-clip-text text-transparent">JustHair</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join India's most trusted platform for hair care professionals and grow your practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:glow-primary">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.bg} group-hover:animate-pulse`}>
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
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

        <div className="text-center mt-12">
          <button className="bg-gradient-primary text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform glow-primary">
            Join as Expert - ₹500/month
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExpertBenefits;