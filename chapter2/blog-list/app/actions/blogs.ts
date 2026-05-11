"use server";

import {redirect} from "next/navigation";
import {addBlog, updateBlogLikes} from "../services/blogService";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";

export const createBlog = async (formData: FormData) => {
    const session = await auth();
    if(!session) {
        redirect("/login");
    }

    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const author = formData.get("author") as string;

    await addBlog({title, url, author});

    revalidatePath("/blogs");
    redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"));
    await updateBlogLikes(id);

    revalidatePath(`/blogs/${id}`);
    revalidatePath("/blogs");
};
