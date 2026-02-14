"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, ShoppingCart, DollarSign, TrendingUp, Download } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0,
        salesToday: 0,
        lowStock: 0
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [statusData, setStatusData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();

        // Real-time subscription for new orders
        const subscription = supabase
            .channel('pedidos-channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pedidos' }, () => {
                fetchData(); // Refresh data on new order
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchData = async () => {
        const { count: productCount } = await supabase.from('productos').select('*', { count: 'exact', head: true });
        const { count: lowStockCount } = await supabase.from('productos').select('*', { count: 'exact', head: true }).lt('stock', 5);
        const { data: orders } = await supabase.from('pedidos').select('*').order('fecha', { ascending: false });
        const { data: lowStock } = await supabase.from('productos').select('*').lt('stock', 5).limit(5);

        if (orders) {
            const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);

            // Sales Today
            const today = new Date().toISOString().split('T')[0];
            const todaySales = orders.filter(o => o.fecha.startsWith(today)).length;

            setStats({
                products: productCount || 0,
                orders: orders.length,
                revenue: totalRevenue,
                salesToday: todaySales,
                lowStock: lowStockCount || 0
            });

            setRecentOrders(orders.slice(0, 5));
            setLowStockProducts(lowStock || []);

            // Prepare Line Chart Data (Sales by Date)
            const salesByDate: Record<string, number> = {};
            orders.forEach(order => {
                const date = new Date(order.fecha).toLocaleDateString();
                salesByDate[date] = (salesByDate[date] || 0) + order.total;
            });
            const lineData = Object.keys(salesByDate).map(date => ({ date, total: salesByDate[date] })).reverse();
            setChartData(lineData);

            // Prepare Pie Chart Data (Orders by Status)
            const statusCount: Record<string, number> = {};
            orders.forEach(order => {
                const status = order.estado || 'Pagado';
                statusCount[status] = (statusCount[status] || 0) + 1;
            });
            const pieData = Object.keys(statusCount).map(status => ({ name: status, value: statusCount[status] }));
            setStatusData(pieData);
        }
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-dark-gray">Panel de Control</h1>
                    <p className="text-gray-500">Bienvenido de nuevo. Resumen en tiempo real.</p>
                </div>
                <div className="flex gap-3">
                    <a
                        href="/api/catalog"
                        target="_blank"
                        className="bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-pink-700 transition-all flex items-center gap-2"
                    >
                        📸 Feed Instagram
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <Package className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Total Productos</p>
                        <p className="text-2xl font-bold text-dark-gray">{stats.products}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                        <ShoppingCart className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Total Pedidos</p>
                        <p className="text-2xl font-bold text-dark-gray">{stats.orders}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center">
                        <DollarSign className="text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Ingresos Totales</p>
                        <p className="text-2xl font-bold text-dark-gray">${stats.revenue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="text-purple-500" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium">Ventas Hoy</p>
                        <p className="text-2xl font-bold text-dark-gray">{stats.salesToday}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-dark-gray mb-6">Ventas en el Tiempo</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="total" stroke="#00CFCF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Pie Chart */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-dark-gray mb-6">Estado de Pedidos</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {statusData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs text-gray-500">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-dark-gray mb-4">Últimos Pedidos (En Tiempo Real)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Metodo</th>
                                <th className="px-6 py-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold">#{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.fecha).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-bold text-electric-blue">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-xs uppercase">{order.metodo_pago || 'PayPal'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${order.estado === 'Completado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.estado || 'Pagado'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Inventory Alerts */}
            {lowStockProducts.length > 0 && (
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-sm">
                    <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                        Alertas de Inventario
                        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">Bajo Stock ({stats.lowStock})</span>
                    </h2>
                    <div className="space-y-3">
                        {lowStockProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-red-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden relative">
                                        {/* Simple placeholder or image if available, avoiding import if not needed or using standard img tag */}
                                        <img src={product.imagen_url || "/placeholder.png"} alt={product.nombre} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-dark-gray">{product.nombre}</p>
                                        <p className="text-xs text-gray-400">ID: {product.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-red-600 font-bold text-lg">{product.stock}</span>
                                    <p className="text-[10px] text-red-400 uppercase font-bold">Unidades</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
