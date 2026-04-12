import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { X, Monitor, Gamepad2, Gamepad, Cpu } from 'lucide-react';
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
        <h2 className="text-xl font-bold text-white">Filtri</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Active Filters Count */}
      {(filters.skinsRange || filters.rarity.length > 0 || filters.platforms.length > 0 || filters.fullAccess) && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
            Filtri attivi: {[
              filters.skinsRange ? 1 : 0,
              filters.rarity.length,
              filters.platforms.length,
              filters.fullAccess ? 1 : 0
            ].reduce((a, b) => a + b, 0)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-gray-400 hover:text-white"
          >
            Cancella tutto
          </Button>
        </div>
      )}

      <Separator className="bg-gray-800" />

      {/* Skins Count Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Quantità Skins</h3>
        <div className="space-y-2">
          {skinsRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox
                id={`skins-${range.label}`}
                checked={filters.skinsRange?.label === range.label}
                onCheckedChange={(checked) => {
                  onFilterChange('skinsRange', checked ? range : null);
                }}
                className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label
                htmlFor={`skins-${range.label}`}
                className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Rarity */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Rarità Specifica</h3>
        <div className="space-y-2">
          {rarityOptions.map((rarity) => (
            <div key={rarity} className="flex items-center space-x-2">
              <Checkbox
                id={`rarity-${rarity}`}
                checked={filters.rarity.includes(rarity)}
                onCheckedChange={(checked) => {
                  const newRarity = checked
                    ? [...filters.rarity, rarity]
                    : filters.rarity.filter((r) => r !== rarity);
                  onFilterChange('rarity', newRarity);
                }}
                className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label
                htmlFor={`rarity-${rarity}`}
                className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
              >
                {rarity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Platforms */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Piattaforme</h3>
        <div className="space-y-2">
          {platformOptions.map((platform) => {
            const Icon = platformIcons[platform.icon];
            return (
              <div key={platform.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform.name}`}
                  checked={filters.platforms.includes(platform.name)}
                  onCheckedChange={(checked) => {
                    const newPlatforms = checked
                      ? [...filters.platforms, platform.name]
                      : filters.platforms.filter((p) => p !== platform.name);
                    onFilterChange('platforms', newPlatforms);
                  }}
                  className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor={`platform-${platform.name}`}
                  className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {platform.name}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Full Access */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Accesso</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="fullAccess"
            checked={filters.fullAccess}
            onCheckedChange={(checked) => onFilterChange('fullAccess', checked)}
            className="border-gray-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          />
          <Label
            htmlFor="fullAccess"
            className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
          >
            Solo Full Access
          </Label>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="fixed left-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-r border-gray-800 overflow-y-auto">
          <div className="p-6">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-[#161616] border-gray-800/50 p-6 sticky top-20">
      {content}
    </Card>
  );
};

export default FilterSidebar;
