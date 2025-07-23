import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-allenoire font-bold bg-gradient-primary bg-clip-text text-transparent">
              JustHair
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('experts')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Find Experts
            </button>
            <button 
              onClick={() => scrollToSection('treatments')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Treatments
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden sm:inline-flex"
              onClick={() => window.location.href = '/auth/customer'}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-primary hover:scale-105 transition-transform glow-primary"
              onClick={() => window.location.href = '/auth/expert'}
            >
              Join as Expert
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;