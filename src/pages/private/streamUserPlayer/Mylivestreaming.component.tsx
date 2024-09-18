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
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '10px',  // Aumenté el espacio entre los elementos
        }}>
            <div style={{
                color: 'white',
                backgroundColor: 'salmon',
                marginTop: '10px',
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

            <div style={{
                marginTop: isCallLive ? '40px' : '10px', // Ajuste del margen superior
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',  // Espacio entre los botones
            }}>
                {isCallLive ? (
                    <button
                        onClick={handleStopLive}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ffcccc', // Color más suave
                            color: '#333', // Texto más oscuro
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
                            backgroundColor: '#ccffcc', // Color verde más suave
                            color: '#333', // Texto más oscuro
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
