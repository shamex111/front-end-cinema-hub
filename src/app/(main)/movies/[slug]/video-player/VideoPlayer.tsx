import cn from 'clsx';
import { FC } from 'react';
import {
  MdFullscreen,
  MdHistory,
  MdPause,
  MdPlayArrow,
  MdUpdate
} from 'react-icons/md';

import Loader from '@/components/ui/Looader';

import { useProfile } from '@/hooks/useProfile';

import styles from './VideoPlayer.module.scss';
import PremiumPlaceholder from './premium-placeholder/PremiumPlaceholder';
import { useVideo } from './useVideo';
import { IVideoPlayer } from './video-interface';

const VideoPlayer: FC<IVideoPlayer> = ({ videoSource }) => {
  const { actions, video, videoRef } = useVideo();

  const { user, isLoading } = useProfile();

  return (
    <div
      className={cn(styles.wrapper, {
        'h-96': !user?.isHasPremium
      })}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : user?.isHasPremium ? (
        <>
          <video
            ref={videoRef}
            className={styles.video}
            src={`${videoSource}#t=1`}
            preload="metadata"
            onClick={actions.toggleVideo}
          />

          <div className={styles.progress_bar_container}>
            <div
              style={{ width: `${video.progress}%` }}
              className={styles.progress_bar}
            />
          </div>
          <div className={styles.controls}>
            <div>
              <button onClick={actions.revert}>
                <MdHistory />
              </button>

              <button
                onClick={actions.toggleVideo}
                className={styles.play_button}
              >
                {video.isPlaying ? <MdPause /> : <MdPlayArrow />}
              </button>

              <button onClick={actions.fastForward}>
                <MdUpdate />
              </button>

              <div className={styles.time_controls}>
                <p className={styles.controls_time}>
                  {Math.floor(video.currentTime / 60) +
                    ':' +
                    ('0' + Math.floor(video.currentTime % 60)).slice(-2)}
                </p>
                <p> / </p>
                <p className={styles.control_time}>
                  {Math.floor(video.videoTime / 60) +
                    ':' +
                    ('0' + Math.floor(video.videoTime % 60)).slice(-2)}
                </p>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={video.volume * 100}
                  onChange={e => actions.changeVolume(parseInt(e.target.value) / 100)}
                  className={styles.volumeRange}
                />
                <button onClick={actions.fullScreen}>
                  <MdFullscreen />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <PremiumPlaceholder />
      )}
    </div>
  );
};

export default VideoPlayer;
