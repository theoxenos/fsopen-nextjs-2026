import {getUserByUsername} from "@/app/services/userService";
import {notFound} from "next/navigation";
import Link from "next/link";

const UserPage = async ({params}: {params: Promise<{username: string}>}) => {
    const {username} = await params;
    const user = await getUserByUsername(username);
    
    if (!user) {
        notFound();
    }
    
    return <div>
        <h1>{user.name}</h1>
        <p>Username: {user.username}</p>
        <h2>Blogs:</h2>
        <ul>
            {user.blogs.map(blog => 
                <li key={blog.id}>
                    <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
            )}
        </ul>
    </div>; 
}

export default UserPage;