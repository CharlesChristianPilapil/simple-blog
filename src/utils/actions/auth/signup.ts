'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        username: formData.get('username') as string,
        password: formData.get('password') as string,
    }
    const { data: signupData, error } = await supabase.auth.signUp(({
        email: data.email,
        password: data.password,
    }));

    if (error) {
        redirect('/sign-up?message='+error.message);
    }

    console.log(signupData.user?.id, data.username);

    const { error: profileError } = await supabase.from("profiles").insert({
        id: signupData.user?.id,
        username: data.username,
    });

    if (profileError) {
        console.error(profileError);
        redirect('/sign-up?message='+profileError.message);
    }

    revalidatePath('/', 'layout')
    redirect('/')
}