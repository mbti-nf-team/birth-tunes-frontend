'use client';

import { useState } from 'react';

import BirthSongForm from '../BirthSongForm';
import BirthSongResult from '../BirthSongResult';

type Props = {
  defaultBirthDate: string;
};

function BirthSongContainer({ defaultBirthDate }: Props) {
  const [birthDate, setBirthDate] = useState<string>(defaultBirthDate);

  return (
    <>
      <BirthSongForm defaultBirthDate={defaultBirthDate} onSubmit={setBirthDate} />
      <BirthSongResult birthDate={birthDate} />
    </>
  );
}

export default BirthSongContainer;
