import {getUserByUsername} from "@/app/services/userService";
import {notFound} from "next/navigation";
import Link from "next/link";

const UserPage = async ({params}: { params: Promise<{ username: string }> }) => {
    const {username} = await params;
    const user = await getUserByUsername(username);

    if (!user) {
        notFound();
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-gray-600">Username: {user.username}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Blogs:</h2>
                <ul className="space-y-2">
                    {user.blogs.map(blog =>
                        <li key={blog.id} className="border-b border-gray-200 pb-2 last:border-b-0">
                            <Link href={`/blogs/${blog.id}`}
                                  className="text-blue-500 hover:underline text-lg">{blog.title}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default UserPage;