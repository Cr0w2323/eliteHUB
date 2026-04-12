import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold px-6">
              Vendi Account
            </Button>
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
              <div className="px-4 pt-4 border-t border-zinc-800">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold">
                  Vendi Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;