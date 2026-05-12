"use client"

import {registerUser} from "@/app/actions/register";
import {useActionState} from "react";

const RegistrationPage = () => {
    const [{errors}, formAction] = useActionState(registerUser, {errors: []})
    
    const divStyle = {marginBottom: "1.5rem"}
    return (
        <div>
            <h2>Registration Page</h2>
            {errors?.length > 0 && (
                <div style={{marginBottom: "1.5rem", padding: "0.5rem", border: "1px solid red"}}>
                    {errors.map((error, index) => (
                        <p key={index} style={{color: "red"}}>{error}</p>
                    ))}
                </div>
            )}
            <form action={formAction}>
                <div style={divStyle}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div style={divStyle}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div style={divStyle}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div style={divStyle}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
};

export default RegistrationPage;