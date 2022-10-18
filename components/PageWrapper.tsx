import Header from "./Header";

interface Props {
    children: JSX.Element | JSX.Element[];
}

const PageWrapper = ({ children }: Props) => {
    return (
        <div className="mb-5">
            <Header />
            {children}
        </div>
    );
};

export default PageWrapper;
