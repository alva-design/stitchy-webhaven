
import { useState, useEffect, useRef } from 'react';

const galleryItems = [
  {
    id: 1,
    image: "/lovable-uploads/0f19a76b-c0bc-49b7-afe8-2bcc6a2e1c18.png",
    title: "Företagskepsar",
    description: "Skräddarsydda broderier för kepsar med företagslogotyper."
  },
  {
    id: 2,
    image: "/lovable-uploads/4b8153f3-9244-4a46-a59c-6eb849d8a87d.png",
    title: "Dekorativa Mönster",
    description: "Eleganta dekorativa mönster för textilier och heminredning."
  },
  {
    id: 3,
    image: "/lovable-uploads/f7ce9d1b-53a4-4a6c-a558-ca3eb1b844d8.png",
    title: "Tygväskor med Motiv",
    description: "Vackra broderier på miljövänliga tygväskor för vardagsbruk."
  },
  {
    id: 4,
    image: "/lovable-uploads/9bb08e1b-a3aa-4344-b495-c0945b6bd74f.png",
    title: "Handdukar med Text",
    description: "Personliga handdukar med broderade namn eller meddelanden."
  },
  {
    id: 5,
    image: "/lovable-uploads/5e630697-cccc-4fb3-8f2c-d84cec707f9a.png",
    title: "Fruktmotiv",
    description: "Naturinspirerade broderier med frukter och blad på kökshanddukar."
  },
  {
    id: 6,
    image: "/lovable-uploads/30112295-f52a-417b-ac30-fbc4f7529b99.png",
    title: "Citrus Kollektion",
    description: "Fräscha och färgglada citrusmotiv för kökshanddukar och textilier."
  }
];

const Gallery = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-white"
    >
      <div className="absolute inset-0 bg-embroidery-beige/10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs tracking-wider bg-embroidery-beige/50 backdrop-blur-sm text-embroidery-charcoal rounded-full mb-6">
              VÅRA ARBETEN
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-embroidery-charcoal">
              Broderikollektion
            </h2>
            <div className="w-16 h-0.5 bg-embroidery-gold/40 mx-auto my-6"></div>
            <p className="text-embroidery-charcoal/70">
              Varje stygn berättar en historia genom noggrant arbete och genomtänkt design, 
              och skapar något genuint unikt för dig att uppskatta.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div 
                key={item.id}
                className={`group transition-all duration-700 delay-${index * 100} ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div 
                  className="relative overflow-hidden rounded-md cursor-pointer image-hover"
                  onClick={() => setActiveImage(item.id)}
                >
                  <div className="relative pb-[120%]">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-serif text-xl">{item.title}</h3>
                        <p className="text-white/80 text-sm mt-1 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 px-2">
                  <h3 className="font-serif text-lg text-embroidery-charcoal group-hover:text-embroidery-gold transition-colors duration-300">{item.title}</h3>
                  <p className="text-embroidery-charcoal/60 text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a 
              href="#contact" 
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-embroidery-charcoal bg-embroidery-beige/50 hover:bg-embroidery-beige transition-colors duration-300 rounded-md group"
            >
              <span className="relative">Beställ Specialdesign</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryItems.find(item => item.id === activeImage)?.image}
              alt={galleryItems.find(item => item.id === activeImage)?.title}
              className="w-full h-full object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white hover:text-embroidery-gold transition-colors duration-300"
              onClick={() => setActiveImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
