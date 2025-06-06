"use server";

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

export async function addPost(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string
    const content = formData.get("content") as string

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
        redirect("/login")
    }

    const { error } = await supabase.from("posts").insert({
        title,
        content,
        user_id: user.id,
    });

    if (error) {
        redirect("/?message="+encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout');
    revalidatePath(`/profile/${user.id}`);
}