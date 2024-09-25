import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  User
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { MylivestreamUi } from './Mylivestreaming.component';

const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1ByZV9WaXpzbGEiLCJ1c2VyX2lkIjoiUHJlX1ZpenNsYSIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzI3MTE5NjY5LCJleHAiOjE3Mjc3MjQ0Njl9.0ZlLYppgU6bxP-al_dg5Dy_rDw81Uws--2v6tfyHeAQ";
const userId = "Pre_Vizsla";
const callId = "zsY9GwpDVG18";

const user: User = {
  id: userId,
  name: 'Streamer'
};

// Crear el cliente con el token de autenticación
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);  // Asegúrate de que todos los usuarios se unan al mismo callId

// Unirse a la llamada y crearla si no existe
call.join({ create: true });  

function StreamerUserPage() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MylivestreamUi />
      </StreamCall>
    </StreamVideo>
  );
}

export default StreamerUserPage;
