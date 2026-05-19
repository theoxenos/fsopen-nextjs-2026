"use client"

import React, {createContext, useCallback, useContext, useState} from "react";

export const NotificationType = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning"
} as const;

type NotificationType = typeof NotificationType[keyof typeof NotificationType];

type NotificationContextType = {
    messages: string[],
    type: NotificationType,
    showNotification: (messages: string[] | string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType>({
    messages: [],
    type: NotificationType.SUCCESS,
    showNotification: () => {
    },
});

export const NotificationProvider = ({children}: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [type, setType] = useState<NotificationType>(NotificationType.SUCCESS);

    // AI suggestion to use useCallback to fix re-render bug
    const showNotification = useCallback((messages: string[] | string, type?: NotificationType) => {
        setMessages(typeof messages === "string" ? [messages] : messages);
        setType(type || NotificationType.SUCCESS);
        setTimeout(() => setMessages([]), 5000);
    }, []);

    return (
        <NotificationContext value={{messages, type, showNotification}}>
            {children}
        </NotificationContext>
    );
};

export const useNotification = () => useContext(NotificationContext);