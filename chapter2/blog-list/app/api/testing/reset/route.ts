import {NextResponse} from "next/server";
import {deleteAllData} from "@/app/services/testingService";

export const DELETE = async () => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({error: "Method not allowed in production"}, {status: 403});
    }

    try {
        await deleteAllData();
        return NextResponse.json({message: "All data deleted successfully"});
    } catch (error) {
        console.error("Error deleting data:", error);
        return NextResponse.json({error: "Failed to delete data"}, {status: 500});
    }
}