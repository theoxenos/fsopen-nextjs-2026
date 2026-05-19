import "./globals.css"
import AuthSessionProvider from "@/app/components/SessionProvider";
import NavBar from "@/app/components/NavBar";
import React from "react";
import {NotificationProvider} from "@/app/components/NotificationContext";
import Notification from "@/app/components/Notification";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-background text-foreground font-sans">
        <AuthSessionProvider>
            <NotificationProvider>
                <NavBar/>
                <Notification/>
                {children}
            </NotificationProvider>
        </AuthSessionProvider>
        </body>
        </html>
    );
}
