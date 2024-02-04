const BASE_URL_SOCKET = import.meta.env.VITE_BASE_SOCKET


import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
//const URL = process.env.NODE_ENV === 'production' ? "" : `${BASE_URL_SOCKET}`;


export function createSocket () {
    return io(`${BASE_URL_SOCKET}`, {autoConnect: false})
}
