import InputField from "@/_components/InputField"
import { signup } from "@/utils/actions/auth/signup"
import Link from "next/link"

const SignupPage = async ({ searchParams }: { searchParams: Promise<{ message: string }> }) => {

    const searchParam = await searchParams;

    return (
        <main className="min-h-[calc(100vh-80px)] grid place-items-center py-10 px-4">
            <div className="container mx-auto">
                <form action={signup} className="space-y-5 max-w-[376px] mx-auto bg-white p-10 rounded-md border border-stone-300 shadow-xl">
                    <h1 className="text-2xl font-semibold"> Sign in </h1>
                    <div className="flex flex-col gap-5">
                        <InputField 
                            label="Username:"
                            id="username"
                            name="username"
                            type="username"
                            required
                        />
                        <InputField 
                            label="Email:"
                            id="email"
                            name="email"
                            type="email"
                            required
                        />
                        <InputField 
                            label="Password:"
                            id="password"
                            name="password"
                            type="password"
                            minLength={6}
                            required
                        />
                        <button className="btn-class cursor-pointer"> Sign up </button>
                    </div>
                    {searchParam.message && <p className="text-red-600">{searchParam.message}</p>}
                    <p> {`Already have an account?`} <Link href={'/login'} className="underline"> Sign in here </Link> </p>
                </form>
            </div>
        </main>
    )
}
export default SignupPage