import { supabase } from "@/lib/supabase";
import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditarProductoPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const { data: product } = await supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .single();

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/productos"
                    className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-dark-gray transition-colors"
                >
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-dark-gray">Editar Producto</h1>
                    <p className="text-gray-500">Modifica los detalles de "{product.nombre}".</p>
                </div>
            </div>

            <ProductForm initialData={product} productId={id} />
        </div>
    );
}
