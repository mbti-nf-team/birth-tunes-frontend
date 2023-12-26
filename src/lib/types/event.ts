export type EventName =
  | 'share_link_success_clicked'
  | 'share_link_failed_clicked'
  | 'result_song_load_failed'
  | 'view_result_song_clicked';

export type EventAction = 'click' | 'fail';

export type EventType = 'success' | 'error';

export type SendEvent = {
  name: EventName;
  action: EventAction;
  type?: EventType;
  value?: Record<string, any>;
};
