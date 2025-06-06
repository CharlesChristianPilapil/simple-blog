import { getBlogsList } from "@/utils/actions/blogs/get-blogslist";
import BlogCard from "../BlogCard";

interface Props {
    searchParams?: Promise<{
        page?: string;
    }>;
}

const BlogFeeds = async ({ searchParams }: Props) => {
    const currentPage = await searchParams;
    const limit = 10;

    const { blogs } = await getBlogsList({ page: Number(currentPage) || 1, limit });

    return (
        <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-stone-600"> Blogs </h2>
            <div className="flex flex-col gap-10">
                {blogs.map((blog) => {
                    return (
                        <BlogCard 
                            key={blog.id}
                            {...blog}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default BlogFeeds;