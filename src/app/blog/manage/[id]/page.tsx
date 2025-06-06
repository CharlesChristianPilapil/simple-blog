"use client";
import InputField from "@/_components/InputField";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ManageBlogPage = () => {

    const router = useRouter();

    const [edit, setEdit] = useState<boolean>(false);
    const [del, setDelete] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [blog, setBlog] = useState<Record<string, any>>();

    const formRef = useRef<HTMLFormElement>(null);
  
    const params = useParams();
    const blogId = params?.id as string;


    useEffect(() => {
        const fetchBlog = async () => {
        const supabase =  createClient();
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("id", blogId as string)
            .single();

        if (!error) setBlog(data);
        };

        if (blogId) fetchBlog();
    }, [blogId]);

    const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        const supabase = createClient();
        const { error } = await supabase
            .from("posts")
            .update({ title, content })
            .eq("id", blogId)
            .select()
            .single();

        if (error) {
            console.error("Error updating blog:", error);
            toast.error("Failed to update blog");
            return;
        }

        toast.success("Changes saved successfully");
        router.refresh();
        setEdit(false);
    };

    const handleDelete = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("posts")
            .delete()
            .eq("id", blogId);

        console.log(data);
        console.log("blogId from params:", blogId);

        if (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete blog post.");
            return;
        }

        toast.success("Blog post deleted successfully.");
        router.push("/");
    };

    return (
        <main className="px-4">
            <div className="container mx-auto">
                <form 
                    ref={formRef} 
                    onSubmit={handleEdit} 
                    className="lg:w-[calc(100%-400px)] xl:w-[calc(100%-511px)] flex flex-col gap-4"
                >
                    <div className="flex justify-between items-center">
                        <InputField 
                            label="Title"
                            name="title"
                            id="title"
                            defaultValue={blog?.title}
                            placeholder={blog?.title}
                            readOnly={edit === false}
                        />
                        <div className="space-x-5">
                            <button 
                                type="button"
                                onClick={() => {
                                    setDelete(false);
                                    setEdit(prev => !prev);
                                }}
                                className={`btn-class ${edit ? 'border border-green-950' : ''} cursor-pointer
                            `}> 
                                Edit 
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setEdit(false);
                                    setDelete(prev => !prev)
                                }}
                                className={`btn-class cursor-pointer bg-red-400 ${del ? 'outline outline-red-800' : ''}`}
                                > Delete </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="content" className="w-fit"> Content </label>
                        <textarea 
                            name="content" 
                            id="content" 
                            placeholder={blog?.content}
                            defaultValue={blog?.content}
                            className="min-h-[300px] p-2 resize-none border border-green-500/25 outline-green-300 rounded-sm" 
                            readOnly={edit === false}
                        />
                    </div>
                    {edit && (
                        <div className="flex gap-5 justify-end">
                            <button 
                                type="submit"
                                className="btn-class cursor-pointer w-fit"
                            > 
                                Save 
                            </button>                            
                            <button 
                                onClick={() => {
                                    router.refresh();
                                    setEdit(false);
                                }} 
                                type="button" 
                                className="btn-class bg-white text-stone-600 border border-stone-600 cursor-pointer w-fit"
                            > 
                                Cancel 
                            </button>
                        </div>
                    )}
                    {del && (
                        <div className="flex flex-col gap-2 items-end ml-auto">
                            <p className="text-stone-600"> Are you sure you want to delete? </p>
                            <div className="flex gap-5">
                                <button 
                                    type="button" 
                                    onClick={handleDelete}
                                    className="btn-class bg-red-400 text-white cursor-pointer w-fit"
                                > 
                                    Delete 
                                </button>                            
                                <button 
                                    onClick={() => setDelete(false)} 
                                    type="button" 
                                    className="btn-class bg-white text-stone-600 border border-stone-600 cursor-pointer w-fit"
                                > 
                                    Cancel 
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
};

export default ManageBlogPage;