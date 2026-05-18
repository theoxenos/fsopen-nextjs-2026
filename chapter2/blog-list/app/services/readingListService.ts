import {db} from "@/app/db";
import {readingList} from "@/app/db/schema";
import {and, eq, not} from "drizzle-orm";

export const getReadingListForUserId = async (userId: number) => {
    return db.query.readingList.findMany({
        where: eq(readingList.userId, userId),
        with: {
            blog: true
        }
    });
};

export const addToReadingList = async (userId: number, blogId: number) => {
    return db.insert(readingList).values({userId, blogId});
};

export const removeFromReadingList = async (userId: number, blogId: number) => {
    return db.delete(readingList).where(
        and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)));
};

export const toggleReadStatus = async (userId: number, blogId: number) => {
    return db.update(readingList).set({read: not(readingList.read)}).where(
        and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)));
};