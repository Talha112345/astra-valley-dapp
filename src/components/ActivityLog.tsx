import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export interface Activity {
  id: string;
  type: 'success' | 'error' | 'pending';
  message: string;
  timestamp: Date;
}

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityLog = ({ activities }: ActivityLogProps) => {
  return (
    <Card className="glass-card p-6 border-2 border-muted/20">
      <h3 className="text-xl font-orbitron font-bold mb-4 gradient-text">Activity Log</h3>

      <ScrollArea className="h-[300px] pr-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No activities yet. Start interacting with the DApp!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="glass-card p-3 flex items-start gap-3 animate-fade-in"
              >
                {activity.type === 'success' && (
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                )}
                {activity.type === 'error' && (
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                )}
                {activity.type === 'pending' && (
                  <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 animate-pulse" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default ActivityLog;
