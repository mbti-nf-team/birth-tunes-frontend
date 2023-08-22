'use client';

import { useState } from 'react';

import BirthSongForm from '../BirthSongForm';
import BirthSongResult from '../BirthSongResult';

function BirthSongContainer() {
  const [birthDateForm, onSubmit] = useState<Date | null>(null);

  return (
    <>
      <BirthSongForm onSubmit={onSubmit} />
      <BirthSongResult birthDate={birthDateForm} />
    </>
  );
}

export default BirthSongContainer;
