
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import BalanceSummary from '@/components/dashboard/BalanceSummary';
import RecentActivity from '@/components/dashboard/RecentActivity';
import GroupList from '@/components/dashboard/GroupList';
import ExpenseList from '@/components/expenses/ExpenseList';

const Index = () => {
  // Mock data for demonstration purposes
  const mockGroups = [
    { 
      id: "1", 
      name: "Summer Trip 2023", 
      initials: "ST", 
      memberCount: 5, 
      balance: 123.45 
    },
    { 
      id: "2", 
      name: "Apartment", 
      initials: "AP", 
      memberCount: 3, 
      balance: -45.67 
    },
    { 
      id: "3", 
      name: "Dinner Club", 
      initials: "DC", 
      memberCount: 6, 
      balance: 0 
    },
  ];
  
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
        <GroupList groups={mockGroups} />
        <ExpenseList expenses={mockExpenses} />
      </div>
    </Layout>
  );
};

export default Index;
