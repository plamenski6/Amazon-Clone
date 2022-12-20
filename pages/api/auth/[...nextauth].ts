import NextAuth, { User } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import debugFactory from "debug";

const debug = debugFactory("NEXT_AUTH");

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    secret: "secret",
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, _req) {
                const { email, password } = credentials as { email: string; password: string };
                try {
                    const res = await signInWithEmailAndPassword(auth, email, password);
                    const user = res.user;

                    // If no error and we have user data, return it
                    if (user) {
                        return {
                            name: user.displayName,
                            email: user.email,
                            image: user.photoURL,
                        } as User;
                    }

                    // Return null if user data could not be retrieved
                    return null;
                } catch (err: any) {
                    debug(err.message);
                    return null;
                }
            },
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: "/signin",
    },
};

export default NextAuth(authOptions);
