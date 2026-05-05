"use server";

import { redirect } from "next/navigation";
import { addBlog } from "../services/blogService";
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
