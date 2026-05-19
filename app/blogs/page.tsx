import {getBlogs, IBlog} from "@/app/services/blogService";
import BlogItem from "@/app/blogs/BlogItem";

const Blogs = async ({searchParams}: { searchParams: Promise<{ filter?: string }> }) => {
    const blogs: IBlog[] = await getBlogs();

    const filter = await searchParams;
    const filteredBlogs = blogs
        .filter((blog) => blog.title.toLowerCase().includes(filter.filter?.toLowerCase() || ""))
        .toSorted((a, b) => b.likes - a.likes);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            <div className="mb-4">
                <form method="get" className="flex">
                    <input type="text" name="filter" placeholder="Filter by title" defaultValue={filter.filter}
                           className="form-input border-e-0 rounded-e-none"/>
                    <button type="submit" className="btn btn-primary rounded-s-none">Filter</button>
                </form>
            </div>
            <div>
                {filteredBlogs.map((blog: IBlog) => (
                    <BlogItem key={blog.id} blog={blog}/>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
