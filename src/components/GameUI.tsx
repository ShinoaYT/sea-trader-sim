import { Ship } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameUIProps {
  money: number;
  activeShip: Ship | null;
  traveling: boolean;
  onStartRoute: () => void;
  onResetRoute: () => void;
}

export const GameUI = ({ money, activeShip, traveling, onStartRoute, onResetRoute }: GameUIProps) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Money Display */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Company Funds</h3>
            <p className="text-2xl font-bold text-foreground animate-money-float" style={{ textShadow: 'var(--glow-money)' }}>
              {formatMoney(money)}
            </p>
          </div>
          <div className="text-4xl">💰</div>
        </div>
      </Card>

      {/* Active Ship Status */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Active Ship</h3>
        {activeShip ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{activeShip.name}</p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>🚢 {activeShip.capacity}t</span>
                  <span>⚡ {activeShip.speed} kn</span>
                  <span>💰 {formatMoney(activeShip.profitPerTrip)}/trip</span>
                </div>
              </div>
              <Badge variant={activeShip.owned ? "default" : "secondary"}>
                {activeShip.owned ? "Owned" : "Not Owned"}
              </Badge>
            </div>
            
            {activeShip.owned && (
              <div className="flex gap-2">
                <Button 
                  onClick={onStartRoute}
                  disabled={traveling}
                  className="flex-1"
                  variant={traveling ? "secondary" : "default"}
                >
                  {traveling ? "🚢 Sailing..." : "⚓ Start Route"}
                </Button>
                {traveling && (
                  <Button 
                    onClick={onResetRoute}
                    variant="outline"
                    size="sm"
                  >
                    Reset
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">No ship selected</p>
            <p className="text-xs">Buy a ship to start trading!</p>
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Trading Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-primary">A → B</p>
            <p className="text-xs text-muted-foreground">Current Route</p>
          </div>
          <div>
            <p className="text-lg font-bold text-accent">100t</p>
            <p className="text-xs text-muted-foreground">Cargo Load</p>
          </div>
        </div>
      </Card>
    </div>
  );
};