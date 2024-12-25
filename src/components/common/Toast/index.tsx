'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import clsx from 'clsx';
import { AnimationDefinition, motion, Variants } from 'motion/react';

import useToastStore from '@/stores/toast';

import styles from './index.module.scss';

const toastVariants: Variants = {
  none: {
    opacity: 0,
    transform: 'translateY(100%)',
    transitionEnd: {
      visibility: 'hidden',
      display: 'none',
    },
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    visibility: 'visible',
    display: 'flex',
  },
};

function Toast() {
  const {
    isRender, title, closeToast, delay, type, description,
  } = useToastStore(['isRender', 'type', 'description', 'title', 'delay', 'closeToast']);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);

  const handleAnimationComplete = useCallback((definition: AnimationDefinition) => {
    if (definition === 'none') {
      closeToast();
    }
  }, []);

  useEffect(() => {
    if (isOpenToast) {
      timer.current = setTimeout(() => {
        setIsOpenToast(false);
        timer.current = null;
      }, delay);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isOpenToast, delay]);

  useEffect(() => {
    if (isRender) {
      setIsOpenToast(true);
    }
  }, [isRender]);

  return (
    <motion.div
      animate={isOpenToast ? 'visible' : 'none'}
      initial="none"
      variants={toastVariants}
      className={styles.toastContainer}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className={clsx(styles.toastBox, styles[type])}>
        {title && (
          <div className={styles.title}>
            {title}
          </div>
        )}
        {description && (
          <div className={styles.description}>
            {description}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Toast;
