import { IBlog, getBlogs } from "@/app/services/blogService";
import Link from "next/link";

const Blogs = () => {
  const blogs: IBlog[] = getBlogs().toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
        {blogs.map((blog: IBlog) => (
            <div key={blog.id} style={{ border: "1px solid black", marginBottom: "0.5rem", padding: "0.5rem" }}>
                <h2><Link href={`blogs/${blog.id}`}>{blog.title}</Link></h2>
                <ul>
                    <li>Author: {blog.author}</li>
                    <li>Url: {blog.url}</li>
                    <li>Likes: {blog.likes}</li>
                </ul>
            </div>
        ))}
    </div>
  );
};

export default Blogs;
