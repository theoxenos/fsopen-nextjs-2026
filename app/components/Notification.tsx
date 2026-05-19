"use client"

import {NotificationType, useNotification} from "@/app/components/NotificationContext";

const Notification = () => {
    const {messages, type} = useNotification();

    if (!messages?.length) return null;

    const colorClasses = () => {
        switch (type) {
            case NotificationType.SUCCESS:
                return "bg-green-100 border-green-400 text-green-700";
            case NotificationType.ERROR:
                return "bg-red-100 border-red-400 text-red-700";
            case NotificationType.INFO:
                return "bg-blue-100 border-blue-400 text-blue-700";
            case NotificationType.WARNING:
                return "bg-yellow-100 border-yellow-400 text-yellow-700";
            default:
                return "bg-gray-100 border-gray-400 text-gray-700";
        }
    }

    return (
        <div className={`my-6 mx-4 p-2 border rounded ${colorClasses()}`}>
            {messages.map((message, index) => <p key={index}>{message}</p>)}
        </div>
    );
}

export default Notification;