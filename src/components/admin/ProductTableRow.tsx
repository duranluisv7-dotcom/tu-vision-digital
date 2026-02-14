"use client";

import { Edit2, Trash2, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductTableRow({ product }: { product: any }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`¿Estás seguro de que quieres eliminar "${product.nombre}"?`)) return;

        const { error } = await supabase
            .from('productos')
            .delete()
            .eq('id', product.id);

        if (error) {
            alert("Error al eliminar el producto: " + error.message);
        } else {
            router.refresh();
        }
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.imagen_url ? (
                            <Image
                                src={product.imagen_url}
                                alt={product.nombre}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <Package className="w-6 h-6 m-auto text-gray-300" />
                        )}
                    </div>
                    <span className="font-bold text-dark-gray">{product.nombre}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-semibold">
                    ID: {product.categoria_id || 'N/A'}
                </span>
            </td>
            <td className="px-6 py-4 font-bold text-electric-blue">
                ${product.precio.toFixed(2)}
            </td>
            <td className="px-6 py-4">
                <span className={`font-medium ${product.stock <= 5 ? 'text-red-500' : 'text-gray-500'}`}>
                    {product.stock} unid.
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => router.push(`/admin/productos/editar/${product.id}`)}
                        className="p-2 text-gray-400 hover:text-turquoise transition-colors"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
