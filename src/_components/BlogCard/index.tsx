import { capitalizeFirstLetter } from "@/utils/helpers/capitalize-first-letter"
import { formatDate } from "@/utils/helpers/date-format"
import { truncateText } from "@/utils/helpers/truncate-text"
import { createClient } from "@/utils/supabase/server";
import Link from "next/link"

interface BlogCardProps {
    id: string;
    title: string;
    created_at: string;
    content: string;
    user_id: string;
}

const BlogCard = async ({ id, title, created_at, content, user_id }: BlogCardProps) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isPostOfCurrentUser =  user?.id === user_id;

    return (
        <div className="space-y-5 border border-stone-200 rounded-md px-5 pt-5 pb-2.5 md:pb-5 md:px-10 md:pt-10 shadow-lg relative">
            <div>
                <h3 className="font-semibold text-2xl"> {capitalizeFirstLetter(title)} </h3>
                <p>   
                    {formatDate(created_at)}
                </p>
            </div>
            <p className="whitespace-pre-wrap">
                {truncateText(content)}
            </p>
            <div className="w-full flex justify-between">
                <p className="text-stone-400 font-semibold"> Upvotes </p> 
                <Link href={`/blog/${id}`} className="text-blue-400 underline">
                    Read More
                </Link>
            </div>
            {isPostOfCurrentUser && (
                <div className="absolute right-5 md:right-10 top-5 md:top-10 w-fit flex items-center gap-5">
                    <Link 
                        href={`/blog/manage/${id}`} 
                        className="font-semibold text-stone-500 border border-stone-300 rounded-sm px-2 py-1"
                    > 
                        Manage 
                    </Link>
                </div>
            )}
        </div>
    )
}
export default BlogCard