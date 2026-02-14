"use client";

import { useState, useEffect } from "react";
import { User, Phone, MapPin, Map } from "lucide-react";

interface CheckoutFormProps {
    onValidChange: (isValid: boolean, details: CheckoutDetails) => void;
}

export interface CheckoutDetails {
    fullName: string;
    phone: string;
    address: string;
    city: string;
}

export default function CheckoutForm({ onValidChange }: CheckoutFormProps) {
    const [details, setDetails] = useState<CheckoutDetails>({
        fullName: "",
        phone: "",
        address: "",
        city: "",
    });

    useEffect(() => {
        const isValid =
            details.fullName.trim().length > 3 &&
            details.phone.trim().length > 6 &&
            details.address.trim().length > 5 &&
            details.city.trim().length > 2;

        onValidChange(isValid, details);
    }, [details, onValidChange]);

    const handleChange = (field: keyof CheckoutDetails, value: string) => {
        setDetails(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-dark-gray mb-6 flex items-center gap-2">
                <MapPin className="text-electric-blue" size={20} />
                Datos de Envío
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Nombre Completo
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Juan Pérez"
                            value={details.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Teléfono / WhatsApp
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="tel"
                            placeholder="+58 412 123 4567"
                            value={details.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Dirección de Envío
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                        <textarea
                            rows={2}
                            placeholder="Calle, Número, Punto de Referencia..."
                            value={details.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Ciudad / Estado
                    </label>
                    <div className="relative">
                        <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Caracas, Distrito Capital"
                            value={details.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
