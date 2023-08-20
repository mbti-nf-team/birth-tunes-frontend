import { api, paramsSerializer } from '..';

import { FindSongResponse } from './model';

// eslint-disable-next-line import/prefer-default-export
export const fetchMusicChartSong = async ({
  date, musicChartId,
}: { date: string; musicChartId: number; }) => {
  const response = await api<FindSongResponse>({
    method: 'GET',
    url: `/music-charts/${musicChartId}/song`,
    params: {
      date,
    },
    paramsSerializer,
  });

  return response;
};
