"use client"

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {signIn} from "next-auth/react";

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        
        const response = await signIn("credentials", {username, password, redirect: false});
        
        if (response?.error) {
            setError("Invalid username or password.");
        } else {
            router.push("/");
            router.refresh();
        }
    }
    
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div style={{marginBottom: "1.5rem"}}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;