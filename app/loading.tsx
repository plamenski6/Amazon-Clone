"use client";

import { Oval } from "react-loader-spinner";

const Loading = () => {
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
};

export default Loading;
