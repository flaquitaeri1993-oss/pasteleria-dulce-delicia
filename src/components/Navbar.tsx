import React from 'react';
import { Cake, ShoppingBag, MessageCircle, Sparkles, Phone, Store, HelpCircle, Palette } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
  onOpenCustomBuilder: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAssistant,
  onOpenCustomBuilder,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DCC4] transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#3D2723] text-[#FAF6F0] text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>¡Vitrina del día lista! Pide antes de las 3:00 PM y recibe hoy mismo 🚚✨</span>
        <a
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hola%20Dulce%20Delicia,%20quisiera%20consultar%20disponibilidad`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 underline text-[#E8DCC4] hover:text-white ml-2 transition-colors"
        >
          <Phone className="w-3 h-3" />
          WhatsApp Directo
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="nav-brand-logo"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#C87D53] text-white flex items-center justify-center shadow-md shadow-[#C87D53]/20 group-hover:scale-105 transition-transform">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#3D2723] tracking-tight block">
                Dulce Delicia
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#A65A32] font-semibold block">
                Pastelería Artesanal
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F5EBE0] p-1.5 rounded-full border border-[#E8DCC4]">
            <button
              onClick={() => onNavigate('vitrina')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSection === 'vitrina'
                  ? 'bg-[#3D2723] text-white shadow-sm'
                  : 'text-[#3D2723] hover:bg-[#E8DCC4]/50'
              }`}
              id="nav-vitrina-btn"
            >
              <Store className="w-3.5 h-3.5" />
              Vitrina Hoy
            </button>

            <button
              onClick={() => onNavigate('catalogo')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSection === 'catalogo'
                  ? 'bg-[#3D2723] text-white shadow-sm'
                  : 'text-[#3D2723] hover:bg-[#E8DCC4]/50'
              }`}
              id="nav-catalogo-btn"
            >
              <Cake className="w-3.5 h-3.5" />
              Catálogo
            </button>

            <button
              onClick={onOpenCustomBuilder}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#A65A32] hover:bg-[#C87D53]/10 transition-all flex items-center gap-1.5"
              id="nav-custom-builder-btn"
            >
              <Palette className="w-3.5 h-3.5 text-[#C87D53]" />
              Pedido Personalizado
            </button>

            <button
              onClick={() => onNavigate('ambiente')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'ambiente'
                  ? 'bg-[#3D2723] text-white shadow-sm'
                  : 'text-[#3D2723] hover:bg-[#E8DCC4]/50'
              }`}
              id="nav-ambiente-btn"
            >
              Nuestra Tienda
            </button>

            <button
              onClick={() => onNavigate('faq')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                activeSection === 'faq'
                  ? 'bg-[#3D2723] text-white shadow-sm'
                  : 'text-[#3D2723] hover:bg-[#E8DCC4]/50'
              }`}
              id="nav-faq-btn"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </button>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Assistant Button */}
            <button
              onClick={onOpenAssistant}
              className="relative bg-gradient-to-r from-[#D96B78] to-[#C87D53] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-bold shadow-md shadow-[#D96B78]/25 hover:opacity-95 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
              id="nav-assistant-trigger"
            >
              <Sparkles className="w-4 h-4 text-yellow-200 animate-spin-slow" />
              <span className="hidden sm:inline">Asistente Dulce</span>
              <span className="sm:hidden">Asistente</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-ping" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-[#3D2723] text-[#FAF6F0] p-2.5 sm:px-4 sm:py-2.5 rounded-full text-xs font-semibold hover:bg-[#2B1810] transition-all flex items-center gap-2 shadow-sm"
              id="nav-cart-trigger"
            >
              <ShoppingBag className="w-4 h-4 text-[#C87D53]" />
              <span className="hidden md:inline font-medium">Mi Pedido</span>
              {cartCount > 0 && (
                <span className="bg-[#D96B78] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#3D2723]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
