import { logout } from "@/utils/actions/auth/logout";
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

const Navbar = async () => {

    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    let username = '';

    if (user) {
        const { data: profileData, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
        } else {
            username = profileData?.username || '';
        }
    }

    return (
        <nav className="px-4 h-[80px]">
            <div className="container mx-auto flex items-center justify-between py-2 h-full">
                <Link href={"/"}> <h2> Simple Blog App </h2> </Link> 
                {!user && <Link href={"/login"} className="btn-class"> {"Sign In"} </Link>}
                {user && (
                    <form action={logout} className="flex gap-4 items-center">
                        <p> {username || user.email} </p>
                        <button className="btn-class w-fit cursor-pointer"> {"Log out"} </button>
                    </form>
                )}
            </div>
        </nav>
    );
};

export default Navbar;