import { supabase } from "@/lib/supabase";
import ProductList from "@/components/productos/ProductList";

export const dynamic = 'force-dynamic';

export default async function ProductosPage() {
    const { data: products } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-dark-gray mb-2">Nuestros Productos</h1>
                <p className="text-gray-500">Explora nuestra colección completa de tecnología y estilo.</p>
            </div>

            <ProductList products={products || []} />
        </div>
    );
}
