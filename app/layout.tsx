import "../styles/globals.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Providers from "../components/Providers";

type Props = {
    children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
    return (
        <html>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
