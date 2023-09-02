'use client';

import { useCallback, useState } from 'react';
import ReactGA from 'react-ga4';

import { GA4_EVENT_ACTION, GA4_EVENT_NAME, GA4_EVENT_TYPE } from '../../../lib/constants/ga4';
import BirthSongForm from '../BirthSongForm';
import BirthSongResult from '../BirthSongResult';

type Props = {
  defaultBirthDate: string;
};

function BirthSongContainer({ defaultBirthDate }: Props) {
  const [birthDate, setBirthDate] = useState<string>(defaultBirthDate);

  const onSubmit = useCallback((date: string) => {
    setBirthDate(date);

    ReactGA.event(GA4_EVENT_NAME.view_result_song_clicked, {
      action: GA4_EVENT_ACTION.click,
      type: GA4_EVENT_TYPE.success,
      date,
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
