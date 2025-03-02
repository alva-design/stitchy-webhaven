
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Success = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // Here you would typically verify the payment with your backend
      // For demo purposes, we'll just simulate a successful payment
      setTimeout(() => {
        setOrderInfo({
          orderNumber: Math.floor(Math.random() * 1000000),
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')
        });
        setLoading(false);
      }, 1500);
      
      toast({
        title: "Betalning genomförd!",
        description: "Din beställning har mottagits och bearbetas nu.",
      });
    } else {
      setLoading(false);
    }
  }, [searchParams, toast]);

  return (
    <div className="min-h-screen bg-embroidery-cream/30 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-lg w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-embroidery-gold"></div>
              <p className="mt-4 text-embroidery-charcoal">Verifierar din betalning...</p>
            </div>
          ) : orderInfo ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-3xl font-serif font-medium text-embroidery-charcoal mb-4">
                Tack för din beställning!
              </h1>
              <div className="w-16 h-0.5 bg-embroidery-gold/40 mx-auto my-6"></div>
              <p className="text-embroidery-charcoal/70 mb-8">
                Din betalning har genomförts och din order är nu på väg att behandlas. Vi skickar en bekräftelse via e-post så snart som möjligt.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-md mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-embroidery-charcoal/70">Ordernummer:</span>
                  <span className="font-medium text-embroidery-charcoal">{orderInfo.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-embroidery-charcoal/70">Uppskattad leverans:</span>
                  <span className="font-medium text-embroidery-charcoal">{orderInfo.estimatedDelivery}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <a 
                  href="/"
                  className="px-6 py-3 bg-embroidery-gold text-white rounded-md hover:bg-embroidery-gold/90 transition-colors"
                >
                  Tillbaka till startsidan
                </a>
                <a 
                  href="#shop"
                  className="px-6 py-3 bg-embroidery-beige text-embroidery-charcoal rounded-md hover:bg-embroidery-beige/80 transition-colors"
                >
                  Fortsätt shoppa
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-serif font-medium text-embroidery-charcoal mb-4">
                Ingen orderinformation hittades
              </h1>
              <p className="text-embroidery-charcoal/70 mb-8">
                Det verkar som att du kom hit utan att genomföra en beställning, eller så kunde vi inte hitta din orderinformation.
              </p>
              <a 
                href="/"
                className="px-6 py-3 bg-embroidery-gold text-white rounded-md hover:bg-embroidery-gold/90 transition-colors"
              >
                Tillbaka till startsidan
              </a>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
