import {auth} from "@/auth";
import {db} from "@/app/db";
import {eq} from "drizzle-orm";
import {users} from "@/app/db/schema";

export const getCurrentUser = async () => {
    const session = await auth();
    if(!session?.user) {
        return null;
    }

    return db.query.users.findFirst({
        where: eq(users.username, session.user.email as string)
    });
    
};
