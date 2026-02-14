"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2, Save } from "lucide-react";
import Image from "next/image";

interface ProductFormProps {
    initialData?: any;
    productId?: string;
}

export default function ProductForm({ initialData, productId }: ProductFormProps) {
    const [formData, setFormData] = useState({
        nombre: initialData?.nombre || "",
        descripcion: initialData?.descripcion || "",
        precio: initialData?.precio?.toString() || "0",
        stock: initialData?.stock?.toString() || "0",
        sku: initialData?.sku || "",
        marca: initialData?.marca || "",
        condicion: initialData?.condicion || "new",
        imagen_url: initialData?.imagen_url || "",
    });

    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `product-images/${fileName}`;

            // Importante: Debes tener un bucket llamado 'productos' en Supabase
            const { error: uploadError } = await supabase.storage
                .from('productos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('productos')
                .getPublicUrl(filePath);

            setFormData({ ...formData, imagen_url: publicUrl });
        } catch (error: any) {
            alert("Error al subir imagen: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const preparedData = {
            ...formData,
            precio: parseFloat(formData.precio) || 0,
            stock: parseInt(formData.stock) || 0
        };

        try {
            if (productId) {
                const { error } = await supabase
                    .from('productos')
                    .update(preparedData)
                    .eq('id', productId);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('productos')
                    .insert([preparedData]);
                if (error) throw error;
            }

            router.push("/admin/productos");
            router.refresh();
        } catch (error: any) {
            alert("Error al guardar: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-dark-gray mb-2">Nombre del Producto</label>
                        <input
                            type="text"
                            required
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-dark-gray mb-2">Precio (USD)</label>
                            <input
                                type="text"
                                required
                                value={formData.precio}
                                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-dark-gray mb-2">Stock</label>
                            <input
                                type="text"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-dark-gray mb-2">Descripción</label>
                        <textarea
                            rows={4}
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Media & Details */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-dark-gray mb-2">Imagen del Producto</label>
                        <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-4 overflow-hidden group">
                            {formData.imagen_url ? (
                                <>
                                    <Image src={formData.imagen_url} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, imagen_url: "" })}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {uploading ? (
                                        <Loader2 className="w-8 h-8 text-electric-blue animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-xs text-gray-500 text-center font-medium">Haz clic o arrastra para subir</p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-dark-gray mb-2">SKU (Identificador Único para Meta)</label>
                        <input
                            type="text"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            placeholder="EJ: GAFA-AZUL-001"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-dark-gray mb-2">Marca</label>
                            <input
                                type="text"
                                value={formData.marca}
                                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-dark-gray mb-2">Condición</label>
                            <select
                                value={formData.condicion}
                                onChange={(e) => setFormData({ ...formData, condicion: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue outline-none appearance-none"
                            >
                                <option value="new">Nuevo</option>
                                <option value="refurbished">Reacondicionado</option>
                                <option value="used">Usado</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={saving || uploading}
                    className="bg-electric-blue text-white px-12 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {productId ? "Guardar Cambios" : "Crear Producto"}
                </button>
            </div>
        </form>
    );
}
