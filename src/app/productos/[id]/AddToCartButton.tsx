"use client";

import { useState } from "react";
import { useCartStore, Product } from "@/lib/store";
import { ShoppingCart, Plus, Minus, CheckCircle } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAdd = () => {
        addItem(product, quantity);
        setIsAdded(true);
        setQuantity(1);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <span className="text-gray-700 font-bold">Cantidad:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                        onClick={decrement}
                        disabled={isAdded}
                        className="p-3 hover:bg-gray-50 text-dark-gray transition-colors border-r border-gray-200 disabled:opacity-50"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-lg select-none">
                        {quantity}
                    </span>
                    <button
                        onClick={increment}
                        disabled={isAdded}
                        className="p-3 hover:bg-gray-50 text-dark-gray transition-colors border-l border-gray-200 disabled:opacity-50"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            <button
                onClick={handleAdd}
                disabled={isAdded}
                className={`w-full md:w-auto px-12 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl transform active:scale-95 ${isAdded
                    ? "bg-turquoise text-white shadow-turquoise/20 translate-y-[-2px]"
                    : "bg-electric-blue text-white shadow-blue-100 hover:bg-blue-600"
                    }`}
            >
                {isAdded ? (
                    <>
                        <CheckCircle size={24} />
                        ¡Añadido!
                    </>
                ) : (
                    <>
                        <ShoppingCart size={24} />
                        Añadir al Carrito
                    </>
                )}
            </button>
        </div>
    );
}
