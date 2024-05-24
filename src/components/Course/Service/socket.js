import io from "socket.io-client";
// import { SOCKET_URL } from "config";

// const socket = io.connect(process.env.REACT_APP_SERVER)
// const socket = io.connect(process.env.REACT_APP_SERVER)

export const getSocket = () => {
  return io.connect(process.env.REACT_APP_SERVER, {
    // reconnectionDelayMax: 10000,
    'reconnection': true,
  'reconnectionDelay': 500,
  'reconnectionAttempts': 10,
    auth: {
      token: "123"
    },
    query: {
      "my-key": "my-value"
    }
  });
};