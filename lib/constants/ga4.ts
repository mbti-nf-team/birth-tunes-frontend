export const GA4_EVENT_ACTION = {
  click: 'click',
  fail: 'fail',
} as const;

export const GA4_EVENT_NAME = {
  share_link_success_clicked: 'share_link_success_clicked',
  share_link_failed_clicked: 'share_link_failed_clicked',
  result_song_load_failed: 'result_song_load_failed',
  view_result_song_clicked: 'view_result_song_clicked',
} as const;

export const GA4_EVENT_TYPE = {
  success: 'success',
  error: 'error',
} as const;
