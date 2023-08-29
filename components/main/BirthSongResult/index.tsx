'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import useRenderToast from '../../../hooks/useRenderToast';
import { fetchMusicChartSong } from '../../../lib/apis/search';
import Button from '../../common/Button';
import IframeVideoPlayer from '../IframeVideoPlayer';

import styles from './index.module.scss';

type Props = {
  birthDate: string;
};

function BirthSongResult({ birthDate }: Props) {
  const renderToast = useRenderToast();

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

      renderToast({ description: 'URL을 복사했습니다.', type: 'success' });
    } catch (error) {
      renderToast({ description: 'URL 복사에 실패했습니다.', type: 'error' });
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
