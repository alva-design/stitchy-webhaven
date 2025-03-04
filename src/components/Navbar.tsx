
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-2xl font-serif tracking-wide text-embroidery-charcoal"
          >
            Beembroidery
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            {[
              { name: "Hem", link: "home" },
              { name: "Galleri", link: "gallery" },
              { name: "Tjänster", link: "services" },
              { name: "Om oss", link: "about" },
              { name: "Kontakt", link: "contact" }
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item.link}`}
                className="text-embroidery-charcoal/80 hover:text-embroidery-charcoal transition-colors duration-300 text-sm tracking-wide btn-hover"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-embroidery-charcoal"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-6 px-6 animate-fade-in-up">
          <nav className="flex flex-col space-y-4">
            {[
              { name: "Hem", link: "home" },
              { name: "Galleri", link: "gallery" },
              { name: "Tjänster", link: "services" },
              { name: "Om oss", link: "about" },
              { name: "Kontakt", link: "contact" }
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item.link}`}
                className="text-embroidery-charcoal/80 hover:text-embroidery-charcoal transition-colors duration-300 text-sm tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
