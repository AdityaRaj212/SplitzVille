import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, LogIn } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext'; 

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();
      const firstName = formData.get('register-first-name')?.toString();
      const lastName = formData.get('register-last-name')?.toString();

      if (!email || !password) {
        toast({
          title: "Error!",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (event.currentTarget.id === 'register') {
        // Register user
        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { email, password, firstName, lastName })
          .then(response => {
            toast({
              title: "Success!",
              description: "You have successfully registered.",
            });
            // Assuming the backend returns a token and user data
            const { token, user } = response.data;
            login(user, token); // Store user and token in context
            // navigate('/dashboard'); // Navigation is handled by login function
          })
          .catch(error => {
            toast({
              title: "Error!",
              description: error.response?.data?.msg || "Registration failed.",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        // Login user
        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password })
          .then(response => {
            toast({
              title: "Success!",
              description: "You have successfully signed in.",
            });
            // Assuming the backend returns a token and user data
            const { token, user } = response.data;
            login(user, token); // Store user and token in context
            // navigate('/dashboard'); // Navigation is handled by login function
          })
          .catch(error => {
            console.error(error);
            toast({
              title: "Error!",
              description: error.response?.data?.msg || "Login failed.",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while signing in.",
        variant: "destructive",
      });
      console.error(error);
      setIsLoading(false);
    }
  };

  // Rest of your component remains the same
  return (
    <Card className="w-full max-w-md overflow-hidden border-none shadow-lg animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-background -z-10" />
      
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <LogIn className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">SplitzVille</CardTitle>
        <p className="text-sm text-muted-foreground">Split expenses with friends & family</p>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4" id="login">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a className="text-xs text-primary hover:underline" href="#">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    className="pl-10" 
                    required 
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4" id="register">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-first-name">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="register-first-name" 
                      name="register-first-name" 
                      type="text" 
                      className="pl-10" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-last-name">Last Name</Label>
                  <div className="relative">
                    <Input 
                      id="register-last-name" 
                      name="register-last-name" 
                      type="text" 
                      className="pl-3" 
                      required 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="register-email" 
                    name="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="register-password" 
                    name="password" 
                    type="password" 
                    className="pl-10" 
                    required 
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="w-full" type="button">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="w-full" type="button">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground pt-0">
        <p>
          By signing up, you agree to our 
          <a href="#" className="text-primary hover:underline mx-1">Terms of Service</a>
          and
          <a href="#" className="text-primary hover:underline ml-1">Privacy Policy</a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
// import { useToast } from '@/hooks/use-toast';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, LogIn } from 'lucide-react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// const AuthForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     setIsLoading(true);
//     console.log('init');
//     event.preventDefault();
//     try{
//       const formData = new FormData(event.currentTarget);
//       const email = formData.get('email')?.toString();
//       const password = formData.get('password')?.toString();
//       const firstName = formData.get('register-first-name')?.toString();
//       const lastName = formData.get('register-last-name')?.toString();

//       if (!email || !password) {
//         toast({
//           title: "Error!",
//           description: "Please fill in all fields.",
//           variant: "destructive",
//         });
//         console.log('here')
//         console.log(email);
//         return;
//       }

//       if (event.currentTarget.id === 'register') {
//         // Register user
//         axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { email, password, firstName, lastName })
//           .then(response => {
//             toast({
//               title: "Success!",
//               description: "You have successfully registered.",
//             });
//             navigate('/dashboard');
//           })
//           .catch(error => {
//             toast({
//               title: "Error!",
//               description: error.response.data.msg,
//               variant: "destructive",
//             });
//           }).finally(()=>{
//             setIsLoading(false);
//           }
//         );
//       } else {
//         // Login user
//         axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password })
//           .then(response => {
//             toast({
//               title: "Success!",
//               description: "You have successfully signed in.",
//             });
//             navigate('/dashboard');
//           })
//           .catch(error => {
//             console.error(error);
//             toast({
//               title: "Error!",
//               description: error.response.data.msg,
//               variant: "destructive",
//             });
//           }).finally(()=>{
//             setIsLoading(false);
//           });
//       }
//     }catch(error){
//       toast({
//         title: "Error!",
//         description: "An error occurred while signing in.",
//         variant: "destructive",
//       });
//       console.error(error);
//     };
//   };

//   return (
//     <Card className="w-full max-w-md overflow-hidden border-none shadow-lg animate-fade-in">
//       <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-background -z-10" />
      
//       <CardHeader className="space-y-1 text-center">
//         <div className="flex justify-center mb-2">
//           <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
//             <LogIn className="h-6 w-6 text-white" />
//           </div>
//         </div>
//         <CardTitle className="text-2xl font-bold">SplitzVille</CardTitle>
//         <p className="text-sm text-muted-foreground">Split expenses with friends & family</p>
//       </CardHeader>
      
//       <CardContent>
//         <Tabs defaultValue="login" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-6">
//             <TabsTrigger value="login">Login</TabsTrigger>
//             <TabsTrigger value="register">Register</TabsTrigger>
//           </TabsList>
          
//           <TabsContent value="login" className="space-y-4">
//             <form onSubmit={handleSubmit} className="space-y-4" id="login">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     id="email" 
//                     name="email"
//                     type="email" 
//                     placeholder="name@example.com" 
//                     className="pl-10" 
//                     required 
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <Label htmlFor="password">Password</Label>
//                   <a className="text-xs text-primary hover:underline" href="#">
//                     Forgot password?
//                   </a>
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     id="password" 
//                     name="password" 
//                     type="password" 
//                     className="pl-10" 
//                     required 
//                   />
//                 </div>
//               </div>
              
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Signing in..." : "Sign in"}
//               </Button>
//             </form>
//           </TabsContent>
          
//           <TabsContent value="register" className="space-y-4">
//             <form onSubmit={handleSubmit} className="space-y-4" id="register">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="register-first-name">First Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input 
//                       id="register-first-name" 
//                       name="register-first-name" 
//                       type="text" 
//                       className="pl-10" 
//                       required 
//                     />
//                   </div>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="register-last-name">Last Name</Label>
//                   <div className="relative">
//                     <Input 
//                       id="register-last-name" 
//                       name="register-last-name" 
//                       type="text" 
//                       className="pl-3" 
//                       required 
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="register-email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     id="register-email" 
//                     name="register-email" 
//                     type="email" 
//                     placeholder="name@example.com" 
//                     className="pl-10" 
//                     required 
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="register-password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     id="register-password" 
//                     name="register-password" 
//                     type="password" 
//                     className="pl-10" 
//                     required 
//                   />
//                 </div>
//               </div>
              
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Creating account..." : "Create account"}
//               </Button>
//             </form>
//           </TabsContent>

//         </Tabs>

//         <div className="relative mt-6">
//           <div className="absolute inset-0 flex items-center">
//             <Separator className="w-full" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
//           </div>
//         </div>

//         <div className="flex gap-2 mt-6">
//           <Button variant="outline" className="w-full" type="button">
//             <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//               <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
//             </svg>
//             Google
//           </Button>
//           <Button variant="outline" className="w-full" type="button">
//             <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//               <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
//             </svg>
//             Facebook
//           </Button>
//         </div>
//       </CardContent>
      
//       <CardFooter className="flex justify-center text-sm text-muted-foreground pt-0">
//         <p>
//           By signing up, you agree to our 
//           <a href="#" className="text-primary hover:underline mx-1">Terms of Service</a>
//           and
//           <a href="#" className="text-primary hover:underline ml-1">Privacy Policy</a>.
//         </p>
//       </CardFooter>
//     </Card>
//   );
// };

// export default AuthForm;