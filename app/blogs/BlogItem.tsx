import {IBlog} from "@/app/services/blogService";
import Link from "next/link";

const BlogItem = ({blog}: { blog: IBlog }) => (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 hover:underline">
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h3>
        <ul>
            <li className="text-gray-600">Author: {blog.author}</li>
            <li className="text-gray-600">Url:&nbsp;
                {blog.url && <a href={blog.url} target="_blank" rel="noopener noreferrer"
                                className="text-blue-500 underline">{blog.url}</a>}
            </li>
            <li className="text-gray-600">Likes: {blog.likes}</li>
        </ul>
    </div>
);

export default BlogItem;