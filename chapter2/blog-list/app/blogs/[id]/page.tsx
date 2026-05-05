import {getBlogById} from "@/app/services/blogService";
import {notFound} from "next/navigation";

const BlogPage = async ({params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params;
    const blog = getBlogById(id);

    if (!blog) return (
        notFound()
    );

    return (
        <div>
            <h2>{blog.title}</h2>
            <ul>
                <li>Author: {blog.author}</li>
                <li>Url: <a href={blog.url}>{blog.url}</a></li>
                <li>Likes: {blog.likes}</li>
            </ul>
        </div>
    );
};

export default BlogPage;