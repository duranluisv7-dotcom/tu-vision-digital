"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { CheckCircle, Info, Smartphone, Building2, User2 } from "lucide-react";

export default function PagoMovilForm() {
    const { items, getTotal, clearCart } = useCartStore();
    const [referencia, setReferencia] = useState("");
    const [banco, setBanco] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("Por favor, inicia sesión para registrar tu pago.");
                return;
            }

            // Registrar pedido con estado 'Pendiente' y referencia de Pago Móvil
            const orderPromises = items.map(item =>
                supabase.from('pedidos').insert({
                    usuario_id: user.id,
                    producto_id: item.id,
                    cantidad: item.cantidad,
                    total: item.precio * item.cantidad,
                    metodo_pago: 'Pago Móvil',
                    referencia: referencia,
                    banco_emisor: banco,
                    estado: 'Pendiente'
                })
            );

            await Promise.all(orderPromises);

            clearCart();
            setIsFinished(true);

        } catch (error) {
            console.error("Error al registrar Pago Móvil:", error);
            alert("Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isFinished) {
        return (
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">¡Comprobante Recibido!</h3>
                <p className="text-green-700 text-sm">
                    Hemos registrado tu referencia **{referencia}**. <br />
                    Tu pedido será verificado por nuestro equipo en breve.
                </p>
                <a href="/" className="inline-block mt-6 text-green-800 font-bold hover:underline">
                    Volver al inicio
                </a>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 text-electric-blue border border-blue-100">
                <Info size={20} className="shrink-0" />
                <div className="text-xs space-y-1">
                    <p className="font-bold">Datos para Pago Móvil:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-2"><Building2 size={14} /> <span>Bancamiga</span></div>
                        <div className="flex items-center gap-2"><Smartphone size={14} /> <span>04261143148</span></div>
                        <div className="flex items-center gap-2"><User2 size={14} /> <span>V-13.320.011</span></div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Banco Emisor
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Ej: Banesco, Mercantil..."
                        value={banco}
                        onChange={(e) => setBanco(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Referencia (Últimos 6-8 dígitos)
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Ej: 123456"
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isProcessing || !referencia || !banco}
                    className="w-full bg-turquoise text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-100 disabled:opacity-50 disabled:shadow-none"
                >
                    {isProcessing ? "Registrando..." : "Confirmar Pago Móvil"}
                </button>
            </form>

            <p className="text-[10px] text-gray-400 text-center italic">
                El monto a transferir es de: <span className="font-bold text-dark-gray">${getTotal().toFixed(2)} USD</span> (Tasa BCV del día)
            </p>
        </div>
    );
}
