import styles from './Header.module.css'

export function Header() {
  return (
    <div className={styles.header}>
      <img src="/assets/rocket.svg" alt="logo" />
      <h1><span>To</span><span>Do</span></h1>
    </div>
  )
}