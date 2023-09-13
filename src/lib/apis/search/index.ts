import { api, paramsSerializer } from '..';

import { FindSongResponse } from './model';

// eslint-disable-next-line import/prefer-default-export
export const fetchSongResult = async (params: {
  year: number; month: number; day: number;
}) => {
  const response = await api<FindSongResponse>({
    method: 'GET',
    url: '/song',
    paramsSerializer,
    params,
    isBFF: true,
  });

  return response;
};
