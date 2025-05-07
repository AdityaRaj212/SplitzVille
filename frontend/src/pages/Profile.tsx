
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      username: 'johndoe',
    },
  });

  const onSubmit = (data: any) => {
    toast({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully.',
    });
    console.log(data);
  };

  const handleAvatarUpload = () => {
    toast({
      title: 'Upload Avatar',
      description: 'Avatar upload functionality will be implemented soon.',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col items-center justify-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" onClick={handleAvatarUpload}>
                      Change Avatar
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Password</h3>
                <Button variant="outline" onClick={() => toast({ 
                  title: 'Change Password', 
                  description: 'Password change functionality will be implemented soon.' 
                })}>
                  Change Password
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Default Currency</h3>
                <div className="flex gap-4">
                  <Button variant="secondary" onClick={() => toast({ 
                    title: 'Currency Updated', 
                    description: 'Default currency set to USD.' 
                  })}>
                    USD ($)
                  </Button>
                  <Button variant="outline" onClick={() => toast({ 
                    title: 'Currency Updated', 
                    description: 'Default currency set to EUR.' 
                  })}>
                    EUR (€)
                  </Button>
                  <Button variant="outline" onClick={() => toast({ 
                    title: 'Currency Updated', 
                    description: 'Default currency set to GBP.' 
                  })}>
                    GBP (£)
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Notifications</h3>
                <Button variant="outline" onClick={() => toast({ 
                  title: 'Notification Settings', 
                  description: 'Notification settings page will be implemented soon.' 
                })}>
                  Manage Notifications
                </Button>
              </div>

              <div>
                <h3 className="font-medium mb-2">Connected Accounts</h3>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" onClick={() => toast({ 
                    title: 'Connect Account', 
                    description: 'Google account connection will be implemented soon.' 
                  })}>
                    Connect Google
                  </Button>
                  <Button variant="outline" onClick={() => toast({ 
                    title: 'Connect Account', 
                    description: 'Facebook account connection will be implemented soon.' 
                  })}>
                    Connect Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
