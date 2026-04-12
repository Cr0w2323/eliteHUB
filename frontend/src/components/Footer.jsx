import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-xl">eH</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                elite<span className="text-blue-500">HUB</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Il marketplace premium per account Fortnite, V-Bucks e oggetti esclusivi.
              Pagamenti sicuri, consegna immediata, supporto 24/7.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="mailto:elitehub.assistence@gmail.com"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">elitehub.assistence@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <a href="mailto:elitehub.assistence@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Supporto
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Supporto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Discord
                </a>
              </li>
              <li>
                <a href="mailto:elitehub.assistence@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 <span className="text-white font-semibold">eliteHUB</span>. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
