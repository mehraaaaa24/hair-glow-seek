import { Badge } from "@/components/ui/badge";

const TreatmentCategories = () => {
  const treatments = [
    "PRP Treatment",
    "Hair Transplant", 
    "Dandruff Treatment",
    "Hair Styling",
    "Ayurvedic Treatment",
    "Hair Fall Control",
    "Scalp Treatment",
    "Hair Spa",
    "Keratin Treatment",
    "Hair Coloring",
    "Beard Transplant",
    "Laser Treatment"
  ];

  return (
    <section id="treatments" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-allenoire font-bold mb-6">
            Popular <span className="bg-gradient-secondary bg-clip-text text-transparent">Treatments</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the most sought-after hair care services available on our platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {treatments.map((treatment, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="px-6 py-3 text-lg font-medium bg-card/80 backdrop-blur-sm border-border/50 hover:bg-gradient-primary hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer glow-primary"
              >
                {treatment}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for?
          </p>
          <button className="text-primary hover:text-secondary transition-colors font-semibold">
            Browse All Treatments →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TreatmentCategories;