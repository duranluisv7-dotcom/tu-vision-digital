"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
        { text: "¡Hola! 👋 Soy el asistente virtual de Tu Visión Digital. ¿En qué puedo ayudarte hoy?", isBot: true }
    ]);
    const [input, setInput] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Lo siento, hubo un error al conectar con el asistente.", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 md:w-96 mb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 flex flex-col h-[500px]">
                    {/* Header */}
                    <div className="bg-electric-blue p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Soporte IA</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-xs text-blue-100">En línea</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-200">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot
                                    ? "bg-white text-dark-gray shadow-sm border border-gray-100 rounded-tl-none"
                                    : "bg-electric-blue text-white shadow-md rounded-tr-none"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-dark-gray shadow-sm border border-gray-100 rounded-tl-none p-3 rounded-2xl text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Escribe tu consulta..."
                                className="flex-grow bg-gray-100 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-electric-blue outline-none text-dark-gray placeholder:text-gray-400"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-turquoise text-white p-2.5 rounded-xl hover:bg-cyan-600 transition-colors shadow-sm"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <a
                                href="https://wa.me/584241748963"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-gray-400 hover:text-electric-blue transition-colors flex items-center justify-center gap-1"
                            >
                                ¿Prefieres WhatsApp? <span className="underline">Clic aquí</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-electric-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 group"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} className="group-hover:animate-bounce" />}
            </button>
        </div>
    );
}
