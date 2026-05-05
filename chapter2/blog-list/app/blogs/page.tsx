import { IBlog, getBlogs } from "@/app/services/blogService";

const Blogs = () => {
  const blogs: IBlog[] = getBlogs();

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog: IBlog) => (
          <li key={blog.id}>
            <a href={blog.url}>{blog.title}</a> by {blog.author}
            <br />
            {`Likes: ${blog.likes}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
