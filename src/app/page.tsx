import AddBlog from "@/_components/AddBlog";
import BlogFeeds from "@/_components/Feeds";
import SideNav from "@/_components/Navbar/SideNav";

export default function Home() {
    return (
        <main className="py-20 px-5">
            <div className="flex gap-10 container mx-auto">
                <div className="flex-1 space-y-20">
                    <AddBlog />
                    <BlogFeeds />
                </div>
                <SideNav />
            </div>
        </main>
    );
}
