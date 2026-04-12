import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-zinc-800/50 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">eH</span>
                </div>
              </div>
              <div className="text-2xl font-black tracking-tight">
                <span className="text-white">elite</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">HUB</span>
              </div>
            </Link>
            <p className="text-zinc-400 leading-relaxed max-w-md mb-6">
              Il marketplace premium per account Fortnite verificati. Transazioni sicure, consegna immediata, supporto professionale.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-zinc-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-zinc-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-zinc-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Link Rapidi</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-white transition-colors duration-200">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-zinc-400 hover:text-white transition-colors duration-200">
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-zinc-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Supporto</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:elitehub.assistence@gmail.com" className="text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Support
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © 2026 <span className="text-white font-semibold">eliteHUB</span>. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm">
              Termini
            </Link>
            <Link to="/terms" className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm">
              Privacy
            </Link>
            <a href="mailto:elitehub.assistence@gmail.com" className="text-zinc-500 hover:text-white transition-colors duration-200 text-sm">
              Contatti
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;