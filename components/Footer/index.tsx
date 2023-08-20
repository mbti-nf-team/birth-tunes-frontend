import clsx from 'clsx';

import styles from './index.module.scss';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={clsx(styles.footerItem, styles.left)}>
        <div className={styles.marquee}>
          <span className={styles.description}>Special Thanks To... 가요톱10, MC 손범수</span>
        </div>
      </div>
      <div className={clsx(styles.footerItem, styles.right)}>만든이:nfteam</div>
    </div>
  );
}

export default Footer;
