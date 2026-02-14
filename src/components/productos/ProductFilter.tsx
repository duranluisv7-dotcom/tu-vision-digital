"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/store";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface FilterProps {
    products: Product[];
    onFilterChange: (filtered: Product[]) => void;
}

export default function ProductFilter({ products, onFilterChange }: FilterProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    // Dynamic Options from loaded products (or defaults)
    const colors = Array.from(new Set(products.map(p => p.color || "Negro"))).filter(Boolean);
    const types = Array.from(new Set([
        ...products.map(p => p.type || ""),
        "General",
        "Sol",
        "Vista",
        "Deportivo",
        "Accesorios",
        "Estuches",
        "Limpieza"
    ])).filter(Boolean);

    useEffect(() => {
        const filtered = products.filter(product => {
            const matchesPrice = product.precio >= priceRange[0] && product.precio <= priceRange[1];
            const matchesColor = selectedColor ? (product.color || "Negro") === selectedColor : true;
            const matchesType = selectedType ? (product.type || "General") === selectedType : true;
            return matchesPrice && matchesColor && matchesType;
        });
        onFilterChange(filtered);
    }, [priceRange, selectedColor, selectedType, products, onFilterChange]);

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
            <div
                className="flex items-center justify-between cursor-pointer md:cursor-auto"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2 text-dark-gray font-bold">
                    <SlidersHorizontal size={20} className="text-electric-blue" />
                    <span>Filtrar Productos</span>
                </div>
                <div className="md:hidden">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            <div className={`mt-6 grid-cols-1 md:grid-cols-3 gap-6 ${isOpen ? "grid" : "hidden md:grid"}`}>
                {/* Price Filter */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Precio Máximo: ${priceRange[1]}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-electric-blue"
                    />
                </div>

                {/* Color Filter */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Color
                    </label>
                    <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-electric-blue outline-none"
                    >
                        <option value="">Todos</option>
                        {colors.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* Type Filter */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Tipo
                    </label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-electric-blue outline-none"
                    >
                        <option value="">Todos</option>
                        {types.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
