'use client';

import { useCallback, useState } from 'react';

import useActivityLog from '@/hooks/useActivityLog';

import BirthSongForm from '../BirthSongForm';
import BirthSongResult from '../BirthSongResult';

type Props = {
  defaultBirthDate: string;
};

function BirthSongContainer({ defaultBirthDate }: Props) {
  const { sendEvent } = useActivityLog();
  const [birthDate, setBirthDate] = useState<string>(defaultBirthDate);

  const onSubmit = useCallback((date: string) => {
    setBirthDate(date);

    sendEvent({
      name: 'view_result_song_clicked',
      action: 'click',
      type: 'success',
      value: {
        date,
      },
    });
  }, []);

  return (
    <>
      <BirthSongForm defaultBirthDate={defaultBirthDate} onSubmit={onSubmit} />
      <BirthSongResult birthDate={birthDate} />
    </>
  );
}

export default BirthSongContainer;
