"use server";

import {redirect} from "next/navigation";
import {addBlog, updateBlogLikes} from "../services/blogService";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";

interface ICreateBlogState {
    errors: string[];
    values: { title?: string; url?: string; author?: string };
    success?: boolean;
}

export const createBlog = async (
    prevState: ICreateBlogState, formData: FormData) => {

    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const author = formData.get("author") as string;

    const errors: string[] = [];

    if (!title || title.length < 5) {
        errors.push("Title must be at least 5 characters long");
    }
    if (!url || url.length < 5) {
        errors.push("Url must be at least 5 characters long");
    }
    if (!author || author.length < 5) {
        errors.push("Author must be at least 5 characters long");
    }

    if (errors.length > 0) {
        return {errors, values: {title, url, author}, success: false};
    }

    await addBlog({title, url, author});

    revalidatePath("/blogs");
    return {errors: [], values: {title, url, author}, success: true};
};

export const likeBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"));
    await updateBlogLikes(id);

    revalidatePath(`/blogs/${id}`);
    revalidatePath("/blogs");
};
