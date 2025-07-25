import { Ship } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShipShopProps {
  ships: Ship[];
  money: number;
  activeShip: Ship | null;
  onBuyShip: (shipId: string) => void;
  onSelectShip: (ship: Ship) => void;
}

export const ShipShop = ({ ships, money, activeShip, onBuyShip, onSelectShip }: ShipShopProps) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">🚢 Ship Marketplace</h2>
      </div>
      
      <div className="space-y-4">
        {ships.map((ship) => (
          <Card 
            key={ship.id} 
            className={`p-4 cursor-pointer transition-all hover:shadow-ship ${
              activeShip?.id === ship.id ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
            onClick={() => ship.owned && onSelectShip(ship)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{ship.name}</h3>
                  <Badge variant={ship.owned ? "default" : "secondary"}>
                    {ship.owned ? "Owned" : "Available"}
                  </Badge>
                  {activeShip?.id === ship.id && (
                    <Badge variant="outline">Active</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>📦</span>
                    <span>{ship.capacity}t capacity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⚡</span>
                    <span>{ship.speed} knots</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💰</span>
                    <span>{formatMoney(ship.profitPerTrip)}/trip</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💵</span>
                    <span>{formatMoney(ship.price)}</span>
                  </div>
                </div>
              </div>
              
              <div className="ml-4">
                {ship.owned ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectShip(ship);
                    }}
                  >
                    {activeShip?.id === ship.id ? "Selected" : "Select"}
                  </Button>
                ) : (
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyShip(ship.id);
                    }}
                    disabled={money < ship.price}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Buy Ship
                  </Button>
                )}
              </div>
            </div>
            
            {/* ROI Calculator */}
            {!ship.owned && money >= ship.price && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  ROI: {Math.round(ship.price / ship.profitPerTrip)} trips to break even
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium mb-2">💡 Trading Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Larger ships have higher capacity but cost more</li>
          <li>• Each trip from Harbor Alpha to Beta earns profit</li>
          <li>• Upgrade to bigger ships for better returns</li>
        </ul>
      </div>
    </Card>
  );
};