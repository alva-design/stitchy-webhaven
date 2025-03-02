
import { useRef, useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from '@/components/ui/use-toast';

// Initialize Stripe - this is a publishable key, safe to include in client code
const stripePromise = loadStripe('pk_test_51YOURSTRIPEPUBLISHABLEKEY');

const services = [
  {
    id: 1,
    icon: <Scissors className="h-6 w-6" />,
    title: "Företagsloggor",
    description: "Professionella broderier av din företagslogga på kläder, accessoarer och profilprodukter."
  },
  {
    id: 2,
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
    </svg>,
    title: "Skräddarsydd Design",
    description: "Anpassade broderier med upp till 15 färger för unika, detaljrika mönster och illustrationer."
  },
  {
    id: 3,
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    title: "Högkvalitativa Material",
    description: "Vi använder endast premiumtrådar och material för hållbara broderier med levande färger."
  },
  {
    id: 4,
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>,
    title: "Hemtextilier",
    description: "Dekorativa broderier för kuddar, handdukar, dukar och andra textilier till hemmet."
  },
  {
    id: 5,
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>,
    title: "Företagsgåvor",
    description: "Profilerade produkter med broderade loggor och motiv för gåvor och marknadsföring."
  },
  {
    id: 6,
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
    title: "Produktförädling",
    description: "Förvandla vanliga produkter till unika, attraktiva varor med broderade konstnärliga detaljer."
  }
];

const products = [
  {
    id: 1,
    image: "/lovable-uploads/9c38391c-696a-488b-bb6e-905aa7136ebd.png",
    title: "Personlig Tygväska",
    description: "Tygväska med ditt namn eller valfritt broderi, perfekt för vardagsbruk.",
    price: "299 kr",
    priceId: "price_1YOURPRICEID1", // This would be your actual Stripe price ID
  },
  {
    id: 2,
    image: "/lovable-uploads/9c38391c-696a-488b-bb6e-905aa7136ebd.png",
    title: "Broderad Necessär",
    description: "Stilfull necessär med unika broderier, perfekt för resan eller som present.",
    price: "249 kr",
    priceId: "price_1YOURPRICEID2", // This would be your actual Stripe price ID
  },
  {
    id: 3,
    image: "/lovable-uploads/9c38391c-696a-488b-bb6e-905aa7136ebd.png",
    title: "Anpassad Shoppingväska",
    description: "Slitstark och rymlig shoppingväska med plats för din unika design.",
    price: "349 kr",
    priceId: "price_1YOURPRICEID3", // This would be your actual Stripe price ID
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shopRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isShopInView, setIsShopInView] = useState(false);
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          servicesObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const shopObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsShopInView(true);
          shopObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      servicesObserver.observe(sectionRef.current);
    }

    if (shopRef.current) {
      shopObserver.observe(shopRef.current);
    }

    return () => {
      servicesObserver.disconnect();
      shopObserver.disconnect();
    };
  }, []);

  const handleCheckout = async (priceId: string, productId: number) => {
    setIsLoading(productId);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");
      
      // Create a checkout session via our API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const session = await response.json();
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte starta betalningsflödet. Vänligen försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <>
      <section 
        id="services" 
        ref={sectionRef}
        className="relative py-24 px-6 md:px-12 lg:px-24 bg-embroidery-cream"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-xs tracking-wider bg-embroidery-beige/50 backdrop-blur-sm text-embroidery-charcoal rounded-full mb-6">
                VÅRA TJÄNSTER
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-embroidery-charcoal">
                Precision i varje stygn
              </h2>
              <div className="w-16 h-0.5 bg-embroidery-gold/40 mx-auto my-6"></div>
              <p className="text-embroidery-charcoal/70">
                Från företagsloggor till konstnärliga detaljer, våra moderna broderimaskiner 
                skapar dekorativa broderier med upp till 15 färger för alla typer av textilier.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className={`bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 group ${
                    isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transitionDuration: '700ms' 
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-embroidery-beige/50 flex items-center justify-center mb-6 text-embroidery-charcoal group-hover:bg-embroidery-gold/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif text-embroidery-charcoal mb-3 group-hover:text-embroidery-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-embroidery-charcoal/70">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-white rounded-lg p-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-3/4 mb-8 md:mb-0 md:pr-12">
                  <h3 className="text-2xl font-serif text-embroidery-charcoal mb-4">
                    Letar du efter en skräddarsydd tjänst?
                  </h3>
                  <p className="text-embroidery-charcoal/70">
                    Vi älskar att förverkliga unika visioner. Som ett litet företag kan vi erbjuda dig personlig service
                    och nära samarbete genom hela processen. Kontakta oss för att diskutera ditt broderi-projekt,
                    och vi skapar något som är perfekt anpassat efter dina behov.
                  </p>
                </div>
                <div className="md:w-1/4 flex justify-center md:justify-end">
                  <a 
                    href="#contact" 
                    className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white bg-embroidery-gold rounded-md hover:bg-embroidery-gold/90 transition-colors duration-300"
                  >
                    <span className="relative">Kontakta Oss</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Our Products Section */}
      <section 
        id="shop" 
        ref={shopRef}
        className="relative py-24 px-6 md:px-12 lg:px-24 bg-white"
      >
        <div className="absolute inset-0 bg-embroidery-beige/10 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-1000 ${isShopInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-xs tracking-wider bg-embroidery-beige/50 backdrop-blur-sm text-embroidery-charcoal rounded-full mb-6">
                VÅRA PRODUKTER
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-embroidery-charcoal">
                Shoppa våra tygväskor
              </h2>
              <div className="w-16 h-0.5 bg-embroidery-gold/40 mx-auto my-6"></div>
              <p className="text-embroidery-charcoal/70">
                Våra handgjorda tygväskor med personliga broderier har blivit mycket populära. 
                Perfekta som present eller för dig själv - leverans inom 3 dagar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group ${
                    isShopInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden pb-[70%]">
                    <img 
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-embroidery-charcoal mb-2 group-hover:text-embroidery-gold transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-embroidery-charcoal/70 mb-4 text-sm">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-embroidery-charcoal font-medium">{product.price}</span>
                      <button 
                        onClick={() => handleCheckout(product.priceId, product.id)}
                        disabled={isLoading === product.id}
                        className="px-4 py-2 bg-embroidery-gold text-white text-sm rounded hover:bg-embroidery-gold/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-embroidery-gold focus:ring-opacity-50 disabled:opacity-70"
                      >
                        {isLoading === product.id ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Bearbetar...
                          </span>
                        ) : "Köp nu"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-embroidery-charcoal/80 max-w-2xl mx-auto mb-8">
                Vill du ha en specialdesignad väska med ditt eget broderi? Vi kan skapa en helt unik produkt baserad på dina idéer.
                Kontakta oss för att diskutera ditt projekt och få ett personligt prisförslag.
              </p>
              <a 
                href="#contact" 
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-embroidery-gold rounded-md hover:bg-embroidery-gold/90 transition-colors duration-300"
              >
                <span className="relative">Kontakta oss för specialbeställning</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
