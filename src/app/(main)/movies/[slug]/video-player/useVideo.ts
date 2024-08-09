import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IVideoElement } from './video-interface';

export const useVideo = () => {
  const videoRef = useRef<IVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  useEffect(() => {
    if (videoRef.current?.duration) setVideoTime(videoRef.current.duration);
  }, [videoRef.current?.duration]);

  const changeVolumePlus = () => {
    if (videoRef.current) {
      const newVolume = videoRef.current.volume = Math.min(videoRef.current.volume + 0.05, 1);
      setVolume(newVolume)
    }
  };
  const changeVolumeMinus = () => {
    if (videoRef.current) {
      const newVolume = videoRef.current.volume = Math.max(videoRef.current.volume - 0.05, 0);
      setVolume(newVolume)
    }
  };

  const toggleVideo = useCallback(() => {
    if (!isPlaying) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);
  const fastForward = () => {
    if (videoRef.current) videoRef.current.currentTime += 5;
  };
  const revert = () => {
    if (videoRef.current) videoRef.current.currentTime -= 5;
  };
  const changeVolume = (volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      setVolume(volume)
    }
  };
  const fullScreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullscreen) {
      video.mozRequestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / videoTime) * 100);
    };

    video.addEventListener('timeupdate', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [videoTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight': {
          fastForward();
          break;
        }
        case 'ArrowLeft': {
          revert();
          break;
        }
        case 'p': {
          e.preventDefault();
          toggleVideo();
          break;
        }
        case 'f': {
          fullScreen();
          break;
        }
        case 'ArrowDown': {
          changeVolumeMinus();
          break;
        }
        case 'ArrowUp': {
          changeVolumePlus();
          break;
        }
        default: {
          return;
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleVideo]);
  const value = useMemo(
    () => ({
      videoRef,
      actions: {
        fullScreen,
        revert,
        fastForward,
        toggleVideo,
        changeVolume
      },
      video: {
        isPlaying,
        currentTime,
        progress,
        videoTime,
        volume
      }
    }),
    [currentTime, progress, isPlaying, videoTime, toggleVideo, volume]
  );
  return value;
};
