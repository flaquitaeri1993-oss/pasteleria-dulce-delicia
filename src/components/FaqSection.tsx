import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { FAQS, STORE_INFO } from '../data/storeInfo';

interface FaqSectionProps {
  onOpenAssistant: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAssistant }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 bg-[#FAF6F0] border-t border-[#E8DCC4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A65A32] bg-[#E8DCC4]/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Preguntas Frecuentes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2723]">
            Resolvemos tus Dudas con Mucho Gusto ❓✨
          </h2>
          <p className="text-sm text-[#5A4038] mt-2">
            Todo lo que necesitas saber sobre nuestros postres, pedidos personalizados, entregas y visitas.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#3D2723] hover:text-[#C87D53] transition-colors"
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C87D53]" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#C87D53] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5A4038] flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5A4038] leading-relaxed border-t border-[#E8DCC4]/40 bg-[#FAF6F0]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ask Assistant CTA */}
        <div className="mt-10 bg-[#3D2723] text-white p-6 rounded-3xl text-center space-y-3">
          <h3 className="font-serif font-bold text-lg">¿Tienes alguna pregunta especial? 💖</h3>
          <p className="text-xs text-[#E8DCC4] max-w-md mx-auto">
            Nuestro Asistente Virtual o nuestro equipo por WhatsApp responderán inmediatamente a todas tus consultas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAssistant}
              className="bg-[#C87D53] hover:bg-[#A65A32] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Preguntar al Asistente Dulce</span>
            </button>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hola%20Dulce%20Delicia,%20tengo%20una%20duda`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all border border-white/20"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
