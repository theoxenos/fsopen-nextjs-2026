"use server";

import {users} from "@/app/db/schema";
import bcrypt from "bcryptjs";
import {db} from "@/app/db";
import {redirect} from "next/navigation";
import {getUserByUsername} from "@/app/services/userService";

export const registerUser = async (prevState: {errors: string[]}, formData: FormData) => {
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const errors = []
    
    if(username.length < 4) {
        errors.push("Username must be at least 4 characters");
    }
    
    if(password.length < 4) {
        errors.push("Password must be at least 4 characters");
    }

    if(await getUserByUsername(username)) {
        errors.push("Username already exists");
    }
    
    if(errors.length > 0) {
        return {errors};
    }
    
    if(password !== confirmPassword) {
        return {errors: ["Passwords do not match"]};
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({name, username, passwordHash});

    redirect("/login");
}