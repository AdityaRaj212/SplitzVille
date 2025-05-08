import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle, DollarSign, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from 'react-error-boundary';
import Spline from '@splinetool/react-spline';

// Animated component that appears when scrolled into view
const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  function FallbackComponent() {
    return <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">3D scene failed to load</div>;
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8, delay: delay }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <header className="border-b py-4 px-4 md:px-6 lg:px-10 bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <DollarSign className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold">SplitzVille</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-2"
          >
            <Link to="/auth">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link to="/auth">
              <Button 
                size="sm"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light transform transition-transform duration-300 group-hover:scale-110"></div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5 animate-gradient-xy">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Split expenses, <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">not friendships</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              The simplest way to track, manage, and settle expenses with friends, roommates, and groups.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="gap-2 relative overflow-hidden transition-all duration-300 active:translate-y-1 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.5)]"
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="h-4 w-4 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light transform transition-transform duration-300 hover:scale-110"></div>
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg">
                  Log In
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/50 to-primary/20 blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative h-full w-full rounded-2xl bg-card border shadow-xl overflow-hidden">
                {/* Replace with Spline 3D model for interactive element */}
                <Spline scene="https://prod.spline.design/yVyTPz77GIK4OVEy/scene.splinecode" />
                {/* <ErrorBoundary FallbackComponent={FallbackComponent}>
                  <Spline scene="https://prod.spline.design/yVyTPz77GIK4OVEy/scene.splinecode" />
                </ErrorBoundary> */}
                {/* <div className="w-full h-full bg-gray-100 rounded-xl" /> */}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white text-lg font-medium">
                    Effortlessly track and settle expenses
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="container mx-auto space-y-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold">Why choose SplitzVille?</h2>
              <p className="text-muted-foreground">Our powerful yet simple features make expense sharing a breeze</p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <AnimatedSection delay={0.1}>
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simple Expense Tracking</h3>
                <p className="text-muted-foreground">
                  Add expenses on the go, assign costs to group members, and get instant calculations.
                </p>
              </motion.div>
            </AnimatedSection>

            {/* Feature 2 */}
            <AnimatedSection delay={0.2}>
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Group Management</h3>
                <p className="text-muted-foreground">
                  Create multiple groups for different occasions, trips, or living arrangements.
                </p>
              </motion.div>
            </AnimatedSection>

            {/* Feature 3 */}
            <AnimatedSection delay={0.3}>
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p className="text-muted-foreground">
                  Safely settle debts with integrated payment options and transaction history.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 bg-muted/30 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 animate-gradient-xy"></div>
        <div className="container mx-auto space-y-12 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold">How SplitzVille Works</h2>
              <p className="text-muted-foreground">Three simple steps to financial harmony</p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-2xl text-primary-foreground font-bold"
                >
                  1
                </motion.div>
                <h3 className="text-xl font-semibold">Create Groups</h3>
                <p className="text-muted-foreground">
                  Invite friends, roommates, or colleagues to join your expense groups.
                </p>
              </div>
            </AnimatedSection>

            {/* Step 2 */}
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-2xl text-primary-foreground font-bold"
                >
                  2
                </motion.div>
                <h3 className="text-xl font-semibold">Log Expenses</h3>
                <p className="text-muted-foreground">
                  Add expenses as they happen and specify who paid and who benefited.
                </p>
              </div>
            </AnimatedSection>

            {/* Step 3 */}
            <AnimatedSection delay={0.3}>
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-2xl text-primary-foreground font-bold"
                >
                  3
                </motion.div>
                <h3 className="text-xl font-semibold">Settle Up</h3>
                <p className="text-muted-foreground">
                  View balances at a glance and settle debts with minimal transactions.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 bg-background overflow-hidden">
        <div className="container mx-auto space-y-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold">What Our Users Say</h2>
              <p className="text-muted-foreground">Join thousands of satisfied SplitzVille users</p>
            </div>
          </AnimatedSection>
          
          <div className="relative">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-6"
          >
            {/* Testimonial Cards - Duplicated for infinite scroll effect */}
            {[...Array(6)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-6">
                {/* Testimonial 1 */}
                <div className="bg-card rounded-xl p-6 border shadow-sm min-w-[300px]">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 italic">
                    "SplitzVille has revolutionized how our friend group handles travel expenses. No more awkward conversations about who owes what!"
                  </p>
                  <div className="font-medium">Sarah K.</div>
                  <div className="text-sm text-muted-foreground">Travel enthusiast</div>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-card rounded-xl p-6 border shadow-sm min-w-[300px]">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 italic">
                    "Managing apartment expenses with roommates was a nightmare until we found SplitzVille. It's intuitive and keeps everything transparent."
                  </p>
                  <div className="font-medium">Michael T.</div>
                  <div className="text-sm text-muted-foreground">Apartment-sharing pro</div>
                </div>

                {/* Testimonial 3 */}
                <div className="bg-card rounded-xl p-6 border shadow-sm min-w-[300px]">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 italic">
                    "The instant calculations and fair splits have saved me countless hours and prevented so many potential disagreements among friends."
                  </p>
                  <div className="font-medium">James R.</div>
                  <div className="text-sm text-muted-foreground">Friend group organizer</div>
                </div>
              </div>
            ))}
          </motion.div>

            {/* <motion.div 

              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-6"
            >
              {[...Array(6)].map((_, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  <div className="bg-card rounded-xl p-6 border shadow-sm min-w-[300px]">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">
                      "SplitzVille has revolutionized how our friend group handles travel expenses. No more awkward conversations about who owes what!"
                    </p>
                    <div className="font-medium">Sarah K.</div>
                    <div className="text-sm text-muted-foreground">Travel enthusiast</div>
                  </div>

                  <div className="bg-card rounded-xl p-6 border shadow-sm min-w-[300px]">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">
                      "Managing apartment expenses with roommates was a nightmare until we found SplitzVille. It's intuitive and keeps everything transparent."
                    </p>
                    <div className="font-medium">Michael T.</div>
                    <div className="text-sm text-muted-foreground">Apartment-sharing pro</div>
                  </div>

                  <div className="bg-card rounded-xl p-6 border shadow-sm min-w-[300px]">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">
                      "The instant calculations and fair splits have saved me countless hours and prevented so many potential disagreements among friends."
                    </p>
                    <div className="font-medium">James R.</div>
                    <div className="text-sm text-muted-foreground">Friend group organizer</div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div> */}
            
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 animate-gradient-xy"></div>
        <AnimatedSection>
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to simplify expense sharing?</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users who have transformed how they manage shared expenses.
              </p>
              <div className="pt-4">
                <Link to="/auth">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="px-8 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Create Your Free Account</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light transform transition-transform duration-300 group-hover:scale-110"></div>
                    </Button>
                  </motion.div>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-6 pt-6">
                {/* Trust indicators */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>No credit card required</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Free for personal use</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Cancel anytime</span>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t mt-auto bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <DollarSign className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="font-semibold">SplitzVille</span>
            </motion.div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SplitzVille. All rights reserved.
            </div>
            <div className="flex gap-6">
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-muted-foreground hover:text-foreground"
              >
                Terms
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-muted-foreground hover:text-foreground"
              >
                Support
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
