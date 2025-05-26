import DashNavbar from '@/components/dashboard/DashNavbar';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DashNavbar />
      {children}
    </>
  );
};

export default Layout;
