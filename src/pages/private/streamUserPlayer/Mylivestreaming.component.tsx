import { useEffect, useState } from 'react';
import { ParticipantView, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import './stream.css';
import DescriptionStreamerComponent from './DescriptionStreamer';
import Swal from "sweetalert2";
import HeaderComponent from '../../../common/components/header/header.component';

export const MylivestreamUi = () => {
    const call = useCall();
    const { useIsCallLive, useLocalParticipant, useParticipantCount, useCallEgress } = useCallStateHooks();

    const [streamTime, setStreamTime] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [streamTitle, setStreamTitle] = useState('');
    const [streamTheme, setStreamTheme] = useState('');
    
    const isCallLive = useIsCallLive();
    const localParticipant = useLocalParticipant();
    const participantCount = useParticipantCount();
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
            setIsModalOpen(false); // Cierra el modal al iniciar el stream
        } catch (error) {
            console.error("Error starting livestream:", error);
        }
    };

    const handleStopLive = async () => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "Do you want to stop the livestream?",
            showCancelButton: true,
            confirmButtonText: 'Yes, stop it!',
            cancelButtonText: 'No, keep it going'
        });

        if (result.isConfirmed) {
            try {
                await call?.stopLive();
                console.log("Livestream stopped");
                Swal.fire('Stopped!', 'Your livestream has been stopped.', 'success');
            } catch (error) {
                console.error("Error stopping livestream:", error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const openModal = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    const handleStartStream = () => {
        if (streamTitle && streamTheme) {
            handleGoLive(); // Solo empieza el stream si hay título y temática
        } else {
            alert("Por favor completa el título y la temática del stream");
        }
    };

    return (
        <div className='header-stream'>
            <HeaderComponent />
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
                            <button className="start-button" onClick={openModal}>
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
                                {`Viewers: ${participantCount}`}
                            </div>
                        </div>
                    </div>

                    {/* Mostrar título y temática si el livestream está en vivo */}
                    {isCallLive && (
                        <div className="stream-info">
                            <p className='stream-title'> {streamTitle}</p>
                            <p className='stream-theme'>{streamTheme}</p>
                        </div>
                    )}
                </div>

                <div className='container-description'>
                    <DescriptionStreamerComponent />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Start Livestream</h2>
                        <label>
                            Stream Title:
                            <input
                                type="text"
                                value={streamTitle}
                                onChange={(e) => setStreamTitle(e.target.value)}
                                placeholder="Enter the stream title"
                            />
                        </label>
                        <label>
                            Stream Theme:
                            <select value={streamTheme} onChange={(e) => setStreamTheme(e.target.value)}>
                                <option value="">Select a theme</option>
                                <option value="Just Chatting">Just Chatting</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Music">Music</option>
                                <option value="Sports">Sports</option>
                                <option value="Talk Shows">Talk Shows</option>
                                <option value="Art">Art</option>
                            </select>
                        </label>
                        <div className="modal-actions">
                            <button onClick={handleStartStream}>Go Live</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
