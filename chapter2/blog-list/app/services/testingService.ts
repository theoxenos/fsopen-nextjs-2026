import {db} from "@/app/db"
import {blogs, readingList, users} from "@/app/db/schema";
import bcrypt from "bcryptjs";

export const deleteAllData = async () => {
    await db.delete(blogs);
    await db.delete(users);
    await db.delete(readingList);
};

export const createTestUser = async (username: string, password: string, name: string) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return db.insert(users).values({name, username, passwordHash});
};