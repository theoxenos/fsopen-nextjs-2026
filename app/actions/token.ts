"use server"

import {getCurrentUser} from "@/app/services/sessionService";
import {redirect} from "next/navigation";
import {setTokenForUser} from "@/app/services/userService";
import {revalidatePath} from "next/cache";

export const generateToken = async () => {
    const token = crypto.randomUUID();
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    await setTokenForUser(user.id, token);
    revalidatePath("/me");
};