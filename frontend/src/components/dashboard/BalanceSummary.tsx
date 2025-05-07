
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface BalanceSummaryProps {
  className?: string;
  totalOwed: number;
  totalOwe: number;
}

const BalanceSummary = ({ className, totalOwed, totalOwe }: BalanceSummaryProps) => {
  const netBalance = totalOwed - totalOwe;
  const formattedNetBalance = Math.abs(netBalance).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  const balanceStatusText = netBalance > 0 ? 'You are owed' : netBalance < 0 ? 'You owe' : 'All settled up';

  // Calculate percentages for the progress bars
  const totalAmount = totalOwed + totalOwe;
  const owedPercentage = totalAmount > 0 ? (totalOwed / totalAmount) * 100 : 0;
  const owePercentage = totalAmount > 0 ? (totalOwe / totalAmount) * 100 : 0;

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Balance Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">{balanceStatusText}</p>
            <p className={cn(
              "text-2xl font-bold",
              netBalance > 0 ? "text-expense-owed" : 
              netBalance < 0 ? "text-expense-owe" : 
              "text-expense-neutral"
            )}>
              {formattedNetBalance}
            </p>
          </div>
          
          <div className={cn(
            "h-16 w-16 rounded-full flex items-center justify-center text-white",
            netBalance > 0 ? "bg-expense-owed" : 
            netBalance < 0 ? "bg-expense-owe" : 
            "bg-expense-neutral"
          )}>
            {netBalance > 0 ? '+' : netBalance < 0 ? '-' : '='} 
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Total owed to you</span>
            <span className="text-expense-owed font-medium">
              ${totalOwed.toFixed(2)}
            </span>
          </div>
          <Progress 
            value={owedPercentage} 
            className="h-2 bg-gray-100" 
            // Remove indicatorClassName as it's not in the type definition
          />
          
          <div className="flex justify-between text-sm pt-2">
            <span className="font-medium">Total you owe</span>
            <span className="text-expense-owe font-medium">
              ${totalOwe.toFixed(2)}
            </span>
          </div>
          <Progress 
            value={owePercentage} 
            className="h-2 bg-gray-100"
            // Remove indicatorClassName as it's not in the type definition
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceSummary;
