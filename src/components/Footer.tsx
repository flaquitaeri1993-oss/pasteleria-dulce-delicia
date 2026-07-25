import React from 'react';
import { Cake, Heart, MapPin, Phone, Mail, Instagram, Clock, Store } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCustomBuilder: () => void;
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCustomBuilder,
  onOpenAssistant,
}) => {
  return (
    <footer className="bg-[#2B1810] text-[#E8DCC4] pt-16 pb-8 border-t border-[#3D2723]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C87D53] text-white flex items-center justify-center font-bold">
                <Cake className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-tight block">
                  Dulce Delicia
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C87D53] font-semibold block">
                  Pastelería Artesanal
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E8DCC4]/80 leading-relaxed">
              Pastelería artesanal de estilo rústico moderno. Elaboramos postres que transmiten creatividad, calidad y amor en cada bocado.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#3D2723] hover:bg-[#C87D53] text-white flex items-center justify-center transition-colors"
                title="WhatsApp Directo"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#3D2723] hover:bg-[#C87D53] text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Nuestra Carta & Tienda</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('vitrina')}
                  className="hover:text-[#C87D53] transition-colors"
                >
                  • Vitrina del Día 🧁
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-[#C87D53] transition-colors"
                >
                  • Catálogo Completo 🍰
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomBuilder}
                  className="hover:text-[#C87D53] transition-colors font-semibold text-[#C87D53]"
                >
                  • Pedidos Personalizados 🎨
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ambiente')}
                  className="hover:text-[#C87D53] transition-colors"
                >
                  • Nuestra Tienda Rústica 📸
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAssistant}
                  className="hover:text-[#C87D53] transition-colors"
                >
                  • Chatear con Asistente Virtual 💬
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C87D53]" /> Horarios de Atención
            </h4>
            <div className="text-xs space-y-1.5 text-[#E8DCC4]/90">
              <p>• {STORE_INFO.hours.weekdays}</p>
              <p>• {STORE_INFO.hours.sunday}</p>
              <p className="text-[11px] text-[#C87D53] font-semibold pt-1">
                *Servicio a domicilio disponible todos los días.
              </p>
            </div>
          </div>

          {/* Col 4: Address */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C87D53]" /> Ubicación & Contacto
            </h4>
            <div className="text-xs space-y-1.5 text-[#E8DCC4]/90">
              <p>{STORE_INFO.address}</p>
              <p>Tel: {STORE_INFO.phone}</p>
              <p>Email: {STORE_INFO.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3D2723] flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8DCC4]/60 gap-4">
          <p>© {new Date().getFullYear()} Pastelería Dulce Delicia. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-[#D96B78] fill-current" /> y mucha dulzura artesanal.
          </p>
        </div>
      </div>
    </footer>
  );
};
