// VideoPlayer.tsx
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  src: string;
  type: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, type }) => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Delay initialization to ensure the element is in the DOM
    const timer = setTimeout(() => {
      if (videoRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: 'auto',
          sources: [{ src, type }],
        });

        playerRef.current.on('error', (e: any) => {
          console.error('Video.js error:', e);
          setHasError(true);
        });
      }
    }, 100); // Ajusta el tiempo según sea necesario

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src, type]);

  return (
    <div data-vjs-player className="video-container">
      <video ref={videoRef} className="video-js" width={'1540'} height="775" />
      {hasError && (
        <div className="video-error-overlay">
          <p>No se pudo cargar el video. Por favor, intente más tarde.</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
