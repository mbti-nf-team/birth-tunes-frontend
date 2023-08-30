import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import styles from './index.module.scss';

type Props = {
  type: 'default' | 'success' | 'danger';
};

function FrameTitle({ type, children }: PropsWithChildren<Props>) {
  return (
    <div className={clsx(styles.frameTitleWrapper, styles[type])}>
      <div className={styles.title}>
        {children}
      </div>
    </div>
  );
}

export default FrameTitle;
