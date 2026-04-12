import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fortniteAccounts } from '../mock/accountsData';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import {
  ArrowLeft,
  Shield,
  Mail,
  Monitor,
  Gamepad2,
  Gamepad,
  Cpu,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';

const AccountDetail = () => {
  const { id } = useParams();
  const account = fortniteAccounts.find((acc) => acc.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!account) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Account non trovato</h2>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Torna alla Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const platformIcons = {
    PC: Monitor,
    PSN: Gamepad2,
    Xbox: Gamepad,
    'Nintendo Switch': Cpu,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Torna al Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-800/50 group">
              <img
                src={account.images[selectedImage]}
                alt={account.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            {account.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {account.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-purple-500 shadow-lg shadow-purple-500/30'
                        : 'border-gray-800/50 hover:border-gray-700'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full aspect-video object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{account.title}</h1>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  €0.00
                </span>
                <span className="text-gray-500 line-through text-2xl">€{account.price.toFixed(2)}</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Demo</Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-blue-500/10 border-blue-500/30 text-blue-400 px-4 py-2">
                {account.skinsCount} Skins
              </Badge>
              <Badge className="bg-purple-500/10 border-purple-500/30 text-purple-400 px-4 py-2">
                {account.vBucks} V-Bucks
              </Badge>
              <Badge className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400 px-4 py-2">
                Livello {account.accountLevel}
              </Badge>
            </div>

            {/* Rare Skins */}
            {account.rarity && account.rarity.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">SKIN RARE INCLUSE</h3>
                <div className="flex flex-wrap gap-2">
                  {account.rarity.map((skin, index) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 text-yellow-300 px-4 py-2 text-sm"
                    >
                      ✨ {skin}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-gray-800" />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Descrizione</h3>
              <p className="text-gray-400 leading-relaxed">{account.description}</p>
            </div>

            {/* Specifications */}
            <Card className="bg-[#161616] border-gray-800/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Specifiche Account</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">V-Bucks Attuali</span>
                  <span className="text-white font-semibold">{account.vBucks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Livello Account</span>
                  <span className="text-white font-semibold">{account.accountLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Emote Rare</span>
                  <span className="text-white font-semibold">{account.rareEmotes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Totale Skins</span>
                  <span className="text-white font-semibold">{account.skinsCount}</span>
                </div>
              </div>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {account.fullAccess && (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">Full Access (FA)</span>
                </div>
              )}
              {account.mailChangeable && (
                <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">Mail Modificabile (FNA)</span>
                </div>
              )}
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">PIATTAFORME COMPATIBILI</h3>
              <div className="flex flex-wrap gap-3">
                {account.platform.map((platform) => {
                  const Icon = platformIcons[platform] || Monitor;
                  return (
                    <div
                      key={platform}
                      className="flex items-center gap-2 bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-2"
                    >
                      <Icon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{platform}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white h-14 text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Aggiungi al Carrello - €0.00
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 bg-gray-900/50 hover:bg-gray-800/70 text-white"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Salva
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 bg-gray-900/50 hover:bg-gray-800/70 text-white"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Condividi
                </Button>
              </div>
            </div>

            {/* Guarantee Section */}
            <Card className="bg-gradient-to-br from-blue-950/30 to-purple-950/30 border-blue-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Garanzia eliteHUB
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Account verificato e testato dal nostro team</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Consegna istantanea dopo il pagamento</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Supporto 24/7 via Discord o Email</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
