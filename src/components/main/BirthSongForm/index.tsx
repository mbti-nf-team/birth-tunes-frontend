import { useCallback, useState } from 'react';

import dayjs from 'dayjs';

import Button from '@/components/common/Button';

import BirthSelectDatePicker from '../BirthSelectDatePicker';

import styles from './index.module.scss';

type Props = {
  onSubmit: (date: string) => void;
  defaultBirthDate: string;
};

function BirthSongForm({ onSubmit, defaultBirthDate }: Props) {
  const [birthDate, setBirthDate] = useState<string>(defaultBirthDate);

  const onBirthChange = useCallback((date: string) => setBirthDate(date), []);

  const disabled = !birthDate || !dayjs(birthDate).isValid() || dayjs().isBefore(dayjs(birthDate));

  return (
    <div className={styles.formWrapper}>
      <BirthSelectDatePicker defaultBirthDate={defaultBirthDate} onBirthChange={onBirthChange} />
      <Button buttonType="primary" onClick={() => onSubmit(birthDate)} disabled={disabled}>
        계속하려면 누르세요
      </Button>
    </div>
  );
}

export default BirthSongForm;
