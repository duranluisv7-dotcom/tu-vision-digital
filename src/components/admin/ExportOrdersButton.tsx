"use client";

import { Download } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ExportOrdersButton() {
    const handleExport = async () => {
        try {
            const { data: orders } = await supabase
                .from('pedidos')
                .select(`
                    *,
                    productos (nombre),
                    usuarios (nombre, email)
                `)
                .order('fecha', { ascending: false });

            if (!orders) return;

            // Define CSV headers
            let csv = 'ID,Fecha,Cliente,Email,Producto,Cantidad,Total,Metodo Pago,Referencia,Estado\n';

            // Add rows
            orders.forEach(order => {
                const row = [
                    order.id,
                    new Date(order.fecha).toLocaleDateString(),
                    `"${order.usuarios?.nombre || 'Invitado'}"`,
                    order.usuarios?.email || '',
                    `"${order.productos?.nombre || 'Producto'}"`,
                    order.cantidad,
                    order.total,
                    order.metodo_pago || 'PayPal',
                    order.referencia || '',
                    order.estado || 'Pagado'
                ];
                csv += row.join(',') + '\n';
            });

            // Trigger download
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `reporte_pedidos_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

        } catch (error) {
            console.error("Error exporting:", error);
            alert("Error al exportar los datos.");
        }
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition-colors shadow-sm"
        >
            <Download size={16} />
            Exportar CSV
        </button>
    );
}
