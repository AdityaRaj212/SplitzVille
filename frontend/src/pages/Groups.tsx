import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import GroupList from '@/components/dashboard/GroupList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const Groups = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingGroups, setIsFetchingGroups] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
  });

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/group/create-group`, {
        ...groupData,
        ownerId: user?.id,
      });
      
      toast({
        title: "Success!",
        description: "Group created successfully.",
      });
      setIsModalOpen(false);
      fetchGroups();
      console.log('New group created:', response.data);
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.response?.data?.message || "Failed to create group.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGroupData(prev => ({ ...prev, [name]: value }));
  };

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Groups</h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateGroup} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={groupData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Roommates, Trip to Paris"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={groupData.description}
                    onChange={handleInputChange}
                    placeholder="What is this group for?"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Group"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Groups</CardTitle>
          </CardHeader>
          <CardContent>
            {isFetchingGroups ? (
              <div className="text-center text-muted-foreground">Loading groups...</div>
            ) : groups.length === 0 ? (
              <div className="text-center text-muted-foreground">No groups found. Create one to get started!</div>
            ) : (
              <GroupList groups={groups} />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Groups;
