import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data: products } = await supabase
            .from('productos')
            .select('*');

        if (!products) {
            return new NextResponse('Error fetching products', { status: 500 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tuvisiondigital.com';

        // CSV Header
        let csv = 'id,title,description,availability,condition,price,link,image_link,brand\n';

        // CSV Rows
        products.forEach(product => {
            const link = `${baseUrl}/productos/${product.id}`;
            const imageLink = product.imagen_url || '';
            const price = `${product.precio.toFixed(2)} USD`;
            const availability = product.stock > 0 ? 'in stock' : 'out of stock';

            // CSV formatting (handling commas and quotes)
            const title = `"${product.nombre.replace(/"/g, '""')}"`;
            const description = `"${(product.descripcion || product.nombre).replace(/"/g, '""')}"`;

            csv += `${product.id},${title},${description},${availability},new,${price},${link},${imageLink},Tu Vision Digital\n`;
        });

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="instagram_catalog.csv"',
            },
        });

    } catch (error) {
        console.error('Error generating catalog:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
