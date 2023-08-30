import clsx from 'clsx';

import styles from './index.module.scss';

function Footer() {
  const description = 'Special Thanks To 가요톱10, MC 손범수, 생방송 뮤직뱅크, Melon';

  return (
    <footer className={styles.footerWrapper}>
      <div className={clsx(styles.footerItem, styles.left)}>
        <div className={styles.marquee}>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
      <div className={clsx(styles.footerItem, styles.right)}>만든이:nfteam</div>
    </footer>
  );
}

export default Footer;
