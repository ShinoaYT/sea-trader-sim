import { useState, useEffect, useCallback } from 'react';
import { GameState, INITIAL_SHIPS, HARBORS, Ship } from '@/types/game';

const INITIAL_GAME_STATE: GameState = {
  money: 100000,
  ships: INITIAL_SHIPS,
  activeShip: null,
  harbors: HARBORS,
  currentRoute: null
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  // Ship travel animation
  useEffect(() => {
    if (gameState.currentRoute?.traveling) {
      const interval = setInterval(() => {
        setGameState(prev => {
          if (!prev.currentRoute?.traveling) return prev;
          
          const newProgress = prev.currentRoute.progress + 1;
          
          if (newProgress >= 100) {
            // Trip completed
            return {
              ...prev,
              money: prev.money + (prev.activeShip?.profitPerTrip || 0),
              currentRoute: {
                ...prev.currentRoute,
                progress: 100,
                traveling: false
              }
            };
          }
          
          return {
            ...prev,
            currentRoute: {
              ...prev.currentRoute,
              progress: newProgress
            }
          };
        });
      }, 80); // Trip takes ~8 seconds

      return () => clearInterval(interval);
    }
  }, [gameState.currentRoute?.traveling]);

  const buyShip = useCallback((shipId: string) => {
    setGameState(prev => {
      const ship = prev.ships.find(s => s.id === shipId);
      if (!ship || ship.owned || prev.money < ship.price) return prev;

      return {
        ...prev,
        money: prev.money - ship.price,
        ships: prev.ships.map(s => 
          s.id === shipId ? { ...s, owned: true } : s
        ),
        activeShip: ship.owned ? prev.activeShip : { ...ship, owned: true }
      };
    });
  }, []);

  const selectShip = useCallback((ship: Ship) => {
    if (ship.owned) {
      setGameState(prev => ({ ...prev, activeShip: ship }));
    }
  }, []);

  const startRoute = useCallback(() => {
    if (!gameState.activeShip || gameState.currentRoute?.traveling) return;

    setGameState(prev => ({
      ...prev,
      currentRoute: {
        from: prev.harbors[0],
        to: prev.harbors[1],
        progress: 0,
        traveling: true
      }
    }));
  }, [gameState.activeShip, gameState.currentRoute?.traveling]);

  const resetRoute = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentRoute: null
    }));
  }, []);

  return {
    gameState,
    buyShip,
    selectShip,
    startRoute,
    resetRoute
  };
};