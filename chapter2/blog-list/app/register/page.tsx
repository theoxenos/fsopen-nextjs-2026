"use client"

import {registerUser} from "@/app/actions/register";
import {useActionState, useEffect} from "react";
import {NotificationType, useNotification} from "@/app/components/NotificationContext";
import {useRouter} from "next/navigation";

const RegistrationPage = () => {
    const [state, formAction] = useActionState(registerUser, {errors: [], success: false})
    const {showNotification} = useNotification();
    const router = useRouter();

    const {errors, success} = state;

    useEffect(() => {
        if (!errors.length && !success) return;
        if (success) {
            const messages = ["Registration successful!"];
            showNotification(messages, NotificationType.SUCCESS);
            router.push("/login");

            return;
        }

        showNotification(errors, NotificationType.ERROR);
    }, [state, router, showNotification])


    return (
        <div>
            <h2>Registration Page</h2>
            <form action={formAction}>
                <div className="mb-6">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required/>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
};

export default RegistrationPage;