import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="https://github.com/moon-jam/nckufood" target="_blank" rel="noopener noreferrer">
          GitHub Repo
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1F3VwyOxpUtaBsHH2KckW2Ce65PybchZEYTiSiyfdYzs/edit?gid=0#gid=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          餐廳試算表
        </a>
      </div>
      <div className={styles.copyright}>
        © {currentYear} <FontAwesomeIcon icon={faPaw} /> Moon Jam
      </div>
    </footer>
  );
};

export default Footer;

