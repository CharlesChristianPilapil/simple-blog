import { createClient } from "@/utils/supabase/server";

export async function getBlog(id: string) {
    const supabase = await createClient();

    const { data: post, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (postError || !post) {
        console.error("Error fetching post:", postError);
        return null;
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", post.user_id)
        .single();

    if (profileError) {
        console.error("Error fetching profile:", profileError);
        return { ...post, profile: null };
    }

    return { ...post, profile };
}