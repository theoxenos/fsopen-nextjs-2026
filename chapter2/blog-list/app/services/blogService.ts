import {eq, ilike} from "drizzle-orm"
import {db} from "@/app/db"
import {blogs} from "@/app/db/schema";

export type IBlog = typeof blogs.$inferSelect;
export type IBlogRequest = Omit<IBlog, "id" | "likes">; // $inferInsert

export const getBlogs = async (filter?: string) => 
    db.query.blogs.findMany({
        where: ilike(blogs.title, `%${filter || ""}%`),
    });

export const getBlogById = async (id: number) =>
    db.query.blogs.findFirst({
        where: eq(blogs.id, id)
    });

export const addBlog = async (blog: IBlogRequest) => db.insert(blogs).values(blog);

export const updateBlogLikes = async (id: number) => {
    const blog = await getBlogById(id);
    if (blog) {
        await db.update(blogs).set({likes: ++blog.likes}).where(eq(blogs.id, id));
    }
};