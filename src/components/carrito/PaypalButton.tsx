"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCartStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function PaypalButton() {
    const { items, getTotal, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCreateOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: getTotal().toString(),
                    },
                    description: "Compra en Tu Visión Digital",
                },
            ],
        });
    };

    const handleApprove = async (data: any, actions: any) => {
        setIsProcessing(true);
        try {
            const details = await actions.order.capture();

            // 1. Obtener el usuario actual (o manejar venta como invitado)
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("Por favor, inicia sesión para completar tu pedido.");
                return;
            }

            // 2. Registrar cada producto en la tabla 'pedidos'
            const orderPromises = items.map(item =>
                supabase.from('pedidos').insert({
                    usuario_id: user.id,
                    producto_id: item.id,
                    cantidad: item.cantidad,
                    total: item.precio * item.cantidad
                })
            );

            await Promise.all(orderPromises);

            // 3. Limpiar carrito y avisar al usuario
            clearCart();
            alert(`¡Pago completado con éxito, ${details.payer.name.given_name}! Tu pedido ha sido registrado.`);

        } catch (error) {
            console.error("Error al procesar el pago:", error);
            alert("Hubo un problema al registrar tu pedido. Por favor contacta a soporte.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="w-full max-w-md mx-auto mt-6">
            {isProcessing && (
                <div className="text-center mb-4 text-electric-blue font-bold animate-pulse">
                    Procesando tu pedido...
                </div>
            )}
            <PayPalButtons
                disabled={isProcessing}
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onError={(err) => {
                    console.error("PayPal Error:", err);
                    alert("No se pudo cargar el botón de PayPal. Verifica la configuración (Client ID) o tu conexión.");
                }}
                style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
            />
        </div>
    );
}
