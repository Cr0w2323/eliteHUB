import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Mail, Shield } from 'lucide-react';

const AccountCard = ({ account }) => {
  return (
    <Link to={`/account/${account.id}`}>
      <Card className="bg-[#161616] border-gray-800/50 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]">
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={account.image}
            alt={account.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-2 py-1 text-xs font-bold">
              DEMO
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-3 py-1 text-sm font-bold">
              €0.00
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
            {account.title}
          </h3>

          {/* Stats */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-medium text-blue-400">{account.skinsCount}</span>
            <span>Skins</span>
            {account.vBucks > 0 && (
              <>
                <span className="text-gray-600">•</span>
                <span className="font-medium text-purple-400">{account.vBucks}</span>
                <span>V-Bucks</span>
              </>
            )}
          </div>

          {/* Rare Skins */}
          {account.rarity && account.rarity.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {account.rarity.slice(0, 2).map((skin, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                >
                  {skin}
                </Badge>
              ))}
            </div>
          )}

          {/* Features */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-800/50">
            {account.fullAccess && (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <Shield className="h-3 w-3" />
                <span>Full Access</span>
              </div>
            )}
            {account.mailChangeable && (
              <div className="flex items-center gap-1 text-xs text-blue-400">
                <Mail className="h-3 w-3" />
                <span>Mail OK</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AccountCard;
