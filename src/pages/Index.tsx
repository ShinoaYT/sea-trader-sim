import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto p-8 text-center shadow-harbor">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            🚢 Ship Tycoon MVP
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Build your maritime empire! Start with $100,000 and grow your fleet.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-harbor p-4 rounded-lg">
              <div className="text-2xl mb-2">🚢</div>
              <h3 className="font-semibold mb-1">Buy Ships</h3>
              <p className="text-sm text-muted-foreground">Purchase container freighters</p>
            </div>
            <div className="bg-gradient-harbor p-4 rounded-lg">
              <div className="text-2xl mb-2">🚛</div>
              <h3 className="font-semibold mb-1">Transport Cargo</h3>
              <p className="text-sm text-muted-foreground">Move freight between harbors</p>
            </div>
            <div className="bg-gradient-harbor p-4 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold mb-1">Earn Profits</h3>
              <p className="text-sm text-muted-foreground">Grow your shipping business</p>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">🎯 Your Goal</h4>
            <p className="text-sm text-muted-foreground">
              Start with a Container Freighter ($50,000) and earn $10,000 per trip. 
              Save up for the Big Freighter ($200,000) that earns $50,000 per trip!
            </p>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/game')}
          size="lg"
          className="text-lg px-8 py-6 shadow-ship"
        >
          ⚓ Start Your Empire
        </Button>
      </Card>
    </div>
  );
};

export default Index;
