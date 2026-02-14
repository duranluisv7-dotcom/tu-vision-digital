"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut, Loader2, Menu, X } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();

                if (authError || !user) {
                    console.log("Error de auth o no hay usuario:", authError);
                    router.push("/login");
                    return;
                }

                const { data: profile, error: dbError } = await supabase
                    .from("usuarios")
                    .select("rol")
                    .eq("id", user.id)
                    .maybeSingle();

                if (dbError) {
                    console.log("Error al leer tabla usuarios:", dbError);
                    return;
                }

                if (!profile) {
                    console.log("Perfil no encontrado para el ID:", user.id);
                    return;
                }

                if (profile.rol !== "administrador") {
                    console.log("No es admin:", profile);
                    alert("Acceso denegado: Tu usuario no tiene rol de 'administrador'.");
                    router.push("/");
                    return;
                }

                setIsAdmin(true);
            } catch (err) {
                console.error("Error inesperado:", err);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    if (loading || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col p-4">
                <div className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <Loader2 className="w-12 h-12 text-electric-blue animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-dark-gray mb-2">Verificando Acceso</h3>
                    <p className="text-gray-500 font-medium mb-4">Por favor espera un momento...</p>

                    {!loading && !isAdmin && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                            No tienes permisos de administrador o hubo un fallo en la conexión.
                            <button
                                onClick={() => router.push("/login")}
                                className="mt-4 w-full bg-electric-blue text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition-all"
                            >
                                Ir a Iniciar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`bg-dark-gray text-white w-64 flex-shrink-0 transition-all duration-300 fixed inset-y-0 left-0 z-50 lg:relative ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
                <div className="p-6 flex items-center justify-between mb-8">
                    <h2 className={`font-bold text-xl text-turquoise truncate transition-all ${!isSidebarOpen && 'lg:hidden'}`}>Panel Admin</h2>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-white p-1 hover:bg-gray-700 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <nav className="px-4 space-y-2">
                    <AdminNavLink href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
                    <AdminNavLink href="/admin/productos" icon={<Package size={20} />} label="Productos" isOpen={isSidebarOpen} />
                    <AdminNavLink href="/admin/pedidos" icon={<ShoppingCart size={20} />} label="Pedidos" isOpen={isSidebarOpen} />
                    <AdminNavLink href="/admin/usuarios" icon={<Users size={20} />} label="Usuarios" isOpen={isSidebarOpen} />
                </nav>

                <div className="absolute bottom-4 inset-x-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-red-600/20 hover:text-red-400 transition-all"
                    >
                        <LogOut size={20} />
                        <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0">
                <header className="bg-white border-b border-gray-200 p-4 lg:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-dark-gray p-2 hover:bg-gray-100 rounded-lg">
                        <Menu size={24} />
                    </button>
                </header>
                <div className="p-4 md:p-8 overflow-y-auto max-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}

function AdminNavLink({ href, icon, label, isOpen }: { href: string; icon: React.ReactNode; label: string; isOpen: boolean }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
        >
            <div className="text-turquoise group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className={`font-medium transition-all ${!isOpen && 'lg:hidden'}`}>{label}</span>
            {!isOpen && (
                <div className="absolute left-16 bg-dark-gray text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block z-50">
                    {label}
                </div>
            )}
        </Link>
    );
}
