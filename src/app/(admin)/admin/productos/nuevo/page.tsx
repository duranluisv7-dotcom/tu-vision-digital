import ProductForm from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NuevoProductoPage() {
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
                    <h1 className="text-3xl font-bold text-dark-gray">Nuevo Producto</h1>
                    <p className="text-gray-500">Crea un nuevo artículo para tu tienda.</p>
                </div>
            </div>

            <ProductForm />
        </div>
    );
}
