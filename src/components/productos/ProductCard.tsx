"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore, Product } from "@/lib/store";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <Link href={`/productos/${product.id}`} className="block relative aspect-square overflow-hidden">
                {product.is_new && (
                    <span className="absolute top-3 left-3 bg-electric-blue text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                        NUEVO
                    </span>
                )}
                {product.discount_price && (!product.discount_end_date || new Date(product.discount_end_date) > new Date()) && (
                    <span className="absolute top-3 right-3 bg-turquoise text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                        OFERTA
                    </span>
                )}
                <Image
                    src={product.imagen_url || "/placeholder.png"}
                    alt={product.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </Link>
            <div className="p-4 flex-grow flex flex-col">
                <Link href={`/productos/${product.id}`}>
                    <h3 className="text-lg font-bold text-dark-gray mb-1 group-hover:text-electric-blue transition-colors line-clamp-2">
                        {product.nombre}
                    </h3>
                </Link>
                <p className="text-turquoise font-semibold mb-4">
                    ${product.precio.toFixed(2)} USD
                </p>
                <div className="mt-auto">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product);
                        }}
                        className="w-full bg-electric-blue text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100"
                    >
                        <ShoppingCart size={18} />
                        Añadir
                    </button>
                </div>
            </div>
        </div>
    );
}

