import createClient from '@ap/chat-client';
import io from 'socket.io-client';

const socket = io('http://localhost:3030');
const client = createClient(socket, window.localStorage);

export default client;
