import { PropsWithChildren } from 'react';

import Image from 'next/image';

import styles from './index.module.scss';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.contentWrapper}>
        <Image
          src="/images/desktop-image.png"
          alt="desktop-background-image"
          width={640}
          height={568}
          priority
          quality={100}
          className={styles.backgroundImage}
        />
        <div className={styles.contentBox}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
