import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { 
  ShoppingCart, 
  Trash2, 
  CreditCard, 
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');

  // Wait for auth to load before redirecting
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Caricamento...</div>
      </div>
    );
  }

  if (!user || !token) {
    navigate('/login');
    return null;
  }

  const handleRemoveItem = async (accountId) => {
    const result = await removeFromCart(accountId);
    if (result.success) {
      toast.success('Articolo rimosso dal carrello');
    } else {
      toast.error(result.error);
    }
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      toast.error('Il carrello è vuoto');
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const paymentResponse = await axios.post(
        `${API_URL}/payments/create-intent`,
        {
          amount: cart.total,
          currency: 'eur',
          payment_method: selectedPayment
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Create order
      const orderResponse = await axios.post(
        `${API_URL}/orders/create`,
        {
          user_id: user.id,
          items: cart.items,
          total: cart.total,
          payment_method: selectedPayment,
          payment_intent_id: paymentResponse.data.client_secret || 'demo_payment'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Acquisto completato con successo!');
      navigate('/profile');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Errore durante il checkout');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
        <Card className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 p-12 text-center max-w-md">
          <ShoppingCart className="h-20 w-20 text-zinc-600 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-3">Carrello Vuoto</h2>
          <p className="text-zinc-400 mb-8">
            Non hai ancora aggiunto nessun account al carrello
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          >
            Vai al Marketplace
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Carrello</h1>
          <p className="text-zinc-400">Completa il tuo acquisto</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Articoli ({cart.items.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearCart()}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Svuota Carrello
                </Button>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.account_id}
                    className="flex gap-4 bg-zinc-800/50 rounded-xl p-4 border border-zinc-700"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                          €{item.price.toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.account_id)}
                          className="text-zinc-400 hover:text-red-400"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Riepilogo</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotale</span>
                  <span>€{cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Commissioni</span>
                  <span>€0.00</span>
                </div>
                <Separator className="bg-zinc-800" />
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Totale</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    €{cart.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">Metodo di Pagamento</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPayment === 'card'
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-indigo-400" />
                        <span className="text-white font-medium">Carta di Credito</span>
                      </div>
                      {selectedPayment === 'card' && (
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedPayment('stripe')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPayment === 'stripe'
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          S
                        </div>
                        <span className="text-white font-medium">Stripe</span>
                      </div>
                      {selectedPayment === 'stripe' && (
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedPayment('paypal')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedPayment === 'paypal'
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          P
                        </div>
                        <span className="text-white font-medium">PayPal</span>
                      </div>
                      {selectedPayment === 'paypal' && (
                        <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-12 text-lg font-semibold"
              >
                {loading ? (
                  'Elaborazione...'
                ) : (
                  <>
                    Procedi al Pagamento
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {/* Trust Badge */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-green-400 mb-1">
                      Pagamento Sicuro
                    </div>
                    <div className="text-xs text-green-300/70">
                      I tuoi dati sono protetti e criptati. Riceverai le credenziali immediatamente dopo il pagamento.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
