'use client';

import { useCallback, useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';

import { removeNullable } from '@nf-team/core';
import { DelayRenderComponent } from '@nf-team/react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import dayjs from 'dayjs';

import Button from '@/components/common/Button';
import FrameTitle from '@/components/common/FrameTitle';
import ProgressBar from '@/components/common/ProgressBar';
import { fetchSongResult } from '@/lib/apis/search';
import { GA4_EVENT_ACTION, GA4_EVENT_NAME, GA4_EVENT_TYPE } from '@/lib/constants/ga4';
import { FindSong } from '@/lib/types/song';
import useToastStore from '@/stores/toast';

import IframeVideoPlayer from '../IframeVideoPlayer';

import styles from './index.module.scss';

type Props = {
  birthDate: string;
};

function BirthSongResult({ birthDate }: Props) {
  const { renderToast } = useToastStore(['renderToast']);
  const resultContainerRef = useRef<HTMLDivElement>(null);

  const date = dayjs(birthDate);

  const {
    data: findBirthSong, isSuccess, isError, isFetching, error: errorFindBirthSong,
  } = useQuery<FindSong, any>({
    queryKey: ['birthSong', birthDate],
    queryFn: () => fetchSongResult({
      year: date.year() + 1,
      month: date.month() + 1,
      day: date.date(),
    }),
    enabled: !!date && date.isValid(),
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const isEmptyResult = !isFetching && !isSuccess && !isError;

  const onClickShareLink = useCallback(async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_ORIGIN}?date=${birthDate}`;

      await navigator.clipboard.writeText(shareUrl);

      renderToast({ description: 'URL을 복사했습니다.', type: 'success' });

      ReactGA.event(GA4_EVENT_NAME.share_link_success_clicked, {
        action: GA4_EVENT_ACTION.click,
        type: GA4_EVENT_TYPE.success,
        url: shareUrl,
        date: birthDate,
      });
    } catch (error) {
      renderToast({ description: 'URL 복사에 실패했습니다.', type: 'error' });

      ReactGA.event(GA4_EVENT_NAME.share_link_failed_clicked, {
        action: GA4_EVENT_ACTION.click,
        type: GA4_EVENT_TYPE.error,
        error,
        date: birthDate,
      });
    }
  }, [birthDate]);

  useEffect(() => {
    if (!isEmptyResult && resultContainerRef?.current) {
      resultContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isEmptyResult, birthDate]);

  useEffect(() => {
    if (isError) {
      ReactGA.event(GA4_EVENT_NAME.result_song_load_failed, {
        action: GA4_EVENT_ACTION.fail,
        type: GA4_EVENT_TYPE.error,
        errorCode: errorFindBirthSong?.code,
        errorMessage: errorFindBirthSong?.message,
      });
    }
  }, [isError, errorFindBirthSong]);

  return (
    <div
      className={clsx(
        styles.resultLayoutContainer,
        isEmptyResult && styles.hidden,
      )}
      ref={resultContainerRef}
    >
      <ProgressBar isAnimating={isFetching} />
      <DelayRenderComponent isVisible={isError} renderDelay={400} unRenderDelay={0}>
        <FrameTitle type="danger">
          결과 불러오기 실패
        </FrameTitle>
      </DelayRenderComponent>
      <DelayRenderComponent isVisible={isSuccess} renderDelay={400} unRenderDelay={0}>
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
      </DelayRenderComponent>
    </div>
  );
}

export default BirthSongResult;
