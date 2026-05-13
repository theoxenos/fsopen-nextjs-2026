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
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-6">Registration Page</h2>
            <form action={formAction} className="space-y-4">
                <div className="mb-6">
                    <label htmlFor="name" className="block font-medium mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="form-input w-full"
                        minLength={2}
                        maxLength={100}
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="username" className="block font-medium mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        className="form-input w-full"
                        minLength={4}
                        maxLength={50}
                        placeholder="Choose a username (min 4 characters)"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block font-medium mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="form-input w-full"
                        minLength={4}
                        placeholder="Min 4 characters"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        className="form-input w-full"
                        minLength={4}
                        placeholder="Re-enter your password"
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
};

export default RegistrationPage;