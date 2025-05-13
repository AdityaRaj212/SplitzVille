import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, DollarSign, Calendar, UserPlus, UserMinus, TrendingUp, FileText, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

// Dummy data for transactions and members (replace with real API data)
const dummyGroup = {
  id: '1',
  name: 'Roommates',
  initials: 'RM',
  description: 'Shared expenses for our awesome apartment!',
  image: '',
  memberCount: 3,
  balance: 120.75,
  totalSpent: 1250.50,
  createdAt: '2023-01-15T00:00:00Z',
};

const dummyMembers = [
  { id: 'm1', firstName: 'Alice Smith', email: 'alice@example.com', balance: 40.25, image: '' },
  { id: 'm2', firstName: 'Bob Johnson', email: 'bob@example.com', balance: -60.50, image: '' },
  { id: 'm3', firstName: 'Charlie Brown', email: 'charlie@example.com', balance: 20.25, image: '' },
];

const dummyTransactions = [
  { id: 't1', description: 'Rent for October', amount: 600.00, date: '2023-10-01T00:00:00Z', paidBy: 'Alice Smith', splitAmong: ['Alice', 'Bob', 'Charlie'] },
  { id: 't2', description: 'Groceries', amount: 120.50, date: '2023-09-28T00:00:00Z', paidBy: 'Bob Johnson', splitAmong: ['Alice', 'Bob'] },
  { id: 't3', description: 'Internet Bill', amount: 60.00, date: '2023-09-15T00:00:00Z', paidBy: 'Charlie Brown', splitAmong: ['Alice', 'Bob', 'Charlie'] },
  { id: 't4', description: 'Dinner Out', amount: 90.75, date: '2023-09-10T00:00:00Z', paidBy: 'Alice Smith', splitAmong: ['Alice', 'Charlie'] },
];

