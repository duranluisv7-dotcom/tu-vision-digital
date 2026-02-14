export default function PrivacidadPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold text-dark-gray mb-8">Política de Privacidad</h1>

            <div className="prose prose-blue lg:prose-lg text-gray-600 space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">1. Recopilación de Información</h2>
                    <p>
                        En **Tu Visión Digital**, valoramos tu privacidad. Recopilamos información personal básica como tu nombre, correo electrónico y dirección de envío únicamente para procesar tus pedidos y mejorar tu experiencia de compra.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">2. Uso de los Datos</h2>
                    <p>
                        Tus datos se utilizan exclusivamente para:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Procesar y enviar tus pedidos.</li>
                        <li>Notificarte sobre el estado de tu compra.</li>
                        <li>Brindarte soporte técnico y atención al cliente.</li>
                        <li>Cumplir con obligaciones legales de facturación.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">3. Protección de la Información</h2>
                    <p>
                        Implementamos medidas de seguridad robustas, incluyendo encriptación SSL y pasarelas de pago seguras (PayPal), para garantizar que tu información financiera y personal esté protegida contra accesos no autorizados.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">4. Terceros</h2>
                    <p>
                        No vendemos ni compartimos tu información personal con terceros, excepto con aquellos necesarios para completar tu transacción (por ejemplo, servicios de courier o procesadores de pago).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">5. Tus Derechos</h2>
                    <p>
                        Puedes solicitar el acceso, corrección o eliminación de tus datos personales en cualquier momento contactándonos a través de nuestro soporte oficial.
                    </p>
                </section>

                <p className="text-sm border-t pt-8 mt-12 italic">
                    Última actualización: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
