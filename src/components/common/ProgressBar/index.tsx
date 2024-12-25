import { useNProgress } from '@tanem/react-nprogress';
import { motion, Variants } from 'motion/react';

import styles from './index.module.scss';

const progressVariants: Variants = {
  none: {
    opacity: 0,
    visibility: 'hidden',
    display: 'none',
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
    display: 'flex',
  },
};

interface Props {
  isAnimating: boolean;
  animationDuration?: number;
  incrementDuration?: number;
  minimum?: number;
}

function ProgressBar({ isAnimating, ...rest }: Props) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
    ...rest,
  });

  return (
    <motion.div
      className={styles.progressContainer}
      initial="none"
      animate={isFinished ? 'none' : 'visible'}
      variants={progressVariants}
    >
      <div className={styles.progressText}>
        <div>{`${Math.floor(progress * 100)}%`}</div>
        <div>Loading...</div>
      </div>
      <div
        className={styles.progressBarWrapper}
      >
        <div
          className={styles.progressBar}
          style={{
            transition: `width ${animationDuration}ms linear`,
            width: `${(progress * 100)}%`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default ProgressBar;
