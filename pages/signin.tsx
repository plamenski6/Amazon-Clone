import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import type { GetServerSideProps } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import signLogo from "./../public/images/signLogo.png";

type Props = {
    csrfToken: string;
    providers: {
        [key: string]: {
            callbackUrl: string;
            id: string;
            name: string;
            signinUrl: string;
            type: string;
        };
    };
};

const SignIn = ({ csrfToken, providers }: Props) => {
    const router = useRouter();

    return (
        <div className="flex flex-col bg-white w-full h-screen justify-start items-center">
            <div className="flex my-5">
                <Link href="/" legacyBehavior>
                    <div className="flex">
                        <Image src={signLogo} alt="Sign Logo" width={105} height={32} className="cursor-pointer" />
                    </div>
                </Link>
            </div>
            {router.query.error && (
                <div className="flex w-80 border rounded border-red-700 p-4 mb-5">
                    <ExclamationTriangleIcon className="h-7 text-red-700" />
                    <div className="ml-3">
                        <p className="text-red-700 mb-2">There was a problem</p>
                        <p className="text-xs">We cannot find an account with these credentials</p>
                    </div>
                </div>
            )}
            <div className="border border-[#ddd] rounded p-5 w-80">
                <p className="text-2xl mb-4">Sign in</p>
                {Object.values(providers)
                    .reverse()
                    .map((provider) => {
                        if (provider.id === "credentials") {
                            return (
                                <form key={provider.name} method="post" action="/api/auth/callback/credentials">
                                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                    <label className="text-xs font-bold" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        required
                                        pattern="([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})"
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
                                        name="password"
                                        type="password"
                                        placeholder="At least 6 characters"
                                        className="text-sm w-full p-2 border mb-4 rounded-sm outline-none focus:ring-1 focus:ring-yellow-400"
                                    />
                                    <button type="submit" className="partial-button">
                                        Sign in with {provider.name}
                                    </button>
                                    <div className="flex w-full items-center my-5">
                                        <div className="border-t border-[#e7e7e7] grow" />
                                        <p className="flex-none mx-1 text-[#767676] text-xs">or</p>
                                        <div className="border-t border-[#e7e7e7] grow" />
                                    </div>
                                </form>
                            );
                        }
                        return (
                            <button
                                key={provider.name}
                                className="partial-button"
                                onClick={() =>
                                    signIn(provider.id, {
                                        callbackUrl: router.query.callbackUrl as string,
                                    })
                                }
                            >
                                Sign in with {provider.name}
                            </button>
                        );
                    })}
            </div>
            <div className="flex w-80 items-center my-5">
                <div className="border-t border-[#e7e7e7] grow" />
                <p className="flex-none mx-1 text-[#767676] text-xs">New to Amazon?</p>
                <div className="border-t border-[#e7e7e7] grow" />
            </div>
            <Link href="/signup" legacyBehavior>
                <button className="w-80 rounded-sm text-xs py-2 bg-[#e7e9ec] border border-[#adb1b8] hover:bg-[#DFE2E8] active:shadow-inner">
                    Create your Amazon account
                </button>
            </Link>
        </div>
    );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const csrfToken = await getCsrfToken(context);
    const providers = await getProviders();
    return {
        props: { csrfToken, providers },
    };
};
