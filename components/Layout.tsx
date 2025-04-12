import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';
import { GoogleAnalytics } from '@next/third-parties/google'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>成大餐廳隨機選擇器</title>
      </Head>
      <GoogleAnalytics gaId="G-N9BTT1B82K" />
      {/* Navbar / Header */}
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;