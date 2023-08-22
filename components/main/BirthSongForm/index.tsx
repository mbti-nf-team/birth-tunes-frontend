import { useCallback, useState } from 'react';
import { SelectDatepicker } from 'react-select-datepicker';

import styles from './index.module.scss';

type Props = {
  onSubmit: (date: Date | null) => void;
};

function BirthSongForm({ onSubmit }: Props) {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const onDateChange = useCallback((date: Date | null) => {
    setBirthDate(date);
  }, []);

  return (
    <div className={styles.formWrapper}>
      <SelectDatepicker
        selectedDate={birthDate}
        onDateChange={onDateChange}
        order="year/month/day"
      />
      <button type="button" onClick={() => onSubmit(birthDate)} disabled={!birthDate}>
        계속하려면 누르세요
      </button>
    </div>
  );
}

export default BirthSongForm;
