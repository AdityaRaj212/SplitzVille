
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Users, 
  Home, 
  Receipt, 
  User, 
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/components/theme/ThemeProvider';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const { theme } = useTheme();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    toast({
      title: "Expense Added",
      description: "Your expense has been successfully added.",
    });
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        theme === 'dark' ? "bg-sidebar dark border-r border-sidebar-border" : "bg-sidebar border-r border-sidebar-border"
      )}
      style={{
        backgroundColor: theme === 'dark' ? 'hsl(var(--sidebar-background))' : 'hsl(var(--sidebar-background))'
      }}
    >
      <div className={cn(
        "flex items-center justify-between p-4 border-b",
        theme === 'dark' ? "border-sidebar-border" : "border-sidebar-border"
      )}>
        {!collapsed && (
          <h1 className={cn(
            "text-xl font-bold",
            theme === 'dark' ? "text-sidebar-foreground" : "text-sidebar-foreground"
          )}>SettleShare</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className={cn(
            theme === 'dark' ? "text-sidebar-foreground" : "text-sidebar-foreground"
          )}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          <SidebarLink to="/" icon={<Home size={20} />} label="Dashboard" collapsed={collapsed} isActive={location.pathname === '/'} />
          <SidebarLink to="/groups" icon={<Users size={20} />} label="My Groups" collapsed={collapsed} isActive={location.pathname === '/groups'} />
          <SidebarLink to="/expenses" icon={<Receipt size={20} />} label="Expenses" collapsed={collapsed} isActive={location.pathname === '/expenses'} />
          <SidebarLink to="/profile" icon={<User size={20} />} label="Profile" collapsed={collapsed} isActive={location.pathname === '/profile'} />
          <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={collapsed} isActive={location.pathname === '/settings'} />
        </nav>
      </div>

      <div className={cn(
        "p-4 border-t",
        theme === 'dark' ? "border-sidebar-border" : "border-sidebar-border"
      )}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              className={cn(
                "w-full bg-primary hover:bg-primary/90 text-white",
                collapsed ? "p-2 justify-center" : "px-4 py-2"
              )}
            >
              <Plus size={collapsed ? 20 : 16} className={collapsed ? "" : "mr-2"} />
              {!collapsed && "New Expense"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Expense title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group">Group</Label>
                <Input id="group" placeholder="Select a group" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input id="description" placeholder="Add more details..." />
              </div>
              <Button type="submit" className="w-full">Add Expense</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  isActive: boolean;
}

const SidebarLink = ({ to, icon, label, collapsed, isActive }: SidebarLinkProps) => {
  const { theme } = useTheme();
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center p-2 rounded-md transition-colors",
        collapsed ? "justify-center" : "px-4",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : `text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`,
        theme === 'dark' ? "text-sidebar-foreground" : ""
      )}
    >
      <div className="flex items-center">
        <span className={cn("", collapsed ? "" : "mr-3")}>{icon}</span>
        {!collapsed && <span>{label}</span>}
      </div>
    </Link>
  );
};

export default Sidebar;
