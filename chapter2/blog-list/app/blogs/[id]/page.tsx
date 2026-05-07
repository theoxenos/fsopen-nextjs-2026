import {getBlogById} from "@/app/services/blogService";
import {notFound} from "next/navigation";
import {likeBlog} from "@/app/actions/blogs";

const BlogPage = async ({params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params;
    const blog = await getBlogById(Number(id));

    if (!blog) return (
        notFound()
    );

    return (
        <div>
            <h2>{blog.title}</h2>
            <form action={likeBlog}>
                <input type="hidden" name="id" value={id} />
                <ul>
                    <li>Author: {blog.author}</li>
                    <li>Url: {blog.url? <a href={blog.url}>{blog.url}</a> : null}</li>
                    <li>
                        Likes: {blog.likes}
                        <button type="submit">Like</button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default BlogPage;