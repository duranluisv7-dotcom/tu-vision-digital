import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import Link from "next/link";
import ProductTableRow from "@/components/admin/ProductTableRow";

export const dynamic = 'force-dynamic';

export default async function AdminProductosPage() {
    const { data: products } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-dark-gray">Gestión de Productos</h1>
                    <p className="text-gray-500">Administra el inventario de tu tienda.</p>
                </div>
                <Link
                    href="/admin/productos/nuevo"
                    className="bg-electric-blue text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
                >
                    <Plus size={20} />
                    Nuevo Producto
                </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Producto</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Precio</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products?.map((product) => (
                                <ProductTableRow key={product.id} product={product} />
                            ))}
                            {(!products || products.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                                        <Package size={48} className="mx-auto mb-4 opacity-20" />
                                        Aún no hay productos registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
