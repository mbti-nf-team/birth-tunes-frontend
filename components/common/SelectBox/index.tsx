import { DetailedHTMLProps, PropsWithChildren, SelectHTMLAttributes } from 'react';

import clsx from 'clsx';

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
  );
}

export default SelectBox;
