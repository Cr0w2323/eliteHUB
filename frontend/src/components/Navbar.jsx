import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleCartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-black text-xl">eH</span>
              </div>
            </div>
            <div className="text-2xl font-black tracking-tight">
              <span className="text-white">elite</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">HUB</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-zinc-400 hover:text-white transition-colors duration-200 font-medium"
            >
              Marketplace
            </Link>
            <Link 
              to="/terms" 
              className="text-zinc-400 hover:text-white transition-colors duration-200 font-medium"
            >
              Termini
            </Link>
            <a 
              href="mailto:elitehub.assistence@gmail.com" 
              className="text-zinc-400 hover:text-white transition-colors duration-200 font-medium"
            >
              Supporto
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCartClick}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-600 text-white text-xs">
                  {cart.items.length}
                </Badge>
              )}
            </Button>

            {/* Profile/Login */}
            {user ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleProfileClick}
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl"
                >
                  <User className="h-5 w-5" />
                </Button>
                <div className="hidden lg:block">
                  <div className="text-sm text-white font-medium">{user.name}</div>
                  <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl"
                >
                  Accedi
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold px-6"
                >
                  Registrati
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-zinc-800/50">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-zinc-400 hover:text-white transition-colors duration-200 px-4 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link 
                to="/terms" 
                className="text-zinc-400 hover:text-white transition-colors duration-200 px-4 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Termini
              </Link>
              <a 
                href="mailto:elitehub.assistence@gmail.com" 
                className="text-zinc-400 hover:text-white transition-colors duration-200 px-4 py-2 font-medium"
              >
                Supporto
              </a>
              
              <div className="px-4 pt-4 border-t border-zinc-800 space-y-2">
                {user ? (
                  <>
                    <Button 
                      onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                      className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl justify-start"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </Button>
                    <Button 
                      onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}
                      className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl justify-start"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Carrello ({cart.items.length})
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                      variant="outline"
                      className="w-full border-zinc-700 text-white rounded-xl"
                    >
                      Accedi
                    </Button>
                    <Button 
                      onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold"
                    >
                      Registrati
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
