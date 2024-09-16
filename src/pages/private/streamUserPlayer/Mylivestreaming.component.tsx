import { useEffect } from 'react';
import { ParticipantView, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

export const MylivestreamUi = () => {
    const call = useCall();
    const { useIsCallLive, useLocalParticipant, useParticipantCount, useCallEgress } = useCallStateHooks();

    const totalParticipants = useParticipantCount();
    const isCallLive = useIsCallLive();
    const localParticipant = useLocalParticipant();
    const egress = useCallEgress();

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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',      // Center horizontally
            justifyContent: 'center',  // Center vertically
            height: '100vh',           // Full viewport height
            gap: '20px',               // Larger gap for spacing
            backgroundColor: '#f0f4f8' // Light background color
        }}>
            <div style={{
                color: 'white',
                backgroundColor: 'cyan',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '18px'
            }}>
                {isCallLive ? `Live: ${totalParticipants}` : 'Call is not live'}
            </div>

            <div style={{ flex: 1, width: '100%', maxWidth: '600px' }}>
                {localParticipant && (
                    <ParticipantView participant={localParticipant} />
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                {isCallLive ? (
                    <button
                        onClick={handleStopLive}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ff4c4c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Stop Livestream
                    </button>
                ) : (
                    <button
                        onClick={handleGoLive}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Start Livestream
                    </button>
                )}
            </div>
        </div>
    );
};
