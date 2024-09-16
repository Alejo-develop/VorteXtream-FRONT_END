// src/components/ViewerUI.tsx
import React, { useEffect, useRef } from 'react';
import { ParticipantView, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import Hls from 'hls.js';

const ViewerUI: React.FC = () => {
  const call = useCall();
  const { useIsCallLive, useParticipants, useCallEgress } = useCallStateHooks();

  const isCallLive = useIsCallLive();
  const participants = useParticipants();
  const egress = useCallEgress();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isCallLive && egress?.hls?.playlist_url && videoRef.current) {
      const hls = new Hls();

      if (Hls.isSupported()) {
        hls.loadSource(egress.hls.playlist_url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = egress.hls.playlist_url;
        videoRef.current.addEventListener('canplay', () => {
          videoRef.current?.play();
        });
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [isCallLive, egress?.hls?.playlist_url]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '20px',
      backgroundColor: '#f0f4f8'
    }}>
      <div style={{
        color: 'white',
        backgroundColor: 'cyan',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '18px'
      }}>
        {isCallLive ? 'La transmisión está en vivo' : 'La transmisión no está en vivo'}
      </div>

      <div style={{ flex: 1, width: '100%', maxWidth: '800px' }}>
        {isCallLive && (
          <video
            ref={videoRef}
            controls
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        {!isCallLive && (
          participants.map(participant => (
            <ParticipantView  participant={participant} />
          ))
        )}
      </div>
    </div>
  );
};

export { ViewerUI };
