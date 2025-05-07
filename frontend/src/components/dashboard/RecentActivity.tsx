
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'expense' | 'payment' | 'group';
  title: string;
  description: string;
  amount?: number;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

interface RecentActivityProps {
  className?: string;
  activities: Activity[];
}

const RecentActivity = ({ className, activities }: RecentActivityProps) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start gap-3 animate-fade-in">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              {activity.amount && (
                <span className={cn(
                  "text-sm font-medium",
                  activity.amount > 0 ? "text-expense-owed" : "text-expense-owe"
                )}>
                  {activity.amount > 0 ? '+' : ''}{activity.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
