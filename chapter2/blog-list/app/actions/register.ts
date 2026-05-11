"use server";

import {users} from "@/app/db/schema";
import bcrypt from "bcryptjs";
import {db} from "@/app/db";
import {redirect} from "next/navigation";

export const registerUser = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({name, username, passwordHash});

    redirect("/login");
}