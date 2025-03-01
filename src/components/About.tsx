
import { useRef, useState, useEffect } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      id="about" 
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-white"
    >      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div 
            className={`transition-all duration-1000 ${
              isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-embroidery-gold/40 z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-embroidery-gold/40 z-0"></div>
              
              <div className="relative z-10 overflow-hidden rounded-md shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1618224608621-fc4857811bcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                  alt="Master embroiderer working on a detailed design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <span className="inline-block px-3 py-1 text-xs tracking-wider bg-embroidery-beige/50 backdrop-blur-sm text-embroidery-charcoal rounded-full mb-6">
              OUR STORY
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-embroidery-charcoal mb-6">
              Artistry in Every Stitch
            </h2>
            
            <div className="space-y-4 text-embroidery-charcoal/80">
              <p>
                Golden Thread was founded on the belief that true beauty lies in the details. Our journey began over a decade ago with a passion for preserving the timeless art of hand embroidery in a world increasingly dominated by machine-made goods.
              </p>
              <p>
                Each piece that leaves our studio carries with it countless hours of careful attention and artistic expression. We combine traditional techniques passed down through generations with contemporary designs, creating embroidery that honors the past while embracing the present.
              </p>
              <p>
                Our team of skilled artisans brings decades of collective experience to every project, ensuring that your custom embroidery becomes a treasured heirloom that tells your unique story through thread and fabric.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-embroidery-beige/30 flex items-center justify-center text-embroidery-charcoal">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-embroidery-charcoal">Premium Materials</p>
                  <p className="text-sm text-embroidery-charcoal/60">Finest threads and fabrics</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-embroidery-beige/30 flex items-center justify-center text-embroidery-charcoal">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-embroidery-charcoal">Skilled Artisans</p>
                  <p className="text-sm text-embroidery-charcoal/60">Years of expert experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div 
          className={`mt-24 transition-all duration-1000 delay-600 ${
            isInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl font-serif text-embroidery-charcoal">
              What Our Clients Say
            </h3>
            <div className="w-12 h-0.5 bg-embroidery-gold/40 mx-auto my-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The attention to detail in my custom monogrammed linens was absolutely exquisite. A true work of art.",
                author: "Emily R.",
                role: "Home Collection Client"
              },
              {
                quote: "Golden Thread created the most beautiful embroidered wedding handkerchiefs for our special day. They'll be treasured forever.",
                author: "Michael & Sarah",
                role: "Wedding Collection Clients"
              },
              {
                quote: "The corporate gifts we ordered exceeded our expectations. Our clients were genuinely impressed by the craftsmanship.",
                author: "Thomas L.",
                role: "Corporate Client"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white border border-embroidery-beige p-8 rounded-md relative"
              >
                <svg className="absolute top-6 left-6 h-8 w-8 text-embroidery-gold/20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="pt-6">
                  <p className="text-embroidery-charcoal/80 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium text-embroidery-charcoal">{testimonial.author}</p>
                      <p className="text-sm text-embroidery-charcoal/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
