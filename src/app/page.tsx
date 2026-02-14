import Image from "next/image";
import { ArrowRight, ShoppingBag, Eye, Focus } from "lucide-react";
import ProductList from "@/components/productos/ProductList";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  // Fetch real products from Supabase
  const { data: products } = await supabase
    .from('productos')
    .select('*')
    .limit(6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <Image
            src="/branding_images/portada de pagina.png"
            alt="Tu Visión Digital Hero"
            fill
            className="object-cover object-right opacity-60"
            priority
          />
        </div>

        <div className="container mx-auto px-4 z-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-extrabold text-dark-gray leading-tight mb-6">
              Vive <span className="text-electric-blue">Tu Estilo</span>,<br />
              Define <span className="text-turquoise">Tu Visión</span>.
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Descubre una experiencia digital única donde <span className="font-semibold">"Tu estilo, tu enfoque, tu visión."</span> es nuestra prioridad.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/productos" className="bg-electric-blue text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
                Explorar Tienda <ArrowRight size={20} />
              </a>
              <button className="border-2 border-dark-gray text-dark-gray px-8 py-4 rounded-xl font-bold hover:bg-dark-gray hover:text-white transition-all">
                Ver Colecciones
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-dark-gray mb-2">Colección Destacada</h2>
              <p className="text-gray-500">Lo último en tecnología y estilo para tu visión.</p>
            </div>
            <a href="/productos" className="text-electric-blue font-semibold flex items-center gap-1 hover:underline">
              Ver todo <ArrowRight size={16} />
            </a>
          </div>

          <ProductList products={products || []} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 text-electric-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-dark-gray">Tu Estilo</h3>
              <p className="text-gray-500">
                Productos seleccionados para complementar tu personalidad y preferencias únicas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-cyan-100 text-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
                <Focus size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-dark-gray">Tu Enfoque</h3>
              <p className="text-gray-500">
                Nos enfocamos en la calidad y la excelencia para superar tus expectativas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 text-dark-gray rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-dark-gray">Tu Visión</h3>
              <p className="text-gray-500">
                Transformamos tu visión en una realidad digital tangible y estilizada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
