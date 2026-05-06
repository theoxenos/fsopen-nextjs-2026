"use server";

import { redirect } from "next/navigation";
import {addBlog, updateBlogLikes} from "../services/blogService";
import { revalidatePath } from "next/cache";

export const createBlog = async (formData: FormData) => {
  const id = crypto.randomUUID();
  const likes = 0;
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const author = formData.get("author") as string;
  
  addBlog({ id, title, url, author, likes });

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
  const id = formData.get("id") as string;
  updateBlogLikes(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
