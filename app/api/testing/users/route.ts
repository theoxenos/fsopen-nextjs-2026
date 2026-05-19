import {NextResponse} from "next/server";
import {createTestUser} from "@/app/services/testingService";

export const POST = async (req: Request) => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({error: "Method not allowed in production"}, {status: 403});
    }

    const {username, password, name} = await req.json();

    if (!(username && password && name)) {
        return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    try {
        await createTestUser(username, password, name);
        return NextResponse.json({message: "User created successfully"});
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({error: "Failed to create user"}, {status: 500});
    }
}