import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_ID = "google/gemma-2b-it"; // Fast and usually cached

async function queryHuggingFace(payload: any, retries = 3): Promise<any> {
    const response = await fetch(
        `https://router.huggingface.co/models/${MODEL_ID}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(payload),
        }
    );

    if (response.status === 503 && retries > 0) {
        const data = await response.json();
        const waitTime = data.estimated_time || 10;
        console.log(`Model loading... waiting ${waitTime}s. Retries left: ${retries}`);
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        return queryHuggingFace(payload, retries - 1);
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
}

export async function POST(req: Request) {
    if (!HUGGINGFACE_API_KEY) {
        return NextResponse.json({ error: "Missing Hugging Face API Key" }, { status: 500 });
    }

    try {
        const { message } = await req.json();

        // 1. Get Context (Simplified)
        const { data: products } = await supabase
            .from('productos')
            .select('nombre, precio')
            .gt('stock', 0)
            .limit(5);

        const productContext = products?.map(p => `${p.nombre} ($${p.precio})`).join(', ') || "No info";

        // 2. Construct Prompt (Gemma format)
        // <start_of_turn>user ... <end_of_turn><start_of_turn>model ...
        const prompt = `<start_of_turn>user
Eres un asistente de ventas amable de "Tu Visión Digital".
Contexto: ${productContext}.
Ubicación: Caracas (Online). Envíos gratis >$50.
Pregunta: ${message}
Responde en Español, corto y útil.<end_of_turn>
<start_of_turn>model`;

        // 3. Call API with Retry
        const result = await queryHuggingFace({
            inputs: prompt,
            parameters: {
                max_new_tokens: 150,
                return_full_text: false,
                temperature: 0.7,
            }
        });

        // 4. Parse Response
        let botReply = result[0]?.generated_text || "Lo siento, no entendí.";
        // Gemma returns the full prompt + response usually, or just response depending on setup. 
        // We'll clean it up just in case.
        botReply = botReply.replace(prompt, "").trim();

        return NextResponse.json({ reply: botReply });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ reply: "Lo siento, el cerebro de la IA se está despertando. Intenta de nuevo en 20 segundos." }, { status: 500 });
    }
}
