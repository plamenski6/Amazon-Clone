"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ExclamationTriangleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import debugFactory from "debug";

import signLogo from "../../public/images/signLogo.png";

const debug = debugFactory("SIGNUP_PAGE");

const SignUp = () => {
    const { data: session, status } = useSession();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    if (session) {
        if (pathname?.substring(3, 4) === "/") {
            redirect(`/${pathname?.slice(1, 3)}`);
        } else {
            redirect("/");
        }
    }

    if (status === "loading") {
        return (
            <div className="flex h-screen justify-center items-center">
                <Oval
                    height={80}
                    width={80}
                    color="#131921"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#131921"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        );
    }

    const submitSignUpForm = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            const result = await res.json();
            if (result.message !== "Success") {
                setError(true);
            } else {
                signIn("credentials", { email, password, callbackUrl: window.location.origin });
            }
        } catch (err: any) {
            debug(err.message);
        }
    };

    return (
        <div className="flex flex-col bg-white w-full h-screen justify-start items-center">
            <div className="flex my-5">
                <Link href="/" legacyBehavior>
                    <div className="flex">
                        <Image src={signLogo} alt="Sign Logo" width={105} height={32} className="cursor-pointer" />
                    </div>
                </Link>
            </div>
            {error && (
                <div className="flex w-80 border rounded border-red-700 p-4 mb-5">
                    <ExclamationTriangleIcon className="h-7 text-red-700" />
                    <div className="ml-3">
                        <p className="text-red-700 mb-2">There was a problem</p>
                        <p className="text-xs">
                            We cannot create an account with these credentials or the account already exists
                        </p>
                    </div>
                </div>
            )}
            <div className="border border-[#ddd] rounded p-5 w-80">
                <p className="text-2xl mb-4">Create account</p>
                <form onSubmit={submitSignUpForm}>
                    <label className="text-xs font-bold" htmlFor="username">
                        Your name
                    </label>
                    <input
                        required
                        minLength={2}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        type="text"
                        placeholder="First and last name"
                        className="text-sm w-full p-2 border mb-3 rounded-sm outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                    <label className="text-xs font-bold" htmlFor="email">
                        Email
                    </label>
                    <input
                        required
                        pattern="([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Your email"
                        className="text-sm w-full p-2 border mb-3 rounded-sm outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                    <label className="text-xs font-bold" htmlFor="password">
                        Password
                    </label>
                    <input
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="At least 6 characters"
                        className="text-sm w-full p-2 border mb-4 rounded-sm outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                    <button type="submit" className="partial-button">
                        Sign up
                    </button>
                </form>
                <p className="text-xs mt-3">
                    Already have an account?{" "}
                    <span
                        onClick={() => router.back()}
                        className="inline-flex items-center text-[#0066c0] cursor-pointer hover:text-[#c45500] hover:underline"
                    >
                        Sign in <ChevronRightIcon className="h-2 inline" />
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
