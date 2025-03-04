
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-embroidery-cream">
      <div className="text-center px-6 py-24 max-w-lg">
        <div className="inline-block w-24 h-24 rounded-full bg-embroidery-beige/50 flex items-center justify-center text-embroidery-charcoal mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-4xl font-serif font-medium text-embroidery-charcoal mb-4">Sidan hittades inte</h1>
        <p className="text-embroidery-charcoal/70 mb-8">
          Sidan du letar efter existerar inte eller har flyttats.
        </p>
        <Link 
          to="/" 
          className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-embroidery-charcoal bg-embroidery-beige rounded-md group hover:bg-embroidery-gold/20 transition-colors duration-300"
        >
          <span className="relative">Tillbaka till startsidan</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
