import { useGameState } from '@/hooks/useGameState';
import { GameMap } from '@/components/GameMap';
import { GameUI } from '@/components/GameUI';
import { ShipShop } from '@/components/ShipShop';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const Game = () => {
  const { gameState, buyShip, selectShip, startRoute, resetRoute } = useGameState();
  const { toast } = useToast();

  // Show notifications for game events
  useEffect(() => {
    if (gameState.currentRoute?.progress === 100 && !gameState.currentRoute.traveling) {
      const profit = gameState.activeShip?.profitPerTrip || 0;
      toast({
        title: "🚢 Trip Completed!",
        description: `Earned ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(profit)}`,
      });
    }
  }, [gameState.currentRoute?.progress, gameState.currentRoute?.traveling, gameState.activeShip?.profitPerTrip, toast]);

  const handleBuyShip = (shipId: string) => {
    const ship = gameState.ships.find(s => s.id === shipId);
    if (ship && gameState.money >= ship.price) {
      buyShip(shipId);
      toast({
        title: "🎉 Ship Purchased!",
        description: `You bought the ${ship.name}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🚢 Ship Tycoon MVP
          </h1>
          <p className="text-muted-foreground">
            Build your shipping empire! Buy ships, transport cargo, and earn profits.
          </p>
        </div>

        {/* Main Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Map - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <GameMap
              harbors={gameState.harbors}
              activeShip={gameState.activeShip}
              routeProgress={gameState.currentRoute?.progress || 0}
              traveling={gameState.currentRoute?.traveling || false}
            />
            
            {/* Ship Shop */}
            <ShipShop
              ships={gameState.ships}
              money={gameState.money}
              activeShip={gameState.activeShip}
              onBuyShip={handleBuyShip}
              onSelectShip={selectShip}
            />
          </div>

          {/* Game UI Sidebar */}
          <div className="lg:col-span-1">
            <GameUI
              money={gameState.money}
              activeShip={gameState.activeShip}
              traveling={gameState.currentRoute?.traveling || false}
              onStartRoute={startRoute}
              onResetRoute={resetRoute}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>🎮 Ship Tycoon MVP - Start with $100,000 and build your fleet!</p>
        </div>
      </div>
    </div>
  );
};

export default Game;