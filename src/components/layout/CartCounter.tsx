"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartCounter() {
    const items = useCartStore((state) => state.items);
    const [mounted, setMounted] = useState(false);

    // Evitar errores de hidratación
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const count = items.reduce((total, item) => total + item.cantidad, 0);

    if (count === 0) return null;

    return (
        <span className="absolute -top-1 -right-1 bg-turquoise text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
            {count}
        </span>
    );
}
