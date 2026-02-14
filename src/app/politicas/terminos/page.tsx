export default function TerminosPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold text-dark-gray mb-8">Términos y Condiciones</h1>

            <div className="prose prose-blue lg:prose-lg text-gray-600 space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">1. Aceptación de los Términos</h2>
                    <p>
                        Al acceder y utilizar el sitio web de **Tu Visión Digital**, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte, te sugerimos no utilizar nuestros servicios.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">2. Uso del Sitio</h2>
                    <p>
                        Este sitio es para uso personal y comercial relacionado con la compra de nuestros productos. Queda prohibida la reproducción total o parcial del contenido sin autorización previa.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">3. Propiedad Intelectual</h2>
                    <p>
                        Todos los logotipos, imágenes y textos son propiedad de **Tu Visión Digital** o sus proveedores y están protegidos por las leyes de derechos de autor.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">4. Limitación de Responsabilidad</h2>
                    <p>
                        No nos hacemos responsables por daños indirectos derivados del uso de nuestros productos o la imposibilidad de acceder al sitio por causas técnicas ajenas a nuestro control.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark-gray mb-4">5. Modificaciones</h2>
                    <p>
                        Nos reservamos el derecho de actualizar estos términos en cualquier momento. Te recomendamos revisarlos periódicamente.
                    </p>
                </section>

                <p className="text-sm border-t pt-8 mt-12 italic">
                    Última actualización: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
