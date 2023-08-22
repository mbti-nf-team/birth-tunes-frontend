import styles from './index.module.scss';

type Props = {
  youtubeVideoId: string;
};

function IframeVideoPlayer({ youtubeVideoId }: Props) {
  return (
    <div className={styles.iframeVideoPlayerWrapper}>
      <iframe
        id="ytplayer"
        className={styles.videoPlayer}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
      />
    </div>
  );
}

export default IframeVideoPlayer;
