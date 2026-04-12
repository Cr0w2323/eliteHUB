import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { X, Monitor, Gamepad2, Gamepad, Cpu, SlidersHorizontal } from 'lucide-react';
import { rarityOptions, platformOptions, skinsRanges } from '../mock/accountsData';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isMobile, onClose }) => {
  const platformIcons = {
    Monitor: Monitor,
    Gamepad2: Gamepad2,
    Gamepad: Gamepad,
    Cpu: Cpu
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Filtri</h2>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {(filters.skinsRange || filters.rarity.length > 0 || filters.platforms.length > 0 || filters.fullAccess) && (
        <div className="flex items-center justify-between">
          <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
            {[
              filters.skinsRange ? 1 : 0,
              filters.rarity.length,
              filters.platforms.length,
              filters.fullAccess ? 1 : 0
            ].reduce((a, b) => a + b, 0)} attivi
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-zinc-400 hover:text-white h-7"
          >
            Reset
          </Button>
        </div>
      )}

      <Separator className="bg-zinc-800" />

      {/* Skins Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          Quantità Skins
        </h3>
        <div className="space-y-2">
          {skinsRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-3">
              <Checkbox
                id={`skins-${range.label}`}
                checked={filters.skinsRange?.label === range.label}
                onCheckedChange={(checked) => {
                  onFilterChange('skinsRange', checked ? range : null);
                }}
                className="border-zinc-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <Label
                htmlFor={`skins-${range.label}`}
                className="text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors flex-1"
              >
                {range.label} skins
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Rarity */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Rarità Specifica</h3>
        <div className="space-y-2">
          {rarityOptions.map((rarity) => (
            <div key={rarity} className="flex items-center space-x-3">
              <Checkbox
                id={`rarity-${rarity}`}
                checked={filters.rarity.includes(rarity)}
                onCheckedChange={(checked) => {
                  const newRarity = checked
                    ? [...filters.rarity, rarity]
                    : filters.rarity.filter((r) => r !== rarity);
                  onFilterChange('rarity', newRarity);
                }}
                className="border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`rarity-${rarity}`}
                className="text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors flex-1"
              >
                {rarity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Platforms */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Piattaforme</h3>
        <div className="space-y-2">
          {platformOptions.map((platform) => {
            const Icon = platformIcons[platform.icon];
            return (
              <div key={platform.name} className="flex items-center space-x-3">
                <Checkbox
                  id={`platform-${platform.name}`}
                  checked={filters.platforms.includes(platform.name)}
                  onCheckedChange={(checked) => {
                    const newPlatforms = checked
                      ? [...filters.platforms, platform.name]
                      : filters.platforms.filter((p) => p !== platform.name);
                    onFilterChange('platforms', newPlatforms);
                  }}
                  className="border-zinc-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor={`platform-${platform.name}`}
                  className="text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors flex-1 flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {platform.name}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Access */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Tipo Accesso</h3>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="fullAccess"
            checked={filters.fullAccess}
            onCheckedChange={(checked) => onFilterChange('fullAccess', checked)}
            className="border-zinc-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          />
          <Label
            htmlFor="fullAccess"
            className="text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors flex-1"
          >
            Solo Full Access
          </Label>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="fixed left-0 top-0 bottom-0 w-80 bg-zinc-900 border-r border-zinc-800 overflow-y-auto">
          <div className="p-6">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sticky top-24">
      {content}
    </div>
  );
};

export default FilterSidebar;