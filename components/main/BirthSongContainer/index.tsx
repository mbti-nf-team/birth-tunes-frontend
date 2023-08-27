'use client';

import { useState } from 'react';

import { removeNullable } from '@nf-team/core';

import BirthSongForm from '../BirthSongForm';
import BirthSongResult from '../BirthSongResult';

type Props = {
  defaultBirthDate?: string;
};

function BirthSongContainer({ defaultBirthDate }: Props) {
  const [birthDate, setBirthDate] = useState<string>(removeNullable(defaultBirthDate));

  return (
    <>
      <BirthSongForm defaultBirthDate={birthDate} onSubmit={setBirthDate} />
      <BirthSongResult birthDate={birthDate} />
    </>
  );
}

export default BirthSongContainer;
