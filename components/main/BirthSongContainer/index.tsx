'use client';

import { useState } from 'react';

import BirthSongForm from '../BirthSongForm';
import BirthSongResult from '../BirthSongResult';

function BirthSongContainer() {
  const [birthDate, setBirthDate] = useState<string>('');

  return (
    <>
      <BirthSongForm onSubmit={setBirthDate} />
      <BirthSongResult birthDate={birthDate} />
    </>
  );
}

export default BirthSongContainer;
