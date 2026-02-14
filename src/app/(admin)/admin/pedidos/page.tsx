import { supabase } from "@/lib/supabase";
import { ShoppingBag, Calendar, User, DollarSign } from "lucide-react";
import ExportOrdersButton from "@/components/admin/ExportOrdersButton";

export const dynamic = 'force-dynamic';

export default async function AdminPedidosPage() {
    const { data: orders } = await supabase
        .from('pedidos')
        .select(`
      *,
      productos (nombre, categoria_id),
      usuarios (nombre, email)
    `)
        .order('fecha', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-dark-gray">Pedidos Realizados</h1>
                    <p className="text-gray-500">Historial de compras registradas en la plataforma.</p>
                </div>
                <ExportOrdersButton />
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">ID Pedido / Fecha</th>
                                <th className="px-6 py-4">Cliente / Usuario</th>
                                <th className="px-6 py-4">Producto</th>
                                <th className="px-6 py-4">Cantidad</th>
                                <th className="px-6 py-4">Pago / Ref</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Total Pagado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders?.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-dark-gray">#{order.id}</span>
                                            <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(order.fecha).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 text-electric-blue rounded-full flex items-center justify-center text-xs font-bold">
                                                {order.usuarios?.nombre?.charAt(0) || "U"}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-dark-gray text-sm">{order.usuarios?.nombre}</span>
                                                <span className="text-xs text-gray-400">{order.usuarios?.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-dark-gray text-sm">{order.productos?.nombre}</span>
                                            <span className="text-gray-400 text-xs italic">ID: {order.producto_id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                                            x{order.cantidad}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-500 uppercase">{order.metodo_pago || 'PayPal'}</span>
                                            {order.referencia && (
                                                <span className="text-[10px] text-electric-blue font-mono bg-blue-50 px-1 rounded block mt-1">
                                                    Ref: {order.referencia}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.estado === 'Completado' ? 'bg-green-100 text-green-700' :
                                            order.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {order.estado || 'Pagado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-lg font-bold text-electric-blue">
                                            ${order.total.toFixed(2)}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {(!orders || orders.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                                        <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                                        No se han registrado pedidos todavía.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
