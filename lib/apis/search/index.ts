import { api, paramsSerializer } from '..';

import { FindSongResponse } from './model';

// eslint-disable-next-line import/prefer-default-export
export const fetchMusicChartSong = async ({
  year, month, day,
}: { year: number; month: number; day: number; }) => {
  const response = await api<FindSongResponse>({
    method: 'GET',
    url: `/songs/${year}/${month}/${day}`,
    paramsSerializer,
  });

  return response;
};
