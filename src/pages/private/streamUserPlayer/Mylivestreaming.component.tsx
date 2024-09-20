import { useEffect, useState } from 'react';
import { ParticipantView, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import HeaderComponent from '../../../common/components/header/header.component';
import './stream.css';
import DescriptionStreamerComponent from './DescriptionStreamer';

export const MylivestreamUi = () => {
    const call = useCall();
    const { useIsCallLive, useLocalParticipant, useParticipantCount, useCallEgress } = useCallStateHooks();

    const [streamTime, setStreamTime] = useState(0);
    const isCallLive = useIsCallLive();
    const localParticipant = useLocalParticipant();
    const participantCount = useParticipantCount(); // Contador de participantes
    const egress = useCallEgress();

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isCallLive) {
            timer = setInterval(() => {
                setStreamTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            setStreamTime(0);
        }

        // Limpia el intervalo cuando se detiene el livestream
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isCallLive]);

    useEffect(() => {
        if (egress?.hls?.playlist_url) {
            console.log('HLS playlist URL:', egress.hls.playlist_url);
        }
    }, [egress?.hls?.playlist_url]);

    const handleGoLive = async () => {
        try {
            await call?.goLive({ start_hls: true });
            console.log("Livestream started with HLS");
        } catch (error) {
            console.error("Error starting livestream:", error);
        }
    };

    const handleStopLive = async () => {
        try {
            await call?.stopLive();
            console.log("Livestream stopped");
        } catch (error) {
            console.error("Error stopping livestream:", error);
        }
    };

    // Formateo del tiempo para mostrar horas, minutos y segundos
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className='header-stream'>
             {/* <HeaderComponent /> */}
            <div className="container-stream">
                <div className='container-camera'>
                    <div className="participant-view">
                        {localParticipant && (
                            <ParticipantView participant={localParticipant} />
                        )}
                    </div>

                    <div className={`button-group ${isCallLive ? 'live' : ''}`}>
                        {isCallLive ? (
                            <button className="stop-button" onClick={handleStopLive}>
                                Stop Livestream
                            </button>
                        ) : (
                            <button className="start-button" onClick={handleGoLive}>
                                Start Livestream
                            </button>
                        )}
                         <div className='container-controls'>
                        <div className="status-bar">
                            {isCallLive 
                                ? `Live: ${formatTime(streamTime)}`
                                : 'Call is not live'}
                        </div>

                        <div className="viewers-count">
                            {`Viewers: ${participantCount}`} {/* Mostrando el número total de participantes */}
                        </div>
                    </div>
                </div>
                    </div>

                   

                <div className='container-description'>
                    <DescriptionStreamerComponent />
                </div>
            </div>
        </div>
    );
};
