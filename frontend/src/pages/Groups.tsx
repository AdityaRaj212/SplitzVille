
import React from 'react';
import Layout from '@/components/layout/Layout';
import GroupList from '@/components/dashboard/GroupList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Groups = () => {
  const { toast } = useToast();
  
  const handleCreateGroup = () => {
    toast({
      title: "Create Group",
      description: "Group creation functionality will be implemented soon.",
    });
  };

  // Updated the groups data to match the expected type with initials and memberCount
  const groups = [
    {
      id: '1',
      name: 'Roommates',
      initials: 'RM',
      memberCount: 3,
      balance: 120.75,
    },
    {
      id: '2',
      name: 'Trip to Paris',
      initials: 'TP',
      memberCount: 3,
      balance: -45.50,
    },
    {
      id: '3',
      name: 'Office Lunch',
      initials: 'OL',
      memberCount: 2,
      balance: 0,
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Groups</h1>
          <Button onClick={handleCreateGroup}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <GroupList groups={groups} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Groups;
