"use client";

import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <p className="text-3xl text-center mb-4">Something went wrong!</p>
            <button className="bg-red-700 text-white py-1 px-2 shadow-lg rounded" onClick={() => reset()}>
                Reset error boundary
            </button>
        </div>
    );
};

export default Error;
