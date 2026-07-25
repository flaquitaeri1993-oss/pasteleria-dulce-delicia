import React from 'react';
import { Sparkles, Palette, Store, ChevronRight, Heart, Award, Clock, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

interface HeroSectionProps {
  onOpenCustomBuilder: () => void;
  onOpenAssistant: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToVitrina: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCustomBuilder,
  onOpenAssistant,
  onNavigateToCatalog,
  onNavigateToVitrina,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F5EBE0] to-[#FAF6F0] pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Decorative background rustic shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C87D53]/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D96B78]/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#E8DCC4]/60 border border-[#C87D53]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#3D2723]">
              <Sparkles className="w-4 h-4 text-[#C87D53]" />
              <span>Repostería Artesanal & Estilo Rústico Moderno</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D2723] leading-[1.15] tracking-tight">
              Creaciones dulces que inspiran <span className="text-[#C87D53] italic">sonrisas</span> y celebraciones ✨
            </h1>

            <p className="text-base sm:text-lg text-[#5A4038] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              En <strong className="text-[#3D2723]">Pastelería Dulce Delicia</strong> combinamos ingredientes naturales seleccionados, técnicas artesanales y un toque de arte para acompañar tus momentos más memorables.
            </p>

            {/* Quick Choice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl mx-auto lg:mx-0">
              <div
                onClick={onOpenCustomBuilder}
                className="bg-white/80 backdrop-blur-sm border border-[#E8DCC4] p-4 rounded-2xl hover:border-[#C87D53] hover:shadow-md transition-all cursor-pointer text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#C87D53]/15 text-[#C87D53] flex items-center justify-center font-bold">
                    🎨
                  </div>
                  <h3 className="font-serif font-bold text-[#3D2723] text-sm group-hover:text-[#C87D53] transition-colors">
                    Pedidos Personalizados
                  </h3>
                </div>
                <p className="text-xs text-[#5A4038] leading-relaxed">
                  Para bodas, cumpleaños y fiestas. Diseña a tu gusto con 3-5 días de anticipación.
                </p>
                <div className="mt-2 text-[11px] font-bold text-[#A65A32] flex items-center gap-1">
                  Cotizar pastel <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={onNavigateToVitrina}
                className="bg-white/80 backdrop-blur-sm border border-[#E8DCC4] p-4 rounded-2xl hover:border-[#C87D53] hover:shadow-md transition-all cursor-pointer text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#D96B78]/15 text-[#D96B78] flex items-center justify-center font-bold">
                    🧁
                  </div>
                  <h3 className="font-serif font-bold text-[#3D2723] text-sm group-hover:text-[#D96B78] transition-colors">
                    Listo en Vitrina Hoy
                  </h3>
                </div>
                <p className="text-xs text-[#5A4038] leading-relaxed">
                  Pasteles, cheesecakes, gelatinas 3D y vasitos recién horneados para llevar hoy.
                </p>
                <div className="mt-2 text-[11px] font-bold text-[#D96B78] flex items-center gap-1">
                  Ver productos de hoy <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onNavigateToCatalog}
                className="bg-[#3D2723] hover:bg-[#2B1810] text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-[#3D2723]/20 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
                id="hero-explore-catalog-btn"
              >
                <span>Ver Catálogo Completo 🍰</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAssistant}
                className="bg-white hover:bg-[#FAF6F0] text-[#3D2723] border-2 border-[#3D2723] px-6 py-3.5 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 hover:border-[#C87D53] hover:text-[#C87D53]"
                id="hero-assistant-btn"
              >
                <Sparkles className="w-4 h-4 text-[#D96B78]" />
                <span>Hablar con Asistente Dulce</span>
              </button>
            </div>

            {/* Badges / Trust elements */}
            <div className="pt-4 border-t border-[#E8DCC4] grid grid-cols-3 gap-2 text-center max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#3D2723] flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#C87D53]" /> 100% Artesanal
                </div>
                <p className="text-[10px] text-[#5A4038]">Sin saborizantes artificiales</p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-[#3D2723] flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C87D53]" /> Horneado al Día
                </div>
                <p className="text-[10px] text-[#5A4038]">Frescura garantizada</p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-[#3D2723] flex items-center justify-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#D96B78]" /> Pet Friendly
                </div>
                <p className="text-[10px] text-[#5A4038]">Espacio acogedor</p>
              </div>
            </div>
          </div>

          {/* Right Column Visual Media Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80"
                  alt="Pastel Rústico Frutos del Bosque"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="bg-[#D96B78] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-1">
                    Favorito Rústico
                  </span>
                  <h4 className="font-serif text-xl font-bold">Pastel Rústico Frutos del Bosque</h4>
                  <p className="text-xs text-white/90">Bizcocho de vainilla con frutos rojos frescos y acabado semi-naked.</p>
                </div>
              </div>

              {/* Floating Small Card 1 */}
              <div className="absolute -top-6 -left-6 bg-white p-3 rounded-2xl shadow-xl border border-[#E8DCC4] flex items-center gap-3 hidden sm:flex animate-bounce-slow">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=200&q=80"
                    alt="Gelatina Artística"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3D2723]">Gelatina Mosaico 3D 🌸</p>
                  <p className="text-[10px] text-[#A65A32] font-semibold">Inyectada a mano</p>
                </div>
              </div>

              {/* Floating Small Card 2 */}
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-2xl shadow-xl border border-[#E8DCC4] flex items-center gap-3 hidden sm:flex">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=200&q=80"
                    alt="Fresas con Chocolate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3D2723]">Fresas Luxury 🍓</p>
                  <p className="text-[10px] text-[#D96B78] font-semibold">Con Polvo de Oro</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
