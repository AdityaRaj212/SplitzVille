
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileImage } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  paidBy: {
    name: string;
    avatar?: string;
    initials: string;
  };
  group?: {
    name: string;
    id: string;
  };
  splitWith: Array<{
    name: string;
    avatar?: string;
    initials: string;
    amount: number;
  }>;
  hasReceipt?: boolean;
}

interface ExpenseListProps {
  className?: string;
  expenses: Expense[];
  title?: string;
}

const ExpenseList = ({ className, expenses, title = "Recent Expenses" }: ExpenseListProps) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/expenses">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-card">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={expense.paidBy.avatar} alt={expense.paidBy.name} />
                  <AvatarFallback>{expense.paidBy.initials}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{expense.title}</h3>
                    {expense.hasReceipt && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <FileImage className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Has receipt</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{expense.date}</span>
                    {expense.group && (
                      <>
                        <span className="mx-1">•</span>
                        <Link to={`/groups/${expense.group.id}`} className="hover:underline">
                          {expense.group.name}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">
                    ${expense.amount.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {expense.paidBy.name} paid
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-20">Split with:</span>
                <div className="flex -space-x-2">
                  {expense.splitWith && expense.splitWith.map((person, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="h-6 w-6 border-2 border-white">
                            <AvatarImage src={person.avatar} alt={person.name} />
                            <AvatarFallback className="text-xs">{person.initials}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{person.name}: ${person.amount.toFixed(2)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
