import { useCallback, useState } from 'react';

import Button from '../../common/Button';
import BirthSelectDatePicker from '../BirthSelectDatePicker';

import styles from './index.module.scss';

type Props = {
  onSubmit: (date: string) => void;
};

function BirthSongForm({ onSubmit }: Props) {
  const [birthDate, setBirthDate] = useState<string>('');

  const onBirthChange = useCallback((date: string) => setBirthDate(date), []);

  return (
    <div className={styles.formWrapper}>
      <BirthSelectDatePicker onBirthChange={onBirthChange} />
      <Button buttonType="primary" onClick={() => onSubmit(birthDate)} disabled={!birthDate}>
        계속하려면 누르세요
      </Button>
    </div>
  );
}

export default BirthSongForm;
