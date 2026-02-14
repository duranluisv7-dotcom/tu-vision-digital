import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCart, CheckCircle, Truck, ShieldCheck } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
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
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Product Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                    <Image
                        src={product.imagen_url || "/placeholder.png"}
                        alt={product.nombre}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <span className="inline-block bg-blue-50 text-electric-blue px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                            {product.marca || "Premium"}
                        </span>
                        <h1 className="text-4xl font-extrabold text-dark-gray leading-tight mb-2">
                            {product.nombre}
                        </h1>
                        <p className="text-3xl font-bold text-electric-blue">
                            ${product.precio.toFixed(2)} USD
                        </p>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        {product.descripcion || "No hay descripción disponible para este producto."}
                    </p>

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-gray-700">
                            <CheckCircle size={20} className="text-turquoise" />
                            <span className="font-medium">Stock disponible: {product.stock} unidades</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Truck size={20} className="text-gray-400" />
                            <span>Envío estándar gratuito</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <ShieldCheck size={20} className="text-gray-400" />
                            <span>Garantía oficial y compra segura</span>
                        </div>
                    </div>

                    <div className="pt-8">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
