import { useEffect, useRef, useState } from 'react';

export interface UseWebSocketOptions<T> {
    transform?: (event: MessageEvent) => T;
}

export function useWebSocket<T = any>(url?: string | URL, options: UseWebSocketOptions<T> = {}) {
    const {
        transform = (event: MessageEvent) => JSON.parse(event.data),
    } = options;
    const [target, setTarget] = useState(url);
    const [message, setMessage] = useState<T>();
    const socket = useRef<WebSocket>();

    const connect = () => {
        if (target) {
            const instance = new WebSocket(target);
            socket.current = instance;
            instance.onmessage = (event) => {
                setMessage(transform(event));
            };
        }
    };
    const disconnect = () => {
        socket.current?.close();
    }

    useEffect(() => {
        socket.current?.close?.();
        connect();
        return () => socket.current?.close?.();
    }, [target]);

    useEffect(() => {
        setTarget(url);
    }, [url]);
    return { message, connect, disconnect, instance: socket.current };
}