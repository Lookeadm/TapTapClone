import { io } from "socket.io-client";

const { useEffect, useCallback } = require("react");
const { useState } = require("react");
const { useRef } = require("react");

export const useSocketIO = (url) => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    const [events, setEvents] = useState({});
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = io(url, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });
        // Lưu vào ref để các hàm khác có thể sử dụng
        socketRef.current = socket;

        // Sự kiện kết nối
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server with ID:', socket.id);
            setIsConnected(true);
        });

        // Sự kiện ngắt kết nối
        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
            setIsConnected(false);
        });

        // Dọn dẹp khi component unmount
        return () => {
            if (socket) {
                Object.keys(events).forEach((event) => {
                    socket.off(event);
                });
                socket.disconnect();
                socketRef.current = null;
            }
        };
    }, [url]);

    // Đăng ký lắng nghe sự kiện
  const on = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
      setEvents((prev) => ({ ...prev, [event]: callback }));
    }
  }, []);

  // Gửi sự kiện
  const emit = useCallback((event, data) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
      return true;
    }
    return false;
  }, [isConnected]);

  // Hủy đăng ký lắng nghe sự kiện
  const off = useCallback((event) => {
    if (socketRef.current) {
      socketRef.current.off(event);
      setEvents((prev) => {
        const newEvents = { ...prev };
        delete newEvents[event];
        return newEvents;
      });
    }
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    lastMessage,
    on,
    off,
    emit
  };

}