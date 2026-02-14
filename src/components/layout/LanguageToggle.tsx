"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
    const { locale, setLocale } = useLanguage();

    return (
        <button
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-electric-blue transition-colors border border-gray-200 px-3 py-1.5 rounded-full"
        >
            <Globe size={14} />
            {locale === "es" ? "ES" : "EN"}
        </button>
    );
}
