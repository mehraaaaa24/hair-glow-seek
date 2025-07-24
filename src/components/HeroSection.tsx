import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const HeroSection = () => {
  const scrollToExperts = () => {
    document.getElementById('experts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.2),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto fade-in">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-allenoire font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Verified Hair Experts.
            </span>
            <br />
            <span className="text-foreground">
              Trusted Treatments.
            </span>
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Book Instantly.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-inter leading-relaxed">
            Discover India's best dermatologists, trichologists, and clinics. 
            <br />
            <span className="text-primary">Verified. Transparent. Instant.</span>
          </p>

          {/* Search Section */}
          <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 glow-primary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    placeholder="Search treatments or specialists" 
                    className="pl-10 h-12 bg-input border-border text-foreground"
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <Select>
                  <SelectTrigger className="h-12 bg-input border-border text-foreground">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-1">
                <Button 
                  onClick={() => window.location.href = '/auth/customer'}
                  className="w-full h-12 bg-gradient-primary hover:scale-105 transition-transform glow-primary text-lg font-semibold"
                >
                  Start Your Hair Journey
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>500+ Verified Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>50,000+ Successful Treatments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>25+ Cities Covered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;