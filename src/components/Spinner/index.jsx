import React from 'react'
import styles from '../Spinner/Spinner.module.css'

export function Spinner() {
  return (
    <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}></div>
    </div>
  )
}
