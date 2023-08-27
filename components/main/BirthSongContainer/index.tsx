'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import BirthSongForm from '../BirthSongForm';
import BirthSongResult from '../BirthSongResult';

function BirthSongContainer() {
  const { get } = useSearchParams();
  const [birthDate, setBirthDate] = useState<string>('');

  useEffect(() => {
    const defaultBirthDate = get('date');

    if (defaultBirthDate) {
      setBirthDate(defaultBirthDate);
    }
  }, []);

  return (
    <>
      <BirthSongForm defaultBirthDate={birthDate} onSubmit={setBirthDate} />
      <BirthSongResult birthDate={birthDate} />
    </>
  );
}

export default BirthSongContainer;
