import { Ship, Harbor } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface GameUIProps {
  money: number;
  activeShip: Ship | null;
  harbors: Harbor[];
  traveling: boolean;
  currentRoute: { from: Harbor; to: Harbor; progress: number; traveling: boolean } | null;
  onStartRoute: (fromId: string, toId: string) => void;
  onResetRoute: () => void;
  onOpenShipShop: () => void;
}

export const GameUI = ({ money, activeShip, harbors, traveling, currentRoute, onStartRoute, onResetRoute, onOpenShipShop }: GameUIProps) => {
  const [fromHarbor, setFromHarbor] = useState<string>('');
  const [toHarbor, setToHarbor] = useState<string>('');

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateDistance = (from: Harbor, to: Harbor) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.sqrt(dx * dx + dy * dy) * 10; // Scale to nautical miles
  };

  const calculateProfit = () => {
    if (!activeShip || !fromHarbor || !toHarbor) return 0;
    const from = harbors.find(h => h.id === fromHarbor);
    const to = harbors.find(h => h.id === toHarbor);
    if (!from || !to) return 0;
    
    const distance = calculateDistance(from, to);
    return Math.round(distance * activeShip.profitPerNM);
  };

  const handleStartRoute = () => {
    if (fromHarbor && toHarbor && fromHarbor !== toHarbor) {
      onStartRoute(fromHarbor, toHarbor);
    }
  };

  return (
    <div className="space-y-4">
      {/* Money Display */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <div>
            <h3 className="font-semibold">Balance</h3>
            <p className="text-2xl font-bold text-primary">{formatMoney(money)}</p>
          </div>
        </div>
      </Card>

      {/* Ship Shop Button */}
      <Card className="p-4">
        <Button 
          onClick={onOpenShipShop}
          className="w-full"
          variant="outline"
        >
          🚢 Ship Marketplace
        </Button>
      </Card>

      {/* Active Ship */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>🚢</span>
          Active Ship
        </h3>
        
        {activeShip ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="default">{activeShip.name}</Badge>
              <Badge variant="secondary">{activeShip.type}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>📦</span>
                <span>{activeShip.capacity}t</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⚡</span>
                <span>{activeShip.speed} knots</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💰</span>
                <span>${activeShip.profitPerNM}/NM</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No ship selected</p>
        )}
      </Card>

      {/* Route Selection */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>🗺️</span>
          Select Route
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">From Port</label>
            <Select value={fromHarbor} onValueChange={setFromHarbor}>
              <SelectTrigger>
                <SelectValue placeholder="Select departure port" />
              </SelectTrigger>
              <SelectContent>
                {harbors.map((harbor) => (
                  <SelectItem key={harbor.id} value={harbor.id}>
                    {harbor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">To Port</label>
            <Select value={toHarbor} onValueChange={setToHarbor}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination port" />
              </SelectTrigger>
              <SelectContent>
                {harbors.filter(h => h.id !== fromHarbor).map((harbor) => (
                  <SelectItem key={harbor.id} value={harbor.id}>
                    {harbor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {fromHarbor && toHarbor && activeShip && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span>{Math.round(calculateDistance(
                    harbors.find(h => h.id === fromHarbor)!,
                    harbors.find(h => h.id === toHarbor)!
                  ))} NM</span>
                </div>
                <div className="flex justify-between font-medium text-primary">
                  <span>Profit:</span>
                  <span>{formatMoney(calculateProfit())}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Travel Controls */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>⚓</span>
          Journey Control
        </h3>
        
        <div className="space-y-3">
          {traveling ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Traveling from {currentRoute?.from.name} to {currentRoute?.to.name}
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-100"
                  style={{ width: `${currentRoute?.progress || 0}%` }}
                />
              </div>
              <p className="text-xs text-center">{Math.round(currentRoute?.progress || 0)}%</p>
              <Button 
                onClick={onResetRoute}
                variant="outline" 
                className="w-full"
              >
                Cancel Journey
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleStartRoute}
              disabled={!activeShip || !fromHarbor || !toHarbor || fromHarbor === toHarbor}
              className="w-full"
            >
              Start Journey
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};