const GroupDetail = () => {
  const { user } = useAuth();
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string, name: string } | null>(null);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
      title: '',
      amount: '',
      date: '',
      description: '',
  });

  const openRemoveConfirmation = (memberId: string, memberName: string) => {
    setMemberToRemove({ id: memberId, name: memberName });
    setIsRemoveConfirmationOpen(true);
  };

  const fetchGroupData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/group/${groupId}`);
      setMembers(response.data.group.members);
      setGroup({
        id: response.data.group.id,
        name: response.data.group.name,
        initials: response.data.group.name.includes(' ')
          ? `${response.data.group.name.split(' ')[0][0]}${response.data.group.name.split(' ').slice(-1)[0][0]}`.toUpperCase()
          : response.data.group.name.slice(0, 2).toUpperCase(),
        description: response.data.group.description,
        image: '',
        memberCount: response.data.group.members.length,
        balance: 120.75,
        totalSpent: 1250.50,
        createdAt: response.data.group.createdAt,
      });
      setIsLoading(false);
      setTimeout(() => {
        // setGroup(dummyGroup);
        // setMembers(dummyMembers);
        setTransactions(dummyTransactions);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to fetch group details.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [groupId, toast]);

  const debouncedSearch = useCallback(async (term: string) => {
    if (!term) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/smart-search`, {
        params: { query: term, groupId },
      });
      if (response.data.success) {
        setSearchResults(response.data.users || []);
      } else {
        toast({
          title: "Error!",
          description: "Failed to search users.",
          variant: "destructive",
        });
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      toast({
        title: "Error!",
        description: "Failed to search users.",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [toast]);

  // Trigger search on input change with debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, debouncedSearch]);

  const handleAddMember = async (userId?: string, email?: string) => {
    try {
      if (userId) {
        // Adding an existing user (mock implementation)
        const user = searchResults.find(u => u.id === userId);
        if (user) {
          try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/group/add-member/${groupId}`, {
              userId: user.id,
            });
            if (response.data.success) {
              toast({
                title: "Success!",
                description: `${user.firstName || user.name} added to the group!`,
              });
            }else{
              toast({
                title: "Error!",
                description: "Failed to add member.",
                variant: "destructive",
              });
            }
          }catch(error){
            console.error('Error adding member:', error);
            toast({
              title: "Error!",
              description: "Failed to add member.",
              variant: "destructive",
            });
          }

          setMembers(prev => [...prev, user]);
        }
      } else if (email) {
        // Inviting a new user via email
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/invite-user`, {
          email,
          groupName: group?.name || 'Unnamed Group',
        });
        if (response.data.success) {
          toast({
            title: "Success!",
            description: `Invited ${email} to join the platform and group!`,
          });
        } else {
          toast({
            title: "Error!",
            description: response.data.msg || "Failed to send invitation.",
            variant: "destructive",
          });
        }
      }
      setSearchTerm('');
      setSearchResults([]);
      setIsAddMemberModalOpen(false);
    } catch (error) {
      console.error('Error adding/inviting member:', error);
      toast({
        title: "Error!",
        description: "Failed to add or invite member.",
        variant: "destructive",
      });
    }
  };
  const handleRemoveMember = async (memberId: string, memberName: string) => {
    try {
        if (!groupId) {
            throw new Error('Group ID is not available');
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/group/${groupId}/remove-member`, {
            userId: memberId
        });

        if (response.data.success) {
            fetchGroupData();
            toast({
                title: "Success!",
                description: `${memberName} removed from the group.`,
            });
        } else {
            throw new Error(response.data.message || 'Failed to remove member');
        }
    } catch (error) {
        console.error('Error removing member:', error);
        toast({
            title: "Error!",
            description: "Failed to remove member.",
            variant: "destructive",
        });
    }
};

const handleExpenseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setExpenseData(prev => ({ ...prev, [name]: value }));
};

const handleAddExpenseSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
      if (!groupId) {
          throw new Error('Group ID is not available');
      }
      if (!expenseData.title || !expenseData.amount || !expenseData.date) {
          toast({
              title: "Error!",
              description: "Please fill in all required fields.",
              variant: "destructive",
          });
          return;
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/expense/add/${groupId}`, {
          title: expenseData.title,
          amount: parseFloat(expenseData.amount),
          date: expenseData.date,
          description: expenseData.description,
          userId: user.id
      });

      if (response.data.success) {
          toast({
              title: "Success!",
              description: "Expense added successfully.",
          });
          setIsAddExpenseModalOpen(false);
          setExpenseData({ title: '', amount: '', date: '', description: '' });
          // Assuming fetchGroupData is a function to refresh group data including transactions
          if (typeof fetchGroupData === 'function') {
              fetchGroupData();
          }
      } else {
          throw new Error(response.data.message || 'Failed to add expense');
      }
  } catch (error) {
      console.error('Error adding expense:', error);
      toast({
          title: "Error!",
          description: "Failed to add expense.",
          variant: "destructive",
      });
  }
};


  const handleSettleUp = () => {
    toast({
      title: "Coming Soon!",
      description: "Settle up functionality will be implemented soon.",
    });
  };

  const handleAddExpense = () => {
    toast({
      title: "Coming Soon!",
      description: "Add expense functionality will be implemented soon.",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Coming Soon!",
      description: "Export report functionality will be implemented soon.",
    });
  };

  const handleShareGroup = () => {
    toast({
      title: "Coming Soon!",
      description: "Share group link functionality will be implemented soon.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-base sm:text-lg text-muted-foreground animate-pulse">Loading group details...</div>
        </div>
      </Layout>
    );
  }

  if (!group) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <h2 className="text-lg sm:text-xl font-medium text-muted-foreground">Group not found</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/groups')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Groups
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6 animate-fade-in">
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <Button variant="outline" size="sm" onClick={() => navigate('/groups')} className="w-full sm:w-auto">
            <ArrowLeft className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" /> Back to Groups
          </Button>
          <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 py-1 sm:px-4 sm:py-2 rounded-full animate-bounce-once w-full sm:w-auto justify-center sm:justify-start">
            <DollarSign className="h-3 sm:h-4 w-3 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Total Spent: {group.totalSpent.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
        </div>

        {/* Group Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxIDEgMiAyIDJoMnYtNGgtMmMtMSAwLTIgMS0yIDJ6TTMwIDRDMTMuNDMxIDQgMCAxNy40MzEgMCAzNHMxMy40MzEgMzAgMzAgMzAgMzAtMTMuNDMxIDMwLTMwUzQ2LjU2OSA0IDMwIDR6TTEwLjIyNSA0Mi42OGMtMi45MS0zLjk5LTMuOTYsOS45NDYsMS41MDYsMTQuOTFjMi45MSAyLjk5LDEwLjI0LTIuNDYsMTQuOTEtMS41MDZDMjkuNDYsNTEuNDYsMzAuOTYsMzcuOTMsMjcuMDUsMzRjLTQuOTYsLTQuOTEsMTAuOTYsMTAuOTEsMTQuOTEsMTQuOTFjMi45MSAyLjk5LTIuNDYsMTAuMjQtMS41MDYsMTQuOTFjNC45MSw0Ljk2LDE4LjQ0LDMuOTYsMTQuOTEsMS41MDZDMjUuNDYsNTkuNDYsMTAuOTYsNDMuOTMsMTAuMjI1LDQyLjY4eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Avatar className="h-10 w-10 sm:h-12 w-12 md:h-16 md:w-16 bg-white/20 border-2 border-white/40 animate-pulse-slow">
              <AvatarImage src={group.image} alt={group.name} />
              <AvatarFallback className="bg-white/30 text-indigo-800 font-bold text-base sm:text-lg md:text-xl">
                {group.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{group.name}</h1>
              <p className="text-indigo-100 text-xs sm:text-sm">Created on {formatDate(group.createdAt)}</p>
            </div>
          </div>
          <div className="relative z-10 mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm text-indigo-100 max-w-full overflow-hidden">
            {group.description}
          </div>
          <div className="relative z-10 mt-3 sm:mt-4 md:mt-6 flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white w-full sm:w-auto text-xs sm:text-sm" onClick={handleSettleUp}>
              <TrendingUp className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" /> Settle Up
            </Button>
            <Dialog open={isAddMemberModalOpen} onOpenChange={setIsAddMemberModalOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white w-full sm:w-auto text-xs sm:text-sm">
                  <UserPlus className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" /> Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="searchEmail" className="text-xs sm:text-sm font-medium">Search or Invite by Email</label>
                    <Input
                      id="searchEmail"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Type to search users or enter email to invite"
                      className="text-xs sm:text-sm"
                      autoComplete="off"
                    />
                    <p className="text-xs text-muted-foreground">Start typing to see suggestions or enter a full email to invite.</p>
                    {/* Search suggestions */}
                    {searchTerm && (
                      <div className="border rounded-md shadow-sm max-h-40 overflow-y-auto bg-background">
                        {isSearching ? (
                          <div className="p-2 text-xs sm:text-sm text-muted-foreground text-center animate-pulse">
                            Searching users...
                          </div>
                        ) : searchResults.length > 0 ? (
                          searchResults.map(user => (
                            <div
                              key={user.id}
                              className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
                              onClick={() => handleAddMember(user.id)}
                            >
                              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 bg-primary/10">
                                <AvatarFallback>{(user.firstName || user.name || '').split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.firstName || user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          ))
                        ) : searchTerm.includes('@') ? (
                          <div
                            className="p-2 hover:bg-muted cursor-pointer text-xs sm:text-sm border-t border-muted"
                            onClick={() => handleAddMember(undefined, searchTerm)}
                          >
                            <span className="font-medium">Invite {searchTerm} to join</span>
                            <div className="text-xs text-muted-foreground">This user will receive an email invitation.</div>
                          </div>
                        ) : (
                          <div className="p-2 text-xs sm:text-sm text-muted-foreground text-center">
                            No matching users found. Enter a full email to invite.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-1 sm:gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchTerm('');
                      setSearchResults([]);
                      setIsAddMemberModalOpen(false);
                    }}>Cancel</Button>
                    <Button size="sm" onClick={() => handleAddMember(undefined, searchTerm)} disabled={!searchTerm || !searchTerm.includes('@')}>
                      Send Invite
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddExpenseModalOpen} onOpenChange={setIsAddExpenseModalOpen}>
              <DialogTrigger asChild>
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white w-full sm:w-auto text-xs sm:text-sm">
                      <Plus className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" /> Add Expense
                  </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle>Add New Expense</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddExpenseSubmit} className="space-y-4 pt-3 sm:pt-4">
                      <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                              id="title"
                              name="title"
                              value={expenseData.title}
                              onChange={handleExpenseInputChange}
                              placeholder="Expense title"
                              required
                          />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <Input
                              id="amount"
                              name="amount"
                              type="number"
                              step="0.01"
                              value={expenseData.amount}
                              onChange={handleExpenseInputChange}
                              placeholder="0.00"
                              required
                          />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                              id="date"
                              name="date"
                              type="date"
                              value={expenseData.date}
                              onChange={handleExpenseInputChange}
                              required
                          />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="description">Description (optional)</Label>
                          <Input
                              id="description"
                              name="description"
                              value={expenseData.description}
                              onChange={handleExpenseInputChange}
                              placeholder="Additional details"
                          />
                      </div>
                      <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setIsAddExpenseModalOpen(false)}>
                              Cancel
                          </Button>
                          <Button type="submit">Add Expense</Button>
                      </div>
                  </form>
              </DialogContent>
          </Dialog>
            
          </div>
        </div>

        {/* Balance Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <Card className="border-green-100 bg-green-50/30 dark:bg-green-900/20 dark:border-green-800/30 shadow-sm overflow-hidden">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">You Are Owed</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-0">
              <div className="text-base sm:text-lg md:text-2xl font-bold text-green-800 dark:text-green-200">$120.75</div>
              <p className="text-[10px] sm:text-xs text-green-600 dark:text-green-400">from 2 members</p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30 dark:bg-red-900/20 dark:border-red-800/30 shadow-sm overflow-hidden">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300">You Owe</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-0">
              <div className="text-base sm:text-lg md:text-2xl font-bold text-red-800 dark:text-red-200">$0.00</div>
              <p className="text-[10px] sm:text-xs text-red-600 dark:text-red-400">to no one</p>
            </CardContent>
          </Card>
          <Card className="border-blue-100 bg-blue-50/30 dark:bg-blue-900/20 dark:border-blue-800/30 shadow-sm overflow-hidden">
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">Total Balance</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 sm:pt-0">
              <div className="text-base sm:text-lg md:text-2xl font-bold text-blue-800 dark:text-blue-200">+$120.75</div>
              <p className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400">net across group</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Transactions and Members */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Transactions Timeline */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2">
                <CardTitle className="text-sm sm:text-base md:text-lg font-medium">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs sm:text-sm" onClick={handleAddExpense}>
                  Add Expense
                </Button>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-4 sm:py-6 md:py-8 text-muted-foreground">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mx-auto text-gray-300 mb-1 sm:mb-2" />
                    <p className="text-xs sm:text-sm">No transactions yet. Add an expense to get started!</p>
                  </div>
                ) : (
                  <div className="relative space-y-3 sm:space-y-4 md:space-y-6">
                    {/* Timeline line */}
                    <div className="absolute left-2 sm:left-3 md:left-4 top-0 bottom-0 w-0.5 bg-muted" />
                    {transactions.map((txn, index) => (
                      <div key={txn.id} className="flex items-start gap-2 sm:gap-3 md:gap-4 relative">
                        <div className="absolute left-0 top-1 sm:top-2 -ml-2 sm:-ml-2.5 md:-ml-3.5 w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full bg-primary border-2 sm:border-3 md:border-4 border-background z-10" />
                        <div className="ml-5 sm:ml-6 md:ml-8 flex-1 pt-0.5 sm:pt-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                            <h4 className="font-medium text-xs sm:text-sm md:text-base">{txn.description}</h4>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-primary">
                              {txn.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </div>
                          </div>
                          <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 flex flex-wrap items-center gap-0.5 sm:gap-1 md:gap-2">
                            <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> {formatDate(txn.date)}
                            <span>•</span>
                            <span>Paid by {txn.paidBy}</span>
                            <span>•</span>
                            <span>Split with {txn.splitAmong.join(', ')}</span>
                          </div>
                          {index < transactions.length - 1 && <div className="mt-1 sm:mt-2 md:mt-4 h-px bg-muted" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Members Sidebar */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-1 sm:pb-2">
                <CardTitle className="text-sm sm:text-base md:text-lg font-medium">Group Members ({members.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-1 sm:p-2 hover:bg-muted/50 rounded-md transition-colors">
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 bg-primary/10">
                          <AvatarImage src={member.image} alt={member.firstName} />
                          <AvatarFallback className="bg-gradient-to-br from-pink-400 to-violet-600 text-white text-xs sm:text-sm">
                            {member.firstName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <h4 className="font-medium leading-tight text-xs sm:text-sm md:text-base truncate">{member.name}</h4>
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
                      {/* <Badge variant={member.balance > 0 ? "default" : member.balance < 0 ? "destructive" : "secondary"} className="text-[9px] sm:text-[10px] md:text-xs">
  {member.balance > 0 ? '+' : ''}{member.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
</Badge> */}
<Button
    size="sm"
    variant="ghost"
    className="h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-red-100 text-red-600"
    onClick={() => openRemoveConfirmation(member.id, member.userName)}
>
    <UserMinus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
</Button>

<Dialog open={isRemoveConfirmationOpen} onOpenChange={setIsRemoveConfirmationOpen}>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
        </DialogHeader>
        <div className="py-4">
            <p className="text-sm text-muted-foreground">
                Are you sure you want to remove <span className="font-medium text-foreground">{memberToRemove?.name}</span> from the group? This action cannot be undone.
            </p>
        </div>
        <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => {
                setIsRemoveConfirmationOpen(false);
                setMemberToRemove(null);
            }}>
                Cancel
            </Button>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                    if (memberToRemove) {
                        handleRemoveMember(memberToRemove.id, memberToRemove.name);
                        setIsRemoveConfirmationOpen(false);
                        setMemberToRemove(null);
                    }
                }}
            >
                Remove
            </Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
</div>
</div>
))}
</div>
</CardContent>
</Card>

{/* Quick Stats */}
<Card className="shadow-sm bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-900/20 dark:to-violet-900/20">
  <CardHeader className="pb-1 sm:pb-2">
    <CardTitle className="text-sm sm:text-base md:text-lg font-medium text-pink-700 dark:text-pink-300">Quick Stats</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2 sm:space-y-3">
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-sm text-pink-600 dark:text-pink-400">Total Transactions</span>
      <span className="font-bold text-xs sm:text-sm text-pink-800 dark:text-pink-200">{transactions.length}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-sm text-pink-600 dark:text-pink-400">Avg. Expense per Member</span>
      <span className="font-bold text-xs sm:text-sm text-pink-800 dark:text-pink-200">{(group.totalSpent / group.memberCount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-sm text-pink-600 dark:text-pink-400">Largest Expense</span>
      <span className="font-bold text-xs sm:text-sm text-pink-800 dark:text-pink-200">{Math.max(...transactions.map(t => t.amount)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
    </div>
  </CardContent>
</Card>

{/* Additional Actions */}
<Card className="shadow-sm bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
  <CardHeader className="pb-1 sm:pb-2">
    <CardTitle className="text-sm sm:text-base md:text-lg font-medium text-teal-700 dark:text-teal-300">Group Actions</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2 sm:space-y-3">
    <Button variant="outline" size="sm" className="w-full justify-start border-teal-200 text-teal-800 dark:text-teal-200 hover:bg-teal-100/30 dark:hover:bg-teal-900/30 text-xs sm:text-sm" onClick={handleExportReport}>
      <FileText className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" /> Export Report
    </Button>
    <Button variant="outline" size="sm" className="w-full justify-start border-teal-200 text-teal-800 dark:text-teal-200 hover:bg-teal-100/30 dark:hover:bg-teal-900/30 text-xs sm:text-sm" onClick={handleShareGroup}>
      <Share2 className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" /> Share Group Link
    </Button>
  </CardContent>
</Card>
</div>
</div>
</div>
</Layout>
  );
};

export default GroupDetail;