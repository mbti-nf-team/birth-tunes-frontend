'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { fetchMusicChartSong } from '../../../lib/apis/search';
import IframeVideoPlayer from '../IframeVideoPlayer';

import styles from './index.module.scss';

type Props = {
  birthDate: string;
};

function BirthSongResult({ birthDate }: Props) {
  const { data: findBirthSong, isSuccess } = useQuery(['musicChartSong', birthDate], () => fetchMusicChartSong({
    date: dayjs(birthDate).format('YYYY-MM-DD'),
    musicChartId: 1,
  }), {
    enabled: !!birthDate,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  if (!isSuccess) {
    return null;
  }

  return (
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
  );
}

export default BirthSongResult;
