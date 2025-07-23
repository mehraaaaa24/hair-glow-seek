import { CheckCircle, Star, Zap } from "lucide-react";

const TrustSection = () => {
  const trustPoints = [
    {
      icon: CheckCircle,
      title: "Verified Doctors",
      description: "Licensed and Clinic-Inspected",
      color: "text-green-400"
    },
    {
      icon: Star,
      title: "Transparent Reviews",
      description: "No fake reviews. Real patients only.",
      color: "text-yellow-400"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Live calendar sync. No back-and-forth.",
      color: "text-blue-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-allenoire font-bold mb-6">
            Why Trust <span className="bg-gradient-primary bg-clip-text text-transparent">JustHair?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform ${point.color}`}>
                <point.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-allenoire font-bold mb-4 text-foreground">
                {point.title}
              </h3>
              
              <p className="text-lg text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => document.getElementById('experts')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-primary text-white px-10 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform glow-primary"
          >
            Start Your Hair Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;