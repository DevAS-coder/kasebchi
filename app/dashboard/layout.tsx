import DashNavbar from '@/components/dashboard/DashNavbar';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <DashNavbar/>
        {children}
        </body>
    </html>
  );
};

export default Layout;
