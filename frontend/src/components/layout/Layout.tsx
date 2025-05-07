
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto pl-16 md:pl-64 transition-all duration-300">
        <Header />
        <main className="p-6 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
