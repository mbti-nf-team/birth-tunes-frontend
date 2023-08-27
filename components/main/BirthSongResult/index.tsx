'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { fetchMusicChartSong } from '../../../lib/apis/search';
import Button from '../../common/Button';
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

  const onClickShareLink = async () => {
    try {
      await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_ORIGIN}?date=${birthDate}`);
    } catch (error) {
      // TODO - 실패 케이스 정의 후 변경
      console.error(error);
    }
  };

  if (!isSuccess) {
    return null;
  }

  return (
    <>
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
      <Button buttonType="secondary" type="button" onClick={onClickShareLink}>결과 공유하기</Button>
    </>
  );
}

export default BirthSongResult;
