import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import BalanceSummary from '@/components/dashboard/BalanceSummary';
import RecentActivity from '@/components/dashboard/RecentActivity';
import GroupList from '@/components/dashboard/GroupList';
import ExpenseList from '@/components/expenses/ExpenseList';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFetchingGroups, setIsFetchingGroups] = useState(false);
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    if (!user || !user.id) {
      toast({
        title: "Error!",
        description: "User not authenticated. Please log in.",
        variant: "destructive",
      });
      return;
    }

    setIsFetchingGroups(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/group/user/${user.id}`);
      const fetchedGroups = response.data.groups || response.data || [];
      setGroups(fetchedGroups);
      console.log('Groups fetched:', fetchedGroups);
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch groups.",
        variant: "destructive",
      });
      console.error('Error fetching groups:', error);
    } finally {
      setIsFetchingGroups(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user?.id]);

  // Mock data for demonstration purposes
  const mockActivities = [
    { 
      id: "1", 
      type: "expense" as const, 
      title: "Alex added 'Movie Night'", 
      description: "You owe $12.50", 
      amount: -12.50, 
      timestamp: "2 hours ago", 
      user: { name: "Alex Turner", initials: "AT" } 
    },
    { 
      id: "2", 
      type: "payment" as const, 
      title: "You paid Sarah", 
      description: "For 'Dinner at Luigi's'", 
      amount: -35.00, 
      timestamp: "Yesterday", 
      user: { name: "Sarah Johnson", initials: "SJ" } 
    },
    { 
      id: "3", 
      type: "group" as const, 
      title: "Michael created group 'Road Trip'", 
      description: "You and 4 others were added", 
      timestamp: "2 days ago", 
      user: { name: "Michael Brown", initials: "MB" } 
    },
    { 
      id: "4", 
      type: "expense" as const, 
      title: "Jamie added 'Groceries'", 
      description: "Jamie owes you $27.33", 
      amount: 27.33, 
      timestamp: "3 days ago", 
      user: { name: "Jamie West", initials: "JW" } 
    },
  ];
  
  const mockExpenses = [
    {
      id: "1",
      title: "Dinner at Olive Garden",
      amount: 89.75,
      date: "May 5, 2023",
      paidBy: { name: "You", initials: "YO" },
      group: { name: "Friends", id: "123" },
      splitWith: [
        { name: "Alex", initials: "AT", amount: 29.92 },
        { name: "Sarah", initials: "SJ", amount: 29.92 },
        { name: "Michael", initials: "MB", amount: 29.91 },
      ],
      hasReceipt: true
    },
    {
      id: "2",
      title: "Uber ride",
      amount: 24.50,
      date: "May 3, 2023",
      paidBy: { name: "Alex", initials: "AT" },
      group: { name: "Road Trip", id: "456" },
      splitWith: [
        { name: "You", initials: "YO", amount: 12.25 },
        { name: "Sarah", initials: "SJ", amount: 12.25 },
      ]
    },
    {
      id: "3",
      title: "Monthly Rent",
      amount: 1500,
      date: "May 1, 2023",
      paidBy: { name: "You", initials: "YO" },
      group: { name: "Apartment", id: "789" },
      splitWith: [
        { name: "Jamie", initials: "JW", amount: 500 },
        { name: "Michael", initials: "MB", amount: 500 },
        { name: "Alex", initials: "AT", amount: 500 },
      ],
      hasReceipt: true
    }
  ];

  // Skeleton for GroupList while loading
  const GroupListSkeleton = () => (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">My Groups</CardTitle>
        <Button variant="ghost" size="sm" disabled>Loading...</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="group-card overflow-hidden border border-muted rounded-lg">
              <div className="flex items-center p-4 gap-4 animate-pulse">
                <Avatar className="h-12 w-12 bg-muted">
                  <AvatarFallback>SV</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted w-3/4 rounded"></div>
                  <div className="h-3 bg-muted w-1/2 rounded"></div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="h-4 bg-muted w-16 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
          <div className="group-card flex items-center justify-center p-8 border-dashed border-2 border-muted rounded-lg animate-pulse">
            <div className="h-8 w-8 bg-muted rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">View your balance and recent activity</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BalanceSummary 
          className="lg:col-span-1" 
          totalOwed={247.33} 
          totalOwe={57.75}
        />
        <RecentActivity 
          className="lg:col-span-2" 
          activities={mockActivities}
        />
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isFetchingGroups ? (
          <GroupListSkeleton />
        ) : groups.length === 0 ? (
          <div className="text-center text-muted-foreground p-6 bg-card rounded-lg shadow-sm">
            No groups found. Create one to get started!
          </div>
        ) : (
          <GroupList groups={groups} />
        )}
        <ExpenseList expenses={mockExpenses} />
      </div>
    </Layout>
  );
};

export default Index;
