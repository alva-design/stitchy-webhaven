
import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = ((clientX - left) / width - 0.5) * 5; // Reduced movement factor
      const y = ((clientY - top) / height - 0.5) * 5;
      
      const titleElement = heroRef.current.querySelector('.hero-title');
      const subtitleElement = heroRef.current.querySelector('.hero-subtitle');
      const imageElement = heroRef.current.querySelector('.hero-image-inner');
      
      if (titleElement) {
        (titleElement as HTMLElement).style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
      }
      
      if (subtitleElement) {
        (subtitleElement as HTMLElement).style.transform = `translate(${-x * 1}px, ${-y * 1}px)`;
      }
      
      if (imageElement) {
        (imageElement as HTMLElement).style.transform = `translate(${-x * 3}px, ${-y * 3}px) scale(1.05)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-embroidery-cream z-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }} />
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 pt-20 md:pt-0">
          <div className="transition-all duration-300 ease-out">
            <span className="inline-block px-3 py-1 text-xs tracking-wider bg-embroidery-beige/50 backdrop-blur-sm text-embroidery-charcoal rounded-full mb-6 animate-fade-in">
              HANTVERK BRODERI
            </span>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-embroidery-charcoal leading-tight transition-transform duration-200 ease-out animate-fade-in">
              Tidlös Skönhet<br />Broderad för Hand
            </h1>
            <p className="hero-subtitle mt-6 text-embroidery-charcoal/70 max-w-md transition-transform duration-200 ease-out animate-fade-in opacity-0 animation-delay-200" style={{ animationDelay: '200ms' }}>
              Utsökt handgjort broderi som förvandlar vanliga material till eleganta, personliga konstverk.
            </p>
            
            <div className="mt-10 animate-fade-in opacity-0" style={{ animationDelay: '400ms' }}>
              <a href="#gallery" className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-embroidery-charcoal bg-embroidery-beige rounded-md group mr-4">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-embroidery-gold rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="relative">Se Galleriet</span>
              </a>
              
              <a href="#contact" className="relative inline-block text-embroidery-charcoal hover:text-embroidery-gold transition-colors duration-300 btn-hover">
                Kontakta Oss
              </a>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-12 md:mt-0 hero-image">
          <div className="w-full h-full max-w-lg mx-auto relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 border border-embroidery-gold opacity-40 animate-float"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-embroidery-gold opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative overflow-hidden rounded-md shadow-xl">
              <div className="absolute inset-0 bg-embroidery-gold opacity-10"></div>
              <div className="hero-image-inner transition-transform duration-200 ease-out">
                <img 
                  src="https://drive.google.com/uc?export=view&id=1KlScmSWBYuM76RO71RZAScQjc9DpN5N2" 
                  alt="Elegant broderiverk på tyg"
                  className="w-full h-full object-cover filter brightness-95"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-fade-in opacity-0" style={{ animationDelay: '800ms' }}>
        <p className="text-xs text-embroidery-charcoal/60 tracking-widest mb-2">SCROLLA</p>
        <div className="w-0.5 h-10 bg-gradient-to-b from-embroidery-charcoal/5 to-embroidery-charcoal/30"></div>
      </div>
    </section>
  );
};

export default Hero;
