import React from 'react';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      {/* Navbar / Header */}
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
