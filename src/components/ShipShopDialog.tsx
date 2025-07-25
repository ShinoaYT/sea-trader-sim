import { Ship } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ShipShopDialogProps {
  ships: Ship[];
  money: number;
  activeShip: Ship | null;
  onBuyShip: (shipId: string) => void;
  onSelectShip: (ship: Ship) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShipShopDialog = ({ 
  ships, 
  money, 
  activeShip, 
  onBuyShip, 
  onSelectShip, 
  open, 
  onOpenChange 
}: ShipShopDialogProps) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const groupedShips = ships.reduce((acc, ship) => {
    if (!acc[ship.type]) {
      acc[ship.type] = [];
    }
    acc[ship.type].push(ship);
    return acc;
  }, {} as Record<string, Ship[]>);

  const getShipTypeIcon = (type: string) => {
    switch (type) {
      case 'Container': return '📦';
      case 'Oil Tanker': return '🛢️';
      case 'Gas Ship': return '⛽';
      case 'Ferry': return '⛴️';
      case 'Cruise Ship': return '🛳️';
      default: return '🚢';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">🚢</span>
            Ship Marketplace
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {Object.entries(groupedShips).map(([type, typeShips]) => (
              <div key={type} className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>{getShipTypeIcon(type)}</span>
                  {type}s
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {typeShips.map((ship) => (
                    <Card 
                      key={ship.id} 
                      className={`p-4 cursor-pointer transition-all hover:shadow-ship ${
                        activeShip?.id === ship.id ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      onClick={() => ship.owned && onSelectShip(ship)}
                    >
                      {/* Ship Image */}
                      {ship.imageUrl && (
                        <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                          <img 
                            src={ship.imageUrl} 
                            alt={ship.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{ship.name}</h4>
                              <Badge variant={ship.owned ? "default" : "secondary"}>
                                {ship.owned ? "Owned" : "Available"}
                              </Badge>
                              {activeShip?.id === ship.id && (
                                <Badge variant="outline">Active</Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <span>📦</span>
                                <span>{ship.capacity}t</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>⚡</span>
                                <span>{ship.speed} knots</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>💰</span>
                                <span>${ship.profitPerNM}/NM</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span>💵</span>
                                <span>{formatMoney(ship.price)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {ship.owned ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectShip(ship);
                              }}
                              className="flex-1"
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
                              className="flex-1"
                            >
                              Buy Ship
                            </Button>
                          )}
                        </div>
                        
                        {/* ROI Calculator */}
                        {!ship.owned && money >= ship.price && (
                          <div className="pt-2 border-t border-border">
                            <div className="text-xs text-muted-foreground">
                              ROI: ~{Math.round(ship.price / (ship.profitPerNM * 50))} trips to break even
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">💡 Trading Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Different ship types excel on different routes</li>
              <li>• Longer routes generally offer better profit per nautical mile</li>
              <li>• Larger ships have higher capacity but cost more to operate</li>
              <li>• Cruise ships and ferries have premium profit rates</li>
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};