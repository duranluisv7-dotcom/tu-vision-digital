"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import { Product } from "@/lib/store";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    return (
        <div>
            <ProductFilter products={products} onFilterChange={setFilteredProducts} />

            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No se encontraron productos con los filtros seleccionados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
