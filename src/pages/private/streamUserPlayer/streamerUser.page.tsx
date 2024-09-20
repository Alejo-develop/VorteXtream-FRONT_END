import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  User
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { MylivestreamUi } from './Mylivestreaming.component';

const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NhdmFnZV9PcHJlc3MiLCJ1c2VyX2lkIjoiU2F2YWdlX09wcmVzcyIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzI2NDg3NzY3LCJleHAiOjE3MjcwOTI1Njd9.R9P-6h2n2Mxjq4DTsraWzj4r3Z8tQMBq9BUuwxECv7I";
const userId = "Savage_Opress";
const callId = "4UQsholJCIMK";

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
