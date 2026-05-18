import {db} from "@/app/db";
import {users} from "@/app/db/schema";
import {eq} from "drizzle-orm";

export const getUsers = async () => db.select().from(users);

export const getUserByUsername = async (username: string) =>
    db.query.users.findFirst({
        where: eq(users.username, username),
        with: {blogs: true}
    });

export const getUserByToken = async (token: string) =>
    db.query.users.findFirst({
        where: eq(users.token, token),
        with: {
            blogs: {
                columns: {
                    title: true,
                    author: true,
                    url: true
                }
            }
        }
    });

export const setTokenForUser = async (id: number, token: string) => (
    db.update(users).set({token}).where(eq(users.id, id))
);