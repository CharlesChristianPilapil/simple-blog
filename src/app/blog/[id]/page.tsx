import SideNav from "@/_components/Navbar/SideNav";
import { getBlog } from "@/utils/actions/blogs/get-blog";
import { capitalizeFirstLetter } from "@/utils/helpers/capitalize-first-letter";
import { formatDate } from "@/utils/helpers/date-format";
import Link from "next/link";

interface BlogPageProps {
    params: Promise<{
        id: string;
    }>
}

const BlogPage = async ({ params }: BlogPageProps) => {

    const { id } = await params;

    const blog = await getBlog(id);

    return (
        <main className="py-20 px-5">
            <div className="container mx-auto flex gap-10">
                <div className="flex-1 space-y-10">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-stone-800"> {capitalizeFirstLetter(blog.title)} </h1>
                        <p> by: <Link href={`/user/${blog.user_id}`} className="font-semibold text-stone-700"> {blog.profile.username} </Link> </p>
                        <p> {formatDate(blog.created_at)} </p>
                    </div>
                    <p className="whitespace-pre-wrap text-justify">{blog.content}</p>
                </div>
                <SideNav />
            </div>
        </main>
    );
};

export default BlogPage