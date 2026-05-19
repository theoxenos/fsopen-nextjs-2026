"use server"

import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {removeFromReadingList, toggleReadStatus} from "@/app/services/readingListService";
import {revalidatePath} from "next/cache";

export const toggleBlogReadStatus = async (formData: FormData) => {
    const session = await auth();
    if (!session) redirect('/login');

    const listId = Number(formData.get("id"));
    if (!listId) return;

    await toggleReadStatus(listId);

    revalidatePath("/me");
};

export const removeBlogFromReadingList = async (formData: FormData) => {
    const session = await auth();
    if (!session) redirect('/login');

    const listId = Number(formData.get("id"));
    if (!listId) return;

    await removeFromReadingList(listId);

    revalidatePath("/me");
};