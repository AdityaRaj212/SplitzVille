
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/ThemeProvider';

const Settings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleSwitchChange = (checked: boolean, setting: string) => {
    toast({
      title: `${setting} ${checked ? 'enabled' : 'disabled'}`,
      description: `You have ${checked ? 'enabled' : 'disabled'} ${setting.toLowerCase()}.`,
    });
  };

  const handleExportData = () => {
    toast({
      title: 'Export Data',
      description: 'Your data export has been initiated. You will receive an email with the download link shortly.',
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: 'Delete Account',
      description: 'Account deletion requires confirmation. This functionality will be implemented soon.',
      variant: 'destructive',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

        <div className="grid gap-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about new expenses and settlements.
                  </p>
                </div>
                <Switch 
                  id="email-notifications" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'Email Notifications')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser.
                  </p>
                </div>
                <Switch 
                  id="push-notifications" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'Push Notifications')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminder-notifications" className="font-medium">Payment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders about pending payments.
                  </p>
                </div>
                <Switch 
                  id="reminder-notifications" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'Payment Reminders')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>
                Control your privacy settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visibility" className="font-medium">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to find your profile by email.
                  </p>
                </div>
                <Switch 
                  id="profile-visibility" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'Profile Visibility')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activity-sharing" className="font-medium">Activity Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Share your expense activity with group members.
                  </p>
                </div>
                <Switch 
                  id="activity-sharing" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'Activity Sharing')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data</CardTitle>
              <CardDescription>
                Manage your personal data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Export Your Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download a copy of your personal data, including your expenses and settlements.
                </p>
                <Button variant="outline" onClick={handleExportData}>
                  Export Data
                </Button>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
