"use client"

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

const NavBar = () => {
    const {data: session} = useSession();

    return (
        <nav className="p-4 bg-gray-100 shadow-md flex flex-row justify-between">
            <div className="flex flex-row gap-4 align-bottom items-center">
                <Link href="/" className="font-bold text-xl me-6">Blog App</Link>
                <Link href="/users">Users</Link>
                <Link href="/blogs">Blogs</Link>
                {session && (
                    <Link href="/blogs/new" className="me-2">New Blog</Link>
                )}
            </div>
            <div>
                {session ? (
                    <div className="flex gap-2">
                        <Link href="/me" className="text-lg font-light hover:underline">{session.user?.name}</Link>
                        <button
                            className="cursor-pointer bg-red-500 hover:bg-red-700 text-white px-1 rounded"
                            onClick={() => signOut()}>Sign Out
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        {" | "}
                        <Link href="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;