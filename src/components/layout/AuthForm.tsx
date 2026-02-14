"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

interface AuthFormProps {
    type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (type === "register") {
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { nombre },
                    },
                });
                if (signUpError) throw signUpError;

                // Crear entrada en la tabla 'usuarios'
                if (data.user) {
                    await supabase.from('usuarios').insert({
                        id: data.user.id,
                        nombre,
                        email,
                        rol: 'cliente'
                    });
                }

                alert("¡Registro exitoso! Por favor revisa tu correo para confirmar.");
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                router.push("/");
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-dark-gray">
                    {type === "login" ? "¡Bienvenido de nuevo!" : "Crea tu cuenta"}
                </h2>
                <p className="text-gray-500 mt-2">
                    {type === "login"
                        ? "Ingresa tus credenciales para continuar."
                        : "Únete a Tu Visión Digital hoy mismo."}
                </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
                {type === "register" && (
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all"
                        />
                    </div>
                )}

                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 italic">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-electric-blue text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        type === "login" ? "Iniciar Sesión" : "Registrarse"
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
                {type === "login" ? (
                    <>
                        ¿No tienes una cuenta?{" "}
                        <Link href="/register" className="text-electric-blue font-bold hover:underline">
                            Regístrate aquí
                        </Link>
                    </>
                ) : (
                    <>
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-electric-blue font-bold hover:underline">
                            Inicia sesión
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
