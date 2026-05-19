import {getBlogById} from "@/app/services/blogService";
import {notFound} from "next/navigation";
import {bookmarkBlog, likeBlog} from "@/app/actions/blogs";
import {getCurrentUser} from "@/app/services/sessionService";

const BlogPage = async ({params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params;
    const blog = await getBlogById(Number(id));

    if (!blog) return notFound();

    const currentUser = await getCurrentUser();

    const isBlogByCurrentUser = blog.userId === Number(currentUser?.id);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <ul className="list-disc pl-4">
                <li>Author: {blog.author}</li>
                <li>Url: {blog.url ?
                    <a className="text-blue-500 hover:underline" href={blog.url}>{blog.url}</a> : null}</li>
                <li>
                    <span className="mr-2">Likes: {blog.likes}</span>
                    <form action={likeBlog} className="inline">
                        <input type="hidden" name="id" value={id}/>
                        <button type="submit"
                                className="rounded text-sm text-neutral-200 bg-green-600 hover:bg-green-700 px-2 cursor-pointer me-2"
                        >
                            Like
                        </button>
                    </form>
                    {!isBlogByCurrentUser && (
                        <form action={bookmarkBlog} className="inline">
                            <input type="hidden" name="id" value={id}/>
                            <button type="submit"
                                    className="rounded text-sm text-neutral-200 bg-blue-600 hover:bg-blue-700 px-2 cursor-pointer"
                            >
                                Bookmark
                            </button>
                        </form>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default BlogPage;