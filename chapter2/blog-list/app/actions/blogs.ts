"use server";

import {redirect} from "next/navigation";
import {addBlog, updateBlogLikes} from "../services/blogService";
import {revalidatePath} from "next/cache";

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const author = formData.get("author") as string;

    //TODO: Remove hardcoded userId
    await addBlog({title, url, author, userId: 1});

    revalidatePath("/blogs");
    redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"));
    await updateBlogLikes(id);

    revalidatePath(`/blogs/${id}`);
    revalidatePath("/blogs");
};
