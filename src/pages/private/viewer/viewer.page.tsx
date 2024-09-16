import {
    StreamVideoClient,
    StreamVideo,
    StreamCall,
    User
  } from '@stream-io/video-react-sdk';
  import '@stream-io/video-react-sdk/dist/css/styles.css';
  import { ViewerUI } from './Viewer.ui';
  
  const apiKey = "mmhfdzb5evj2";  // API Key de tu aplicación Stream
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1pheW5lX0NhcnJpY2siLCJ1c2VyX2lkIjoiWmF5bmVfQ2FycmljayIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzI2NDMxOTUzLCJleHAiOjE3MjcwMzY3NTN9.zEC8gcldzR1BM0dcGs0iVLVFi8z7lI6y7K5s6QsrKA0";  // Token de usuario válido
  const userId = "Viewer_User";  // ID del usuario que está viendo la transmisión
  const callId = "4UQsholJCIMK";  // El mismo callId que usas para transmitir
  
  const user: User = {
    id: userId,
    name: 'Viewer User'
  };
  
  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call('livestream', callId);
  
  call.join();  // El viewer se une a la llamada existente
  
  function ViewerPage() {
    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <ViewerUI />
        </StreamCall>
      </StreamVideo>
    );
  }
  
  export default ViewerPage;
  