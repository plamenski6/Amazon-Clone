import "../styles/globals.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Providers from "../components/Providers";
import { unstable_getServerSession } from "next-auth/next";

type Props = {
    children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
    const session = await unstable_getServerSession();

    return (
        <html>
            <body>
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
