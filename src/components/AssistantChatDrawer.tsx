import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, Cake, MapPin, Clock, Phone, Store, Palette } from 'lucide-react';
import { ChatMessage } from '../types';

interface AssistantChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomBuilder: () => void;
  onNavigateToVitrina: () => void;
  onNavigateToCatalog: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    sender: 'bot',
    text: '¡Hola! 💖 Bienvenido a **Pastelería Dulce Delicia** 🍰✨ Soy tu asistente virtual. ¿En qué puedo consentirte hoy?\n\nPuedo mostrarte nuestros postres artesanales de vitrina, guiarte para cotizar un pastel personalizado para tu evento o darte información sobre nuestros horarios y ubicación. 😊',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const SUGGESTION_CHIPS = [
  { label: '🧁 ¿Qué hay disponible en vitrina hoy?', query: '¿Qué productos tienen listos hoy en la vitrina para llevar de inmediato?' },
  { label: '🎨 ¿Cómo solicito un pastel personalizado?', query: '¿Cómo puedo pedir un pastel personalizado con anticipación para un evento?' },
  { label: '🍓 Fresas con chocolate & Regalos', query: 'Platícame sobre las cajas de fresas con chocolate y detalles para regalo.' },
  { label: '📍 Horarios, ubicación y café', query: '¿Cuáles son sus horarios de atención, dirección y el ambiente de su tienda?' },
  { label: '🚗 ¿Cuentan con servicio a domicilio?', query: '¿Realizan entregas de pasteles a domicilio y cómo funciona?' },
];

export const AssistantChatDrawer: React.FC<AssistantChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpenCustomBuilder,
  onNavigateToVitrina,
  onNavigateToCatalog,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          chatHistory: messages,
        }),
      });

      const data = await response.json();

      const botReplyText = data.reply || '¡Gracias por escribirnos! 💖 Estamos a tus órdenes para consentirte con los postres más deliciosos.';

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Error contacting AI Assistant:', error);
      const fallbackMsg: ChatMessage = {
        id: `msg-bot-err-${Date.now()}`,
        sender: 'bot',
        text: '¡Hola dulce cliente! 💖 Tuvimos un parpadeo de señal, pero con gusto te ayudo: puedes explorar nuestra vitrina hoy o enviarnos un WhatsApp para atención inmediata. 📲✨',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fade-in flex justify-end">
      <div
        className="w-full max-w-md bg-[#FAF6F0] h-full flex flex-col shadow-2xl border-l border-[#E8DCC4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#3D2723] text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-[#D96B78] text-white flex items-center justify-center font-bold shadow">
                <Sparkles className="w-5 h-5 text-yellow-200" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#3D2723]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base flex items-center gap-1.5">
                Asistente Dulce Delicia 🎂
              </h3>
              <p className="text-[11px] text-[#E8DCC4] flex items-center gap-1">
                <span>• Atenta & Creativa</span>
                <span className="text-emerald-400 font-semibold">• En línea</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2B1810] text-[#E8DCC4] hover:text-white flex items-center justify-center transition-colors"
            id="assistant-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Quick-Action Toolbar */}
        <div className="bg-[#F5EBE0] px-4 py-2 border-b border-[#E8DCC4] flex items-center justify-around text-xs font-semibold text-[#3D2723]">
          <button
            onClick={() => {
              onNavigateToVitrina();
              onClose();
            }}
            className="hover:text-[#C87D53] flex items-center gap-1"
          >
            <Store className="w-3.5 h-3.5 text-[#C87D53]" /> Vitrina
          </button>
          <span>|</span>
          <button
            onClick={() => {
              onOpenCustomBuilder();
              onClose();
            }}
            className="hover:text-[#C87D53] flex items-center gap-1"
          >
            <Palette className="w-3.5 h-3.5 text-[#C87D53]" /> Cotizar Pastel
          </button>
          <span>|</span>
          <button
            onClick={() => {
              onNavigateToCatalog();
              onClose();
            }}
            className="hover:text-[#C87D53] flex items-center gap-1"
          >
            <Cake className="w-3.5 h-3.5 text-[#C87D53]" /> Catálogo
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF6F0]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-xl bg-[#C87D53] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1 shadow-sm">
                  🎂
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#3D2723] text-[#FAF6F0] rounded-tr-none'
                    : 'bg-white text-[#3D2723] border border-[#E8DCC4] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.text}</div>
                <div
                  className={`text-[9px] text-right ${
                    msg.sender === 'user' ? 'text-[#E8DCC4]' : 'text-[#5A4038]/70'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-[#3D2723] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-[#C87D53]" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-xl bg-[#C87D53] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                🎂
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8DCC4] text-xs text-[#5A4038] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C87D53] animate-ping" />
                <span>Horneando respuesta dulce... 🧁</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 bg-[#F5EBE0]/80 border-t border-[#E8DCC4] overflow-x-auto whitespace-nowrap space-x-2 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-[#A65A32] block mb-1">
            Sugerencias rápidas:
          </span>
          {SUGGESTION_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.query)}
              className="inline-block bg-white hover:bg-[#C87D53] hover:text-white text-[#3D2723] text-[11px] font-semibold px-3 py-1.5 rounded-full border border-[#E8DCC4] transition-all shadow-sm"
              id={`assistant-chip-${idx}`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-[#E8DCC4] flex items-center gap-2">
          <input
            type="text"
            placeholder="Escribe tu duda sobre postres, pedidos o tienda..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-[#FAF6F0] px-4 py-2.5 rounded-2xl text-xs text-[#3D2723] focus:outline-none focus:ring-2 focus:ring-[#C87D53] border border-[#E8DCC4]"
            id="assistant-input-field"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-2xl bg-[#C87D53] hover:bg-[#A65A32] disabled:opacity-50 text-white flex items-center justify-center transition-all shadow"
            id="assistant-send-btn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
