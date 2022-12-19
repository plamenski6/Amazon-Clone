"use client";

import { usePathname } from "next/navigation";
import DefaultTags from "../components/DefaultTags";

const Head = () => {
    const pathname = usePathname();

    let content_url = "";
    let url_en = "";
    let url_es = "";
    let url_de = "";

    if (typeof window !== "undefined") {
        content_url = window.location.href;
        url_en = `${window.location.origin}/en`;
        url_es = `${window.location.origin}/es`;
        url_de = `${window.location.origin}/de`;
    }

    return (
        <>
            <title>Amazon Clone. Home</title>
            <meta property="og:title" content="Amazon Clone. Home" />
            <meta name="description" content="Home description" />
            <meta property="og:description" content="Home description" />
            <meta property="og:url" content={content_url} />
            <link rel="canonical" href={content_url} />
            <meta property="og:type" content="website" />
            <meta
                property="og:locale"
                content={pathname?.slice(1, 3) === "es" ? "es" : pathname?.slice(1, 3) === "de" ? "de" : "en"}
            />
            <link rel="alternate" href={url_en} hrefLang="x-default" />
            <link rel="alternate" href={url_en} hrefLang="en" />
            <link rel="alternate" href={url_es} hrefLang="es" />
            <link rel="alternate" href={url_de} hrefLang="de" />
            <DefaultTags />
        </>
    );
};

export default Head;
