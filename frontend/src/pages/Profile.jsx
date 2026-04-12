import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  User as UserIcon, 
  ShoppingBag, 
  LogOut, 
  Eye, 
  EyeOff,
  Mail,
  Lock,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

const Profile = () => {
  const { user, token, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    if (!authLoading && !token) {
      navigate('/login');
      return;
    }
    if (!authLoading && token) {
      fetchOrders();
    }
  }, [token, authLoading]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      toast.error('Errore nel caricamento degli ordini');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (accountId) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logout effettuato');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Il Mio Profilo</h1>
              <p className="text-zinc-400">Gestisci i tuoi account e ordini</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <Card className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-zinc-400">{user?.email}</p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="h-6 w-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Cronologia Acquisti</h2>
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">{orders.length} ordini</Badge>
          </div>

          {orders.length === 0 ? (
            <Card className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nessun ordine</h3>
              <p className="text-zinc-400 mb-6">Non hai ancora effettuato acquisti</p>
              <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                Vai al Marketplace
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="bg-zinc-900/90 backdrop-blur-sm border-zinc-800 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">Ordine #{order.id.slice(0, 8)}</h3>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completato
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.created_at).toLocaleDateString('it-IT')}
                        </div>
                        <span>•</span>
                        <span>Metodo: {order.payment_method}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-zinc-400 mb-1">Totale</div>
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        €{order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-zinc-800 mb-6" />

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Account Acquistati</h4>
                    
                    {order.purchased_accounts?.map((account, index) => (
                      <div key={index} className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
                        <div className="flex gap-4">
                          <img src={account.image} alt={account.title} className="w-24 h-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h5 className="font-bold text-white mb-2">{account.title}</h5>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="bg-zinc-900/50 rounded-lg p-2.5 text-center border border-zinc-700/50">
                                <div className="text-indigo-400 font-bold">{account.skins_count}</div>
                                <div className="text-zinc-500 text-xs">Skins</div>
                              </div>
                              <div className="bg-zinc-900/50 rounded-lg p-2.5 text-center border border-zinc-700/50">
                                <div className="text-purple-400 font-bold">{account.vbucks}</div>
                                <div className="text-zinc-500 text-xs">V-Bucks</div>
                              </div>
                            </div>

                            <div className="space-y-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
                              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wide mb-2">
                                Credenziali Account Fortnite
                              </div>
                              
                              <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                                <Mail className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-xs text-zinc-500 mb-1">Email</div>
                                  <div className="text-sm text-white font-mono break-all">{account.account_email}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                                <Lock className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-xs text-zinc-500 mb-1">Password</div>
                                  <div className="text-sm text-white font-mono break-all">
                                    {visiblePasswords[account.account_id] ? account.account_password : '••••••••••••••••'}
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost" onClick={() => togglePasswordVisibility(account.account_id)} className="text-zinc-400 hover:text-white hover:bg-zinc-700/50">
                                  {visiblePasswords[account.account_id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
