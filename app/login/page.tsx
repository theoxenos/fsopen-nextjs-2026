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
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium">Username:</label>
                    <input type="text" id="username" name="username" className="form-input" required/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium">Password:</label>
                    <input type="password" id="password" name="password" className="form-input" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;