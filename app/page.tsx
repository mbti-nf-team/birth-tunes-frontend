'use client';

import { useCallback, useState } from 'react';
import { SelectDatepicker } from 'react-select-datepicker';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import IframeVideoPlayer from '../components/IframeVideoPlayer';
import { fetchMusicChartSong } from '../lib/apis/search';

import styles from './index.module.scss';

function Home() {
  const [birthDateForm, onSubmit] = useState<Date | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const { data: findBirthSong, isSuccess } = useQuery(['musicChartSong', birthDateForm], () => fetchMusicChartSong({
    date: dayjs(birthDateForm).format('YYYY-MM-DD'),
    musicChartId: 1,
  }), {
    enabled: !!birthDateForm,
  });

  const onDateChange = useCallback((date: Date | null) => {
    setBirthDate(date);
  }, []);

  return (
    <main className={styles.mainWrapper}>
      <pre className={styles.title}>
        {`
+-------------------+
¦      내 생일      ¦
¦   1위 노래 찾기   ¦
+-------------------+
        `}
      </pre>
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
      {isSuccess && (
        <div className={styles.resultWrapper}>
          <div className={styles.resultContentsWrapper}>
            <div className={styles.titleWrapper}>
              <div>
                {findBirthSong.artist}
              </div>
              <div>
                {findBirthSong.title}
              </div>
            </div>
          </div>
          <IframeVideoPlayer youtubeVideoId={findBirthSong.youtube_video_id} />
        </div>
      )}
    </main>
  );
}

export default Home;
