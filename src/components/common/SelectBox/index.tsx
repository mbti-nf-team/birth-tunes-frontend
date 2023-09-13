import {
  DetailedHTMLProps, memo, PropsWithChildren, SelectHTMLAttributes,
} from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import chevronIcon from '@/lib/assets/chevron.svg';

import styles from './index.module.scss';

type SelectType = 'primary' | 'secondary';

interface Props extends DetailedHTMLProps<
SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement
> {
  id: string;
  selectType?: SelectType;
  emptyOption?: string;
}

function SelectBox({
  id, selectType = 'secondary', children, emptyOption, className, ...rest
}: PropsWithChildren<Props>) {
  return (
    <div className={styles.selectBoxWrapper}>
      <select
        id={id}
        name={id}
        className={clsx(styles.selectWrapper, {
          [styles[selectType]]: selectType,
        }, className)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {emptyOption && (
          <option value="" disabled>{emptyOption}</option>
        )}
        {children}
      </select>
      <span className={styles.iconWrapper}>
        <Image className={styles.icon} src={chevronIcon} alt="icon" />
      </span>
    </div>
  );
}

export default memo(SelectBox);
