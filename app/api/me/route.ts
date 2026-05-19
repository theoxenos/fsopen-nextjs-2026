import {NextResponse} from "next/server";
import {getUserByToken} from "@/app/services/userService";

export const GET = async (req: Request) => {
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
        return NextResponse.json({error: "Authorization header missing"}, {status: 401});
    }

    const token = authorizationHeader.split(" ")[1]?.trim();
    if (!token) {
        return NextResponse.json({error: "Token missing"}, {status: 401});
    }

    const user = await getUserByToken(token);

    if (!user) {
        return NextResponse.json({error: "User not found"}, {status: 404});
    }

    return NextResponse.json(user);
};