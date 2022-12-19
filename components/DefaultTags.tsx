interface Props {
    title: string;
    description: string;
    page: string;
}

const DefaultTags = ({ title, description, page }: Props) => {
    let locale = "";
    let url_en = "";
    let url_es = "";
    let url_de = "";
    let content_url = "";
    let url_home_en = "";
    let url_home_es = "";
    let url_home_de = "";
    if (typeof window !== "undefined") {
        content_url = window.location.href;
        url_home_en = `${window.location.origin}/en`;
        url_home_es = `${window.location.origin}/es`;
        url_home_de = `${window.location.origin}/de`;

        if (window.location.pathname.substring(3, 4) === "/") {
            locale = window.location.pathname.slice(1, 3);
            url_en = `${window.location.origin}/en${window.location.pathname.slice(3)}`;
            url_es = `${window.location.origin}/es${window.location.pathname.slice(3)}`;
            url_de = `${window.location.origin}/de${window.location.pathname.slice(3)}`;
        } else {
            locale = "en";
            url_en = `${window.location.origin}/en${window.location.pathname}`;
            url_es = `${window.location.origin}/es${window.location.pathname}`;
            url_de = `${window.location.origin}/de${window.location.pathname}`;
        }
    }

    return (
        <>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="/assets/apple-touch-startup-image-2436x1125.png" />
            <meta property="og:locale" content={locale} />
            <meta name="twitter:card" content="summary" />
            <meta property="og:url" content={content_url} />
            <link rel="canonical" href={content_url} />
            {page === "home" ? (
                <>
                    <meta property="og:type" content="website" />
                    <link rel="alternate" href={url_home_en} hrefLang="x-default" />
                    <link rel="alternate" href={url_home_en} hrefLang="en" />
                    <link rel="alternate" href={url_home_es} hrefLang="es" />
                    <link rel="alternate" href={url_home_de} hrefLang="de" />
                </>
            ) : (
                <>
                    <meta property="og:type" content="article" />
                    <link rel="alternate" href={url_en} hrefLang="x-default" />
                    <link rel="alternate" href={url_en} hrefLang="en" />
                    <link rel="alternate" href={url_es} hrefLang="es" />
                    <link rel="alternate" href={url_de} hrefLang="de" />
                </>
            )}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link rel="shortcut icon" href="/assets/favicon.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48x48.png" />
            <link rel="manifest" href="/assets/manifest.json" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="theme-color" content="#000000" />
            <meta name="application-name" content="Amazon" />
            <link rel="apple-touch-icon" sizes="57x57" href="/assets/apple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/assets/apple-touch-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/assets/apple-touch-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/assets/apple-touch-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/assets/apple-touch-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/assets/apple-touch-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/assets/apple-touch-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/assets/apple-touch-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="167x167" href="/assets/apple-touch-icon-167x167.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon-180x180.png" />
            <link rel="apple-touch-icon" sizes="1024x1024" href="/assets/apple-touch-icon-1024x1024.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="Amazon" />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-640x1136.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-750x1334.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-828x1792.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-1125x2436.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-1242x2208.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-1242x2688.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-1536x2048.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-1668x2224.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-1668x2388.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-2048x2732.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                href="/assets/apple-touch-startup-image-1620x2160.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-1136x640.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-1334x750.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-1792x828.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2436x1125.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2208x1242.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2688x1242.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2048x1536.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2224x1668.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2388x1668.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2732x2048.png"
            />
            <link
                rel="apple-touch-startup-image"
                media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                href="/assets/apple-touch-startup-image-2160x1620.png"
            />
            <link rel="icon" type="image/png" sizes="228x228" href="/assets/coast-228x228.png" />
            <meta name="msapplication-TileColor" content="#fff" />
            <meta name="msapplication-TileImage" content="/assets/mstile-144x144.png" />
            <meta name="msapplication-config" content="/assets/browserconfig.xml" />
            <link rel="yandex-tableau-widget" href="/assets/yandex-browser-manifest.json" />
        </>
    );
};

export default DefaultTags;
