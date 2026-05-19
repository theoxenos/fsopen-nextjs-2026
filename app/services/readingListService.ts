import {db} from "@/app/db";
import {readingList} from "@/app/db/schema";
import {eq, not} from "drizzle-orm";

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

export const removeFromReadingList = async (readingListId: number) => {
    return db.delete(readingList).where(eq(readingList.id, readingListId));
};

export const toggleReadStatus = async (readingListId: number) => {
    return db.update(readingList).set({read: not(readingList.read)}).where(eq(readingList.id, readingListId));
};