import { Harbor, Ship } from '@/types/game';

interface GameMapProps {
  harbors: Harbor[];
  activeShip: Ship | null;
  routeProgress: number;
  traveling: boolean;
}

export const GameMap = ({ harbors, activeShip, routeProgress, traveling }: GameMapProps) => {
  const harborA = harbors[0];
  const harborB = harbors[1];
  
  // Calculate ship position
  const shipX = harborA.x + (harborB.x - harborA.x) * (routeProgress / 100);
  const shipY = harborA.y + (harborB.y - harborA.y) * (routeProgress / 100);

  return (
    <div className="relative w-full h-96 bg-gradient-ocean rounded-lg overflow-hidden shadow-harbor">
      {/* Ocean waves animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-8 w-8 h-2 bg-white/40 rounded-full animate-wave" style={{ animationDelay: '0s' }} />
        <div className="absolute top-12 left-24 w-6 h-2 bg-white/30 rounded-full animate-wave" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-20 left-16 w-10 h-2 bg-white/40 rounded-full animate-wave" style={{ animationDelay: '1s' }} />
        <div className="absolute top-8 right-12 w-8 h-2 bg-white/40 rounded-full animate-wave" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-24 right-28 w-6 h-2 bg-white/30 rounded-full animate-wave" style={{ animationDelay: '2s' }} />
      </div>

      {/* Harbors */}
      {harbors.map((harbor) => (
        <div
          key={harbor.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${harbor.x}%`, top: `${harbor.y}%` }}
        >
          <div className="bg-gradient-harbor rounded-lg p-3 shadow-harbor border border-border">
            <div className="w-8 h-6 bg-muted rounded-sm mb-1" />
            <div className="text-xs font-medium text-foreground">{harbor.name}</div>
          </div>
        </div>
      ))}

      {/* Shipping route line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <line
          x1={`${harborA.x}%`}
          y1={`${harborA.y}%`}
          x2={`${harborB.x}%`}
          y2={`${harborB.y}%`}
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeDasharray="8,4"
          className="animate-pulse"
        />
      </svg>

      {/* Ship */}
      {activeShip && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
          style={{ 
            left: `${shipX}%`, 
            top: `${shipY}%`,
          }}
        >
          <div className={`relative ${traveling ? 'animate-wave' : ''}`}>
            {/* Ship body */}
            <div className="bg-gradient-ship rounded-lg shadow-ship border border-border p-2">
              <div className="w-6 h-4 bg-primary/20 rounded-sm" />
            </div>
            
            {/* Ship wake when traveling */}
            {traveling && (
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-1 bg-white/30 rounded-full animate-pulse" />
                <div className="w-2 h-1 bg-white/20 rounded-full mt-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
          </div>
          
          {/* Ship info tooltip */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs border border-border whitespace-nowrap">
            {activeShip.name}
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {traveling && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-100 ease-linear"
                  style={{ width: `${routeProgress}%` }}
                />
              </div>
              <span className="text-xs font-medium">{Math.round(routeProgress)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};