import { IBlog, getBlogs } from "@/app/services/blogService";
import Link from "next/link";

const Blogs = async ({searchParams} : {searchParams: Promise<{filter?: string}>}) => {
  const blogs: IBlog[] = await getBlogs();

  const filter = await searchParams;
  const filteredBlogs = blogs
      .filter((blog) => blog.title.toLowerCase().includes(filter.filter?.toLowerCase() || ""))
      .toSorted((a, b) => b.likes - a.likes);
  
  return (
    <div>
      <h2>Blogs</h2>
      <div style={{ marginBottom: "1.5rem" }}>
        <form method="get">
          <input type="text" name="filter" placeholder="Filter by title" defaultValue={filter.filter} />
          <button type="submit">Filter</button>
        </form>
      </div>
      <div>
        {filteredBlogs.map((blog: IBlog) => (
            <div key={blog.id} style={{ border: "1px solid black", marginBottom: "0.5rem", padding: "0.5rem" }}>
              <h3><Link href={`/blogs/${blog.id}`}>{blog.title}</Link></h3>
              <ul>
                <li>Author: {blog.author}</li>
                <li>Url: {blog.url}</li>
                <li>Likes: {blog.likes}</li>
              </ul>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
