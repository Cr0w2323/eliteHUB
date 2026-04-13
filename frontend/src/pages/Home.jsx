import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Shield, Zap, ChevronDown, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import AccountCard from '../components/AccountCard';
import FilterSidebar from '../components/FilterSidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

const Home = () => {
  const [filters, setFilters] = useState({
    skinsRange: null,
    rarity: [],
    platforms: [],
    fullAccess: false,
  });
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [allAccounts, setAllAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  // Carica account dal database
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${API_URL}/accounts`);
        setAllAccounts(response.data);
        setFilteredAccounts(response.data);
      } catch (error) {
        console.error('Error loading accounts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let result = [...allAccounts];

    if (searchQuery) {
      result = result.filter((account) =>
        account.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.skinsRange) {
      result = result.filter(
        (account) =>
          account.skinsCount >= filters.skinsRange.min &&
          account.skinsCount <= filters.skinsRange.max
      );
    }

    if (filters.rarity.length > 0) {
      result = result.filter((account) =>
        filters.rarity.some((r) => account.rarity.includes(r))
      );
    }

    if (filters.platforms.length > 0) {
      result = result.filter((account) =>
        filters.platforms.some((p) => account.platform.includes(p))
      );
    }

    if (filters.fullAccess) {
      result = result.filter((account) => account.fullAccess);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
        break;
      default:
        break;
    }

    setFilteredAccounts(result);
  }, [filters, sortBy, searchQuery, allAccounts]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      skinsRange: null,
      rarity: [],
      platforms: [],
      fullAccess: false,
    });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            left: `${mousePosition.x - 400}px`,
            top: `${mousePosition.y - 400}px`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Main Title with 3D Effect */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-sm mb-6">
            <Zap className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Il Marketplace #1 per Fortnite</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            <span className="block text-white drop-shadow-2xl" style={{
              textShadow: '0 0 80px rgba(99, 102, 241, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'
            }}>
              elite<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">HUB</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Account Fortnite premium verificati. Acquista in sicurezza,
            <br className="hidden md:block" />
            ricevi istantaneamente. Supporto dedicato 24/7.
          </p>
        </div>

        {/* Advanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative flex items-center bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-zinc-800 overflow-hidden">
              <Input
                type="text"
                placeholder="Cerca Renegade Raider, Black Knight, account OG..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 h-16 px-6 text-white placeholder-zinc-500 focus:ring-0 text-lg"
              />
              <Button 
                size="lg"
                className="m-2 h-12 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Shield, label: 'Account Verificati', value: '100%', color: 'from-green-500 to-emerald-500' },
            { icon: Zap, label: 'Consegna Immediata', value: '<5min', color: 'from-indigo-500 to-blue-500' },
            { icon: TrendingUp, label: 'Vendite Totali', value: '13K+', color: 'from-purple-500 to-pink-500' },
            { icon: Shield, label: 'Rating Medio', value: '4.9★', color: 'from-yellow-500 to-orange-500' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-xl blur transition duration-300" style={{
                backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`
              }} />
              <div className="relative bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Account Disponibili</h2>
            <p className="text-zinc-400">Scegli tra i migliori account Fortnite sul mercato</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              isMobile={false}
            />
          </div>

          {/* Mobile Filter */}
          {showMobileFilters && (
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              isMobile={true}
              onClose={() => setShowMobileFilters(false)}
            />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtri
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 text-sm">Trovati</span>
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-semibold">
                    {filteredAccounts.length}
                  </Badge>
                  <span className="text-zinc-400 text-sm">account</span>
                </div>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-zinc-800 border-zinc-700 text-white">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Ordina" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="date-desc">Più Recenti</SelectItem>
                  <SelectItem value="date-asc">Meno Recenti</SelectItem>
                  <SelectItem value="price-asc">Prezzo Basso</SelectItem>
                  <SelectItem value="price-desc">Prezzo Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="text-white text-xl">Caricamento account...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAccounts.map((account, index) => (
                  <div
                    key={account.id}
                    className="opacity-0 animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <AccountCard account={account} />
                  </div>
                ))}
              </div>
            )}

            {filteredAccounts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
                  <Search className="h-10 w-10 text-zinc-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Nessun account trovato</h3>
                <p className="text-zinc-400 mb-6">Prova a modificare i filtri di ricerca</p>
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Cancella Filtri
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Perché scegliere eliteHUB?</h3>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Ogni account è verificato manualmente dal nostro team. Garanzia di rimborso completo se qualcosa non va come previsto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="px-6 py-3 bg-green-500/20 text-green-300 border-green-500/30 text-base">
              ✓ Pagamenti Sicuri
            </Badge>
            <Badge className="px-6 py-3 bg-blue-500/20 text-blue-300 border-blue-500/30 text-base">
              ✓ Consegna Istantanea
            </Badge>
            <Badge className="px-6 py-3 bg-purple-500/20 text-purple-300 border-purple-500/30 text-base">
              ✓ Supporto 24/7
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;