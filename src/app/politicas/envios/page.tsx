export default function EnviosPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold text-dark-gray mb-8">Envíos y Devoluciones</h1>
            
            <div className="prose prose-blue lg:prose-lg text-gray-600 space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">Políticas de Envío</h2>
                    <p>
                        En **Tu Visión Digital**, nos esforzamos por que recibas tus productos de forma rápida y segura.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>**Tiempos de entrega:** Procesamos los pedidos en 24-48 horas hábiles. La entrega final depende del courier seleccionado (promedio 3-5 días hábiles).</li>
                        <li>**Costos:** Ofrecemos envío estándar gratuito por promociones actuales.</li>
                        <li>**Zonas de cobertura:** Enviamos a todo el territorio nacional.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">Políticas de Devolución</h2>
                    <p>
                        Tu satisfacción es nuestra prioridad. Si no estás conforme con tu compra:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Tienes **7 días hábiles** desde la recepción para solicitar un cambio o devolución.</li>
                        <li>El producto debe estar en su empaque original, sin señales de uso y con todas sus etiquetas.</li>
                        <li>Los costos de envío por devolución corren por cuenta del cliente, a menos que el producto presente un defecto de fábrica.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">Proceso de Garantía</h2>
                    <p>
                        Todos nuestros productos cuentan con garantía oficial. En caso de falla técnica, contáctanos con tu número de pedido y fotos del problema para gestionar la reparación o reemplazo.
                    </p>
                </section>

                <p className="text-sm border-t pt-8 mt-12 italic">
                    Última actualización: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
