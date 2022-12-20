"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn, getCsrfToken, useSession, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, redirect, usePathname } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { BuiltInProviderType } from "next-auth/providers";
import { Oval } from "react-loader-spinner";

import signLogo from "../../public/images/signLogo.png";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [csrfToken, setCsrfToken] = useState<string | undefined>("");
    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null>();
    const { data: session } = useSession();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const callbackUrl = searchParams.get("callbackUrl");

    useEffect(() => {
        const initialize = async () => {
            const csrfToken = await getCsrfToken();
            const providers = await getProviders();
            setCsrfToken(csrfToken);
            setProviders(providers);
            setIsLoading(false);
        };
        initialize();
    }, []);

    if (session) {
        if (pathname?.substring(3, 4) === "/") {
            redirect(`/${pathname?.slice(1, 3)}`);
        } else {
            redirect("/");
        }
    }

    return (
        <>
            {!isLoading ? (
                <div className="flex flex-col bg-white w-full h-screen justify-start items-center">
                    <div className="flex my-5">
                        <Link href="/">
                            <div className="flex">
                                <Image
                                    src={signLogo}
                                    alt="Sign Logo"
                                    width={105}
                                    height={32}
                                    className="cursor-pointer"
                                />
                            </div>
                        </Link>
                    </div>
                    {error && (
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
                        {Object.values(
                            providers as Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
                        )
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
                                                callbackUrl: callbackUrl as string,
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
                    <Link href="/signup">
                        <button className="w-80 rounded-sm text-xs py-2 bg-[#e7e9ec] border border-[#adb1b8] hover:bg-[#DFE2E8] active:shadow-inner">
                            Create your Amazon account
                        </button>
                    </Link>
                </div>
            ) : (
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
            )}
        </>
    );
};

export default SignIn;
