import { useEffect } from 'react';
import VideoPlayer from '../../../common/components/player/player.component';
import './style.css'

export default function StreamPage() {
    useEffect(() => {
        // Desplazar automáticamente al inicio de la vista
        window.scrollTo(0, 0);
      }, []);
  
    return (
    <div className='container-watchMovie-anime'>
      <div className='container-movie'>
      <VideoPlayer
        src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        type="video/mp4"
      />
      </div>

      <div className='info-movieAnime-container'>
        <div className='container-infoDataMovie-sinopsis'>
            <div className='dataMovie-or-anime'>
                <h1>Info movie</h1>
            </div>
            <div className='sinopsis-movie-or-anime'>
            <h1>sinopsis</h1>
            </div>
        </div>

        <div className='container-matchContent'>
        <h1>contenido relacionado</h1>
        </div>
      </div>
    </div>
  );
}