import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "electric-blue": "#007BFF",
                "turquoise": "#00CFCF",
                "dark-gray": "#333333",
            },
            fontFamily: {
                sans: ["var(--font-open-sans)", "sans-serif"],
                heading: ["var(--font-montserrat)", "sans-serif"],
            },
        },
    },
    plugins: [],
} satisfies Config;
