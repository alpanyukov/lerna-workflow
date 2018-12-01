import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';

function createClient(socket, storage) {
  // Initialize our Feathers client application through Socket.io
  // with hooks and authentication.
  const client = feathers();

  client.configure(socketio(socket));
  client.configure(authentication({ storage }));

  return client;
}

export default createClient;
