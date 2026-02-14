import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Providers from "@/components/layout/Providers";
import CartCounter from "@/components/layout/CartCounter";
import { ShoppingCart, Instagram, Facebook } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: 'swap',
});

import ChatWidget from "@/components/chat/ChatWidget";
import LanguageToggle from "@/components/layout/LanguageToggle";

// ... (imports remain the same)

// ... (font definitions remain the same)

export const metadata: Metadata = {
  title: "Tu Visión Digital",
  description: "Tu estilo, tu enfoque, tu visión.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased bg-white text-dark-gray min-h-screen flex flex-col font-sans`}
      >
        <Providers>
          <header className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
            {/* ... (header content remains the same) ... */}
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="Tu Visión Digital"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold text-electric-blue font-heading">Tu Visión Digital</h1>
                  <p className="text-xs text-turquoise font-medium">Tu estilo, tu enfoque, tu visión.</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="hover:text-electric-blue transition-colors font-medium">Inicio</a>
                <a href="/productos" className="hover:text-electric-blue transition-colors font-medium">Productos</a>
                <a href="/carrito" className="hover:text-electric-blue transition-colors flex items-center gap-2 font-medium relative p-2">
                  <div className="relative">
                    <ShoppingCart size={20} />
                    <CartCounter />
                  </div>
                  <span className="hidden lg:inline">Carrito</span>
                </a>
              </nav>
              <div className="flex items-center gap-4">
                <LanguageToggle />
                <a
                  href="/login"
                  className="bg-electric-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  Ingresar
                </a>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-dark-gray text-white pt-16 pb-8 mt-20 border-t-4 border-electric-blue">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-1.5 rounded-lg">
                      <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight font-heading">Tu Visión Digital</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    "Tu estilo, tu enfoque, tu visión."
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <a href="https://www.instagram.com/tu_vision_digital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-electric-blue transition-all group">
                      <Instagram size={20} className="text-gray-300 group-hover:text-white" />
                    </a>
                    <a href="https://www.facebook.com/957732350762247" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all group">
                      <Facebook size={20} className="text-gray-300 group-hover:text-white" />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-bold mb-6 border-l-4 border-turquoise pl-3 font-heading">Nuestra Tienda</h3>
                  <ul className="text-sm text-gray-400 space-y-3">
                    <li><a href="/" className="hover:text-electric-blue transition-colors flex items-center gap-2">Inicio</a></li>
                    <li><a href="/productos" className="hover:text-electric-blue transition-colors flex items-center gap-2">Productos</a></li>
                    <li><a href="/carrito" className="hover:text-electric-blue transition-colors flex items-center gap-2">Mi Carrito</a></li>
                  </ul>
                </div>

                {/* Policies */}
                <div>
                  <h3 className="text-lg font-bold mb-6 border-l-4 border-electric-blue pl-3 font-heading">Atención al Cliente</h3>
                  <ul className="text-sm text-gray-400 space-y-3">
                    <li><a href="/politicas/privacidad" className="hover:text-electric-blue transition-colors">Aviso de Privacidad</a></li>
                    <li><a href="/politicas/terminos" className="hover:text-electric-blue transition-colors">Términos de Servicio</a></li>
                    <li><a href="/politicas/envios" className="hover:text-electric-blue transition-colors">Envíos y Garantía</a></li>
                  </ul>
                </div>

                {/* Contact & Payment */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4 border-l-4 border-white pl-3 font-heading">Contacto Directo</h3>
                    <p className="text-sm text-gray-400 mb-2">Estamos para ayudarte</p>
                    <a
                      href="https://wa.me/584241748963"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-bold hover:bg-[#128C7E] transition-colors"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                      Chat en WhatsApp
                    </a>
                  </div>

                  <div className="pt-4">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-3">Pagos Seguros</span>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white px-2 py-1 rounded shadow-sm hover:scale-110 transition-transform cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto" />
                      </div>
                      <div className="bg-white px-2 py-1 rounded shadow-sm hover:scale-110 transition-transform cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto" />
                      </div>
                      <div className="bg-white px-2 py-1 rounded shadow-sm hover:scale-110 transition-transform cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="AMEX" className="h-4 w-auto" />
                      </div>
                      <div className="bg-white px-2 py-1 rounded shadow-sm hover:scale-110 transition-transform cursor-pointer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 w-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                <p className="text-[11px] text-gray-500 uppercase tracking-tighter">
                  &copy; {new Date().getFullYear()} <span className="text-gray-400 font-bold">Tu Visión Digital</span>. Excelencia en cada píxel.
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] text-gray-600">Desarrollado con pasión</span>
                </div>
              </div>
            </div>
          </footer>
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
