import React from 'react';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';
import { GoogleAnalytics } from '@next/third-parties/google'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <GoogleAnalytics gaId="G-N9BTT1B82K" />
      {/* Navbar / Header */}
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;