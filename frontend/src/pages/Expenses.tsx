
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ExpenseList, { Expense } from '@/components/expenses/ExpenseList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Expenses = () => {
  const { toast } = useToast();
  const [filterValue, setFilterValue] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleAddExpense = () => {
    toast({
      title: "Add Expense",
      description: "Expense creation functionality will be implemented soon.",
    });
  };

  // Updated sample expense data to match the Expense type
  const expenses: Expense[] = [
    {
      id: '1',
      title: 'Dinner at Italian Restaurant',
      amount: 120.50,
      paidBy: {
        name: 'John Doe',
        initials: 'JD',
        avatar: '/placeholder.svg'
      },
      group: {
        name: 'Roommates',
        id: '1'
      },
      date: '2025-04-30',
      splitWith: [
        { name: 'John Doe', initials: 'JD', avatar: '/placeholder.svg', amount: 40.17 },
        { name: 'Jane Smith', initials: 'JS', avatar: '/placeholder.svg', amount: 40.17 },
        { name: 'Alex Brown', initials: 'AB', avatar: '/placeholder.svg', amount: 40.16 }
      ],
      hasReceipt: true,
    },
    {
      id: '2',
      title: 'Groceries',
      amount: 87.25,
      paidBy: {
        name: 'Jane Smith',
        initials: 'JS',
        avatar: '/placeholder.svg'
      },
      group: {
        name: 'Roommates',
        id: '1'
      },
      date: '2025-04-28',
      splitWith: [
        { name: 'John Doe', initials: 'JD', avatar: '/placeholder.svg', amount: 43.62 },
        { name: 'Jane Smith', initials: 'JS', avatar: '/placeholder.svg', amount: 43.63 }
      ]
    },
    {
      id: '3',
      title: 'Taxi to Airport',
      amount: 35.00,
      paidBy: {
        name: 'Mike Johnson',
        initials: 'MJ',
        avatar: '/placeholder.svg'
      },
      group: {
        name: 'Trip to Paris',
        id: '2'
      },
      date: '2025-04-25',
      splitWith: [
        { name: 'John Doe', initials: 'JD', avatar: '/placeholder.svg', amount: 17.50 },
        { name: 'Mike Johnson', initials: 'MJ', avatar: '/placeholder.svg', amount: 17.50 }
      ],
      hasReceipt: false
    },
    {
      id: '4',
      title: 'Hotel Booking',
      amount: 450.00,
      paidBy: {
        name: 'John Doe',
        initials: 'JD',
        avatar: '/placeholder.svg'
      },
      group: {
        name: 'Trip to Paris',
        id: '2'
      },
      date: '2025-04-20',
      splitWith: [
        { name: 'John Doe', initials: 'JD', avatar: '/placeholder.svg', amount: 150.00 },
        { name: 'Mike Johnson', initials: 'MJ', avatar: '/placeholder.svg', amount: 150.00 },
        { name: 'Sarah Williams', initials: 'SW', avatar: '/placeholder.svg', amount: 150.00 }
      ],
      hasReceipt: true
    }
  ];

  // Filter expenses based on search term and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(filterValue.toLowerCase()) || 
                         (expense.group?.name.toLowerCase().includes(filterValue.toLowerCase()) || false);
    const matchesCategory = filterCategory === 'all' || expense.title.includes(filterCategory);
    return matchesSearch && matchesCategory;
  });

  // Data for analytics charts
  const categoryChartData = [
    { name: 'Food', value: 120.50, fill: '#10B981' },
    { name: 'Groceries', value: 87.25, fill: '#3B82F6' },
    { name: 'Transportation', value: 35.00, fill: '#6366F1' },
    { name: 'Accommodation', value: 450.00, fill: '#F43F5E' },
  ];

  const monthlyChartData = [
    { month: 'Jan', amount: 320 },
    { month: 'Feb', amount: 450 },
    { month: 'Mar', amount: 280 },
    { month: 'Apr', amount: 693 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 },
  ];

  // For the pie chart config
  const COLORS = ['#10B981', '#3B82F6', '#6366F1', '#F43F5E'];
  const chartConfig = {
    Food: { label: 'Food', color: '#10B981' },
    Groceries: { label: 'Groceries', color: '#3B82F6' },
    Transportation: { label: 'Transportation', color: '#6366F1' },
    Accommodation: { label: 'Accommodation', color: '#F43F5E' },
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
          <Button onClick={handleAddExpense}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer className="h-[250px]" config={chartConfig}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    nameKey="name"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="p-4">
                <ChartLegend className="justify-center">
                  <ChartLegendContent payload={categoryChartData.map((item, index) => ({
                    value: item.name,
                    color: COLORS[index % COLORS.length],
                    dataKey: item.name,
                  }))} />
                </ChartLegend>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer className="h-[250px]" config={chartConfig}>
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="#3B82F6" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input 
            placeholder="Search expenses..." 
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Groceries">Groceries</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Accommodation">Accommodation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Expense List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseList expenses={filteredExpenses} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Expenses;
