/* eslint-disable react/jsx-props-no-spreading */
import {
  ButtonHTMLAttributes, HTMLProps, memo, PropsWithChildren, ReactElement,
} from 'react';

import Link from 'next/link';

import clsx from 'clsx';

import styles from './index.module.scss';

type ButtonType = 'primary' | 'secondary';

interface Props extends Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size'> {
  buttonType?: ButtonType;
  width?: `${number}px`;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

function Button({
  href,
  type = 'button',
  disabled,
  width,
  buttonType = 'primary',
  className,
  children,
  ...rest
}: PropsWithChildren<Props>): ReactElement {
  const htmlProps = rest as any;

  const buttonClassName = clsx(styles.buttonWrapper, {
    [styles[buttonType]]: buttonType,
  }, className);

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClassName}
        style={{
          width,
        }}
        {...htmlProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={buttonClassName}
      disabled={disabled}
      style={{
        width,
      }}
      {...htmlProps}
    >
      {children}
    </button>
  );
}

export default memo(Button);
