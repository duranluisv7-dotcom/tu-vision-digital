"use client";

import { useCartStore } from "@/lib/store";
import PaypalButton from "@/components/carrito/PaypalButton";
import PagoMovilForm from "@/components/carrito/PagoMovilForm";
import Image from "next/image";
import { Trash2, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import CheckoutForm, { CheckoutDetails } from "@/components/carrito/CheckoutForm";

export default function CarritoPage() {
    const { items, removeItem, clearCart, getTotal } = useCartStore();
    const [metodoPago, setMetodoPago] = useState<"paypal" | "pagomovil">("paypal");
    const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleFormValidation = (isValid: boolean, details: CheckoutDetails) => {
        setIsFormValid(isValid);
        setCheckoutDetails(details);
    };

    const handleWhatsAppRedirect = () => {
        if (!checkoutDetails || !items.length) return;

        const total = getTotal().toFixed(2);
        const productList = items.map(i => `- ${i.nombre} (x${i.cantidad})`).join("\n");

        const message = `*Nuevo Pedido - Tu Visión Digital*\n\n` +
            `*Cliente:* ${checkoutDetails.fullName}\n` +
            `*Teléfono:* ${checkoutDetails.phone}\n` +
            `*Dirección:* ${checkoutDetails.address}, ${checkoutDetails.city}\n\n` +
            `*Productos:*\n${productList}\n\n` +
            `*Total a Pagar:* $${total} USD\n` +
            `*Método de Pago:* ${metodoPago === 'paypal' ? 'PayPal' : 'Pago Móvil'}`;

        const encodedMessage = encodeURIComponent(message);
        // Use the specific provided link if requesting general chat, or use phone number for message
        // User requested: +58 424 174 8963
        // But to send the order details, we need the text.
        // We will try to open the phone number link with text.
        const phoneNumber = "584241748963";
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

        clearCart();
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <ShoppingCart size={48} />
                </div>
                <h1 className="text-3xl font-bold text-dark-gray mb-4">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-8">Parece que aún no has añadido nada a tu carrito.</p>
                <Link
                    href="/productos"
                    className="inline-flex items-center gap-2 bg-electric-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-dark-gray mb-10">Finalizar Compra</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Detalles y Formulario */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Lista de Productos (Compacta) */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-dark-gray mb-4">Resumen de Artículos</h3>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={item.imagen_url || "/placeholder.png"}
                                            alt={item.nombre}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-dark-gray text-sm">{item.nombre}</h4>
                                        <p className="text-xs text-gray-500">Cant: {item.cantidad}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-turquoise font-bold text-sm">${(item.precio * item.cantidad).toFixed(2)}</p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-400 text-xs hover:text-red-600 underline"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <CheckoutForm onValidChange={handleFormValidation} />
                </div>

                {/* Resumen de Pago */}
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-fit sticky top-24">
                    <h2 className="text-xl font-bold text-dark-gray mb-6">Confirmación</h2>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${getTotal().toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Envío</span>
                            <span className="text-turquoise font-medium">Gratis</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                            <span className="text-lg font-bold text-dark-gray">Total</span>
                            <span className="text-2xl font-bold text-electric-blue">${getTotal().toFixed(2)} USD</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                            <button
                                onClick={() => setMetodoPago("paypal")}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${metodoPago === "paypal" ? "bg-electric-blue text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                PayPal
                            </button>
                            <button
                                onClick={() => setMetodoPago("pagomovil")}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${metodoPago === "pagomovil" ? "bg-turquoise text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                Pago Móvil
                            </button>
                        </div>

                        {!isFormValid && (
                            <div className="bg-yellow-50 text-yellow-700 text-xs p-3 rounded-lg border border-yellow-100 text-center">
                                Por favor completa tus datos de envío para continuar.
                            </div>
                        )}

                        <div className={!isFormValid ? "opacity-50 pointer-events-none filter grayscale" : ""}>
                            {metodoPago === "paypal" ? (
                                <div className="space-y-4">
                                    <div onClick={handleWhatsAppRedirect}>
                                        <PaypalButton />
                                    </div>
                                    <p className="text-[10px] text-center text-gray-400">
                                        Al completar el pago, serás redirigido a WhatsApp para confirmar tu pedido.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <PagoMovilForm />
                                </div>
                            )}
                        </div>

                        {/* Button for Pago Movil Logic override if needed, but PagoMovilForm handles its own submit. 
                             We might need to pass the success handler to PagoMovilForm to redirect.
                             For now, let's assume PagoMovilForm needs to know about the redirect. 
                             Or we can just add a manual "Confirmar Pedido en WhatsApp" button.
                         */}

                        {metodoPago === 'pagomovil' && isFormValid && (
                            <button
                                onClick={handleWhatsAppRedirect}
                                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-lg mt-4"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                                Notificar Pago por WhatsApp
                            </button>
                        )}

                    </div>

                    <p className="text-[10px] text-gray-400 text-center mt-6">
                        Tus datos están protegidos.
                    </p>
                </div>
            </div>
        </div>
    );
}
