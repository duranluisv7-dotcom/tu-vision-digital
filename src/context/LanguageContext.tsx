"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Locale = "es" | "en";

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
    es: {
        "nav.home": "Inicio",
        "nav.products": "Productos",
        "nav.cart": "Carrito",
        "nav.login": "Ingresar",
        "hero.subtitle": "Tu estilo, tu enfoque, tu visión.",
        "search.placeholder": "Buscar productos...",
        "footer.about": "Nosotros",
        "footer.policies": "Políticas",
        "footer.contact": "Contacto",
    },
    en: {
        "nav.home": "Home",
        "nav.products": "Products",
        "nav.cart": "Cart",
        "nav.login": "Login",
        "hero.subtitle": "Your style, your focus, your vision.",
        "search.placeholder": "Search products...",
        "footer.about": "About Us",
        "footer.policies": "Policies",
        "footer.contact": "Contact",
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("es");

    const t = (key: string) => {
        return translations[locale][key as keyof typeof translations["es"]] || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
