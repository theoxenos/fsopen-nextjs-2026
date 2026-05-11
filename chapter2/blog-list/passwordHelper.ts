import bcrypt from 'bcryptjs';
import {db} from "@/app/db";
import {users} from "@/app/db/schema";
import {eq} from "drizzle-orm";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const setPassword = async (username: string, password: string) => {
    const user = await db.select().from(users).where(eq(users.username, username)).execute();
    if (user.length === 0) {
        throw new Error('User not found');
    }
    
    const hashedPassword = await hashPassword(password);
    await db.update(users).set({ passwordHash: hashedPassword }).where(eq(users.username, username)).execute();
}

const username = process.argv[2];
const password = process.argv[3];

await setPassword(username, password);