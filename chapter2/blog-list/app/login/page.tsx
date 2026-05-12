"use client"

import {useRouter} from "next/navigation";
import {SubmitEvent} from "react";
import {signIn} from "next-auth/react";
import {NotificationType, useNotification} from "@/app/components/NotificationContext";

const LoginPage = () => {
    const router = useRouter();
    const {showNotification} = useNotification();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const response = await signIn("credentials", {username, password, redirect: false});

        if (response?.error) {
            const errors = ["Invalid username or password."];
            showNotification(errors, NotificationType.ERROR);
        } else {
            const messages = ["Login successful!"];
            showNotification(messages, NotificationType.SUCCESS);
            router.push("/");
            router.refresh();
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;