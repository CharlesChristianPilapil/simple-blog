import { createClient } from "@/utils/supabase/server";
import InputField from "../InputField"
import { addPost } from "@/utils/actions/blogs/add-post";

const AddBlog = async () => {

    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return;
    }
    
    return (
        <div className="space-y-5">
            <h2 className="font-semibold text-2xl"> Add Blog </h2>
            <form action={addPost} className="flex flex-col gap-5">
                <InputField 
                    label="Title"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="title"
                    required
                />
                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="w-fit"> Content </label>
                    <textarea 
                        name="content" 
                        id="content" 
                        placeholder="Content" 
                        className="min-h-[300px] p-2 resize-none border border-green-500/25 outline-green-300 rounded-sm" 
                    />
                </div>
                <button type="submit" className="btn-class cursor-pointer"> Add Post </button>
            </form>
        </div>
    )
}
export default AddBlog