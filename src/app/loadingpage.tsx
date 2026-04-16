import React from 'react';
import styles from './loadingpage.module.css';

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p>Loading...</p>
    </div>
  );
}