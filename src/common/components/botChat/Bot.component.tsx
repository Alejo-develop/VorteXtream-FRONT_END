import React, { useEffect, useState } from 'react';
import './styles/botstyless.css';

const BotpressChat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const initializeChat = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          botId: import.meta.env.VITE_BOT_ID,
          hostUrl: 'https://cdn.botpress.cloud/webchat/v2',
        });
      } else {
        console.error('botpressWebChat is not defined');
      }
    };

    const destroyChat = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.close(); // Cierra el chat
        window.botpressWebChat.destroy(); // Destruye la instancia del chat
      }
    };

    const checkScriptsLoaded = () => {
      if (window.botpressWebChat) {
        initializeChat();
      } else {
        setTimeout(checkScriptsLoaded, 100);
      }
    };

    if (isVisible) {
      checkScriptsLoaded();
    } else {
      destroyChat();
    }

    return () => {
      destroyChat(); // Destruye el chat cuando el componente se desmonta o se cierra
    };
  }, [isVisible]); // El efecto se ejecuta cada vez que cambia 'isVisible'

  const handleClose = () => {
    setIsVisible(false); // Oculta el chat
  };

  return isVisible ? (
    <div id="botpress-webchat">
      <button className="custom-close-button" onClick={handleClose}>X</button>
    </div>
  ) : (
    <button onClick={() => setIsVisible(true)}>Abrir chat</button> // Botón para volver a abrir el chat
  );
};

export default BotpressChat;
