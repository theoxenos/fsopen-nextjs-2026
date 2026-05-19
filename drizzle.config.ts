import {defineConfig} from "drizzle-kit"

import * as dotenv from "dotenv"

dotenv.config({path: ".env.local"})

export default defineConfig({
    schema: "./app/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: process.env.NODE_ENV !== "production",
    // log: {
    //     level: process.env.NODE_ENV !== "production" ? "debug" : "error",
    //     pretty: process.env.NODE_ENV !== "production",
    //     timestamp: process.env.NODE_ENV !== "production",
    //     colors: process.env.NODE_ENV !== "production",
    //     prefix: process.env.NODE_ENV !== "production" ? "[Drizzle]" : "",
    // },
})