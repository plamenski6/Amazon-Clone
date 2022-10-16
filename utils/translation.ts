import { useRouter } from "next/router";
import en from "../locales/en.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export default function Translation() {
    const router = useRouter();
    const { locale } = router;
    let t;

    if (locale === "en") {
        t = en;
    } else if (locale === "es") {
        t = es;
    } else {
        t = de;
    }

    return t;
}
