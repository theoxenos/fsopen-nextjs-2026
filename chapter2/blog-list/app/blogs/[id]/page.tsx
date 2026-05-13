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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <form action={likeBlog}>
                <input type="hidden" name="id" value={id}/>
                <ul className="list-disc pl-4">
                    <li>Author: {blog.author}</li>
                    <li>Url: {blog.url ?
                        <a className="text-blue-500 hover:underline" href={blog.url}>{blog.url}</a> : null}</li>
                    <li>
                        <span className="mr-2">Likes: {blog.likes}</span>
                        <button type="submit"
                                className="rounded text-sm text-neutral-200 bg-green-600 hover:bg-green-700 px-2 cursor-pointer">Like
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default BlogPage;