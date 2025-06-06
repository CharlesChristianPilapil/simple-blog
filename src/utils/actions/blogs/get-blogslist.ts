"use server";

import { createClient } from "@/utils/supabase/server";

type GetBlogsParams = {
    page?: number;
    limit?: number;
};

export async function getBlogsList({ page = 1, limit = 10 }: GetBlogsParams) {
    const supabase = await createClient();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: blogs, error, count } = await supabase
        .from("posts")
        .select("*", { count: "exact" }) 
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("Error fetching blogs:", error);
        return { blogs: [], page, totalPages: 0 };
    }

    const totalPages = count ? Math.ceil(count / limit) : 0;

    return {
        blogs,
        page,
        totalPages,
    };
}