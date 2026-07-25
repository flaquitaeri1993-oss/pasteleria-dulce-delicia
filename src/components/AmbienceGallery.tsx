import React from 'react';
import { Camera, Coffee, Heart, Sparkles, MapPin, Instagram } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

export const AmbienceGallery: React.FC = () => {
  return (
    <section id="ambiente" className="py-16 bg-[#F5EBE0] border-t border-[#E8DCC4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A65A32] bg-white px-3.5 py-1.5 rounded-full inline-block mb-3 border border-[#E8DCC4]">
            Un Rincón Lleno de Magia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D2723]">
            Nuestro Ambiente Rústico & Fotogénico 📸☕
          </h2>
          <p className="text-sm sm:text-base text-[#5A4038] mt-2">
            Un espacio pensado para relajarte en familia, tener citas dulces o tomar la foto perfecta para tus redes sociales.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STORE_INFO.ambienceHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-sm hover:shadow-md transition-all text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] text-[#C87D53] mx-auto flex items-center justify-center font-bold text-xl border border-[#E8DCC4]">
                {idx === 0 && <Coffee className="w-6 h-6" />}
                {idx === 1 && <Camera className="w-6 h-6 text-[#D96B78]" />}
                {idx === 2 && <Heart className="w-6 h-6 text-[#D96B78]" />}
                {idx === 3 && <Sparkles className="w-6 h-6 text-[#C87D53]" />}
              </div>
              <h3 className="font-serif font-bold text-base text-[#3D2723]">{item.title}</h3>
              <p className="text-xs text-[#5A4038] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-md border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="Ambiente Rústico de la Pastelería"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 text-white">
              <div>
                <p className="font-serif font-bold text-sm">Rincón Rústico Café & Postres</p>
                <p className="text-[10px] text-white/80">Luz natural y mesas de madera reciclada</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-md border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Muro Fotogénico Floral"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 text-white">
              <div>
                <p className="font-serif font-bold text-sm">Muro Floral & Neón 📸</p>
                <p className="text-[10px] text-white/80">El spot ideal para tus fotos de Instagram</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-md border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
              alt="Café de Especialidad y Postre"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 text-white">
              <div>
                <p className="font-serif font-bold text-sm">Café de Especialidad ☕</p>
                <p className="text-[10px] text-white/80">Maridaje perfecto para tus rebanadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C87D53] text-white flex items-center justify-center font-bold flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3D2723]">Visítanos en Tienda</h3>
              <p className="text-xs text-[#5A4038] mt-0.5">{STORE_INFO.address}</p>
              <p className="text-[11px] text-[#A65A32] font-semibold mt-1">
                ⏰ {STORE_INFO.hours.weekdays} | {STORE_INFO.hours.sunday}
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hola,%20quisiera%20saber%20cómo%20llegar%20a%20la%20pastelería`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3D2723] hover:bg-[#2B1810] text-white px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Instagram className="w-4 h-4 text-[#C87D53]" />
            <span>Ver fotos en Instagram {STORE_INFO.instagram}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
