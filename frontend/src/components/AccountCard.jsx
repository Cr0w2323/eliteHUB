import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Mail, Shield, Sparkles } from 'lucide-react';

const AccountCard = ({ account }) => {
  return (
    <Link to={`/account/${account.id}`} className="block group">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
        
        {/* Card */}
        <div className="relative bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden group-hover:border-zinc-700 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={account.image}
              alt={account.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {account.rarity && account.rarity.length > 0 && (
                <Badge className="bg-yellow-500/90 backdrop-blur-sm text-black border-0 font-semibold text-xs px-2 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  OG
                </Badge>
              )}
            </div>
            
            {/* Price Badge - Bottom Right */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-black/80 backdrop-blur-md rounded-xl px-4 py-2 border border-zinc-700">
                <div className="text-xs text-zinc-400 mb-0.5">Prezzo Demo</div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  €0.00
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Title */}
            <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
              {account.title}
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-zinc-800/50 rounded-lg p-2.5 text-center border border-zinc-700/50">
                <div className="text-indigo-400 font-bold text-lg">{account.skinsCount}</div>
                <div className="text-zinc-500 text-xs">Skins</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-2.5 text-center border border-zinc-700/50">
                <div className="text-purple-400 font-bold text-lg">{account.vBucks}</div>
                <div className="text-zinc-500 text-xs">V-Bucks</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-2.5 text-center border border-zinc-700/50">
                <div className="text-pink-400 font-bold text-lg">{account.accountLevel}</div>
                <div className="text-zinc-500 text-xs">Level</div>
              </div>
            </div>

            {/* Rare Skins Tags */}
            {account.rarity && account.rarity.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {account.rarity.slice(0, 2).map((skin, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30 text-xs px-2 py-0.5"
                  >
                    {skin}
                  </Badge>
                ))}
              </div>
            )}

            {/* Features */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              {account.fullAccess && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Shield className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">FA</span>
                </div>
              )}
              {account.mailChangeable && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <Mail className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-blue-400 text-xs font-medium">FNA</span>
                </div>
              )}
              {account.vBucks > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <span className="text-purple-400 text-xs font-medium">VBUCKS</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccountCard;