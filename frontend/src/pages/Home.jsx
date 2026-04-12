import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import AccountCard from '../components/AccountCard';
import FilterSidebar from '../components/FilterSidebar';
import { fortniteAccounts } from '../mock/accountsData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';

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
  const [filteredAccounts, setFilteredAccounts] = useState(fortniteAccounts);

  useEffect(() => {
    let result = [...fortniteAccounts];

    // Search filter
    if (searchQuery) {
      result = result.filter((account) =>
        account.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Skins range filter
    if (filters.skinsRange) {
      result = result.filter(
        (account) =>
          account.skinsCount >= filters.skinsRange.min &&
          account.skinsCount <= filters.skinsRange.max
      );
    }

    // Rarity filter
    if (filters.rarity.length > 0) {
      result = result.filter((account) =>
        filters.rarity.some((r) => account.rarity.includes(r))
      );
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      result = result.filter((account) =>
        filters.platforms.some((p) => account.platform.includes(p))
      );
    }

    // Full access filter
    if (filters.fullAccess) {
      result = result.filter((account) => account.fullAccess);
    }

    // Sort
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
  }, [filters, sortBy, searchQuery]);

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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-purple-950/20 to-[#0a0a0a]" />
          <div className="stars-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Premium Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-2 text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Premium Service Online
            </Badge>
          </div>

          {/* Main Title */}
          <div className="text-center space-y-6 animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Premium
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Gaming Marketplace
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Ottieni accesso istantaneo ad account premium Fortnite, V-Bucks, e
              <br className="hidden md:block" />
              oggetti esclusivi. Pagamenti sicuri, consegna immediata, supporto 24/7.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <Input
                type="text"
                placeholder="Cerca account, skins, o oggetti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 bg-gray-900/50 backdrop-blur-xl border-gray-700/50 rounded-2xl pl-6 pr-14 text-white placeholder-gray-500 text-lg focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <Search className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 h-12 rounded-xl text-base font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
            >
              Esplora Tutti i Prodotti
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 bg-gray-900/50 backdrop-blur-xl hover:bg-gray-800/70 text-white px-8 h-12 rounded-xl text-base font-semibold transition-all duration-300"
            >
              Unisciti a Discord
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '5,447+', label: 'Happy Customers' },
            { value: '13,408+', label: 'Orders Completed' },
            { value: '57+', label: 'Products Available' },
            { value: '4.6', label: 'Average Rating', icon: Star },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                {stat.value}
                {stat.icon && <stat.icon className="h-6 w-6 text-yellow-400 fill-yellow-400" />}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
              I NOSTRI BESTSELLER
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Prodotti in Evidenza</h2>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
          >
            <span>Vedi Tutti i Prodotti</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Filters and Sort */}
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

          {/* Mobile Filter Button */}
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
            {/* Sort and Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden bg-gray-900/50 border border-gray-700/50 text-white"
                >
                  Filtri
                </Button>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-white">{filteredAccounts.length}</span> account trovati
                </p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-gray-900/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Ordina per" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="date-desc">Più Recenti</SelectItem>
                  <SelectItem value="date-asc">Meno Recenti</SelectItem>
                  <SelectItem value="price-asc">Prezzo: Crescente</SelectItem>
                  <SelectItem value="price-desc">Prezzo: Decrescente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAccounts.map((account, index) => (
                <div
                  key={account.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <AccountCard account={account} />
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredAccounts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Nessun account trovato con questi filtri.</p>
                <Button
                  onClick={clearFilters}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  Cancella Filtri
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
