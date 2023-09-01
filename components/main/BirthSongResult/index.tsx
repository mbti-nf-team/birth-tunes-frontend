'use client';

import { removeNullable } from '@nf-team/core';
import { DelayRenderComponent } from '@nf-team/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import useRenderToast from '../../../hooks/useRenderToast';
import { fetchMusicChartSong } from '../../../lib/apis/search';
import Button from '../../common/Button';
import FrameTitle from '../../common/FrameTitle';
import ProgressBar from '../../common/ProgressBar';
import IframeVideoPlayer from '../IframeVideoPlayer';

import styles from './index.module.scss';

type Props = {
  birthDate: string;
};

function BirthSongResult({ birthDate }: Props) {
  const renderToast = useRenderToast();

  const {
    data: findBirthSong, isSuccess, isError, isFetching,
  } = useQuery(['musicChartSong', birthDate], () => fetchMusicChartSong({
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

  if (isError) {
    return (
      <div className={styles.resultLayoutContainer}>
        <FrameTitle type="danger">
          결과 불러오기 실패
        </FrameTitle>
      </div>
    );
  }

  return (
    <>
      <DelayRenderComponent isVisible={isFetching}>
        <div className={styles.resultLayoutContainer}>
          <ProgressBar isAnimating={isFetching} />
        </div>
      </DelayRenderComponent>
      {isSuccess && (
        <div className={styles.resultLayoutContainer}>
          <div className={styles.resultWrapper}>
            <FrameTitle type="default">
              <div>
                {findBirthSong?.artist}
              </div>
              <div>
                {findBirthSong?.title}
              </div>
            </FrameTitle>
            <IframeVideoPlayer youtubeVideoId={removeNullable(findBirthSong?.youtube_video_id)} />
          </div>
          <Button buttonType="secondary" type="button" onClick={onClickShareLink}>결과 공유하기</Button>
        </div>
      )}
    </>
  );
}

export default BirthSongResult;
