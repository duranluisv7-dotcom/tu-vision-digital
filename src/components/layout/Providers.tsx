"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                    currency: "USD"
                }}
            >
                {children}
            </PayPalScriptProvider>
        </LanguageProvider>
    );
}
