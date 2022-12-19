import { usePathname } from "next/navigation";
import en from "../locales/en.json";
import es from "../locales/es.json";
import de from "../locales/de.json";

export default function Translation() {
    const pathname = usePathname();
    const locale = pathname?.slice(1, 3);
    let t;

    if (locale === "es") {
        t = es;
    } else if (locale === "de") {
        t = de;
    } else {
        t = en;
    }

    return t;
}
