import React, { useState } from 'react';
import { Palette, ChevronRight, ChevronLeft, Check, Sparkles, Send, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';
import confetti from 'canvas-confetti';

interface CustomCakeBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToCart: (customItem: any) => void;
}

const SPONGE_FLAVORS = [
  { id: 'zanahoria', name: 'Zanahoria & Nuez Especiada 🥕', desc: 'Bizcocho súper húmedo rústico con toque de canela' },
  { id: 'redvelvet', name: 'Red Velvet Aterciopelado 🌹', desc: 'Clásico suave con notas finas de cacao' },
  { id: 'vainilla', name: 'Vainilla Real de Madagascar 🌾', desc: 'Esponjoso y aromático con vaina natural' },
  { id: 'chocolate', name: 'Chocolate Belga Intenso 🍫', desc: 'Cacao 70% horneado a la perfección' },
  { id: 'limon', name: 'Limón & Almendras Tostadas 🍋', desc: 'Frescura cítrica con crujiente natural' },
];

const FILLINGS = [
  { id: 'quesomaracuya', name: 'Queso Crema con Coulis de Maracuyá 🟡', price: 0 },
  { id: 'frutosrojos', name: 'Compota Artesanal de Frutos Rojos 🍓', price: 0 },
  { id: 'nutella', name: 'Nutella & Avellanas Tostadas 🌰', price: 40 },
  { id: 'dulcedeleche', name: 'Dulce de Leche Casero al Mezcal 🍯', price: 30 },
  { id: 'pistache', name: 'Crema Fina de Pistache Italiano 🟢', price: 60 },
];

const STYLES = [
  { id: 'seminaked', name: 'Semi-Naked Rústico con Flores Comestibles 🌸', desc: 'Estética rústica moderna muy fotogénica' },
  { id: 'buttercream', name: 'Buttercream Suave Texturizado ✨', desc: 'Acabado liso o espatulado artesanal' },
  { id: 'chocodrip', name: 'Choco-Drip & Toppings de Fruta 🍓', desc: 'Hilos de chocolate fluido y abundantes frutos' },
];

const SIZES = [
  { id: 'small', label: '8 a 10 Personas', basePrice: 480 },
  { id: 'medium', label: '12 a 15 Personas', basePrice: 620 },
  { id: 'large', label: '20 a 25 Personas', basePrice: 880 },
  { id: 'xlarge', label: '30+ Personas (2 o 3 Pisos)', basePrice: 1350 },
];

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({
  isOpen,
  onClose,
  onAddCustomToCart,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [sponge, setSponge] = useState(SPONGE_FLAVORS[0]);
  const [filling, setFilling] = useState(FILLINGS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [dedication, setDedication] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('14:00');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [specialDetails, setSpecialDetails] = useState('');

  if (!isOpen) return null;

  const totalPrice = size.basePrice + filling.price;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSendWhatsApp = () => {
    triggerConfetti();

    const text = `¡Hola Pastelería Dulce Delicia! 🎂✨ Quisiera cotizar/pedir un pastel personalizado:

*DETALLES DEL PASTEL:*
• *Sabor de bizcocho:* ${sponge.name}
• *Relleno:* ${filling.name}
• *Estilo:* ${style.name}
• *Tamaño:* ${size.label}
• *Dedicatoria:* ${dedication || 'Sin mensaje'}
• *Detalles especiales:* ${specialDetails || 'Ninguno'}

*EVENTO & ENTREGA:*
• *Fecha:* ${eventDate || 'Por confirmar'}
• *Hora aproximada:* ${eventTime}
• *Modalidad:* ${deliveryType === 'pickup' ? 'Recolección en Tienda' : 'Envío a Domicilio'}
${deliveryType === 'delivery' ? `• *Dirección:* ${address}` : ''}

*DATOS CLIENTE:*
• *Nombre:* ${clientName || 'Cliente Dulce'}
• *Teléfono:* ${clientPhone || 'WhatsApp'}

*Estimado aproximado:* $${totalPrice} MXN`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    onClose();
  };

  const handleAddToCart = () => {
    triggerConfetti();
    const customProduct = {
      id: `custom-cake-${Date.now()}`,
      name: `Pastel Personalizado (${size.label})`,
      category: 'pasteles',
      categoryLabel: 'Pedido Personalizado',
      price: totalPrice,
      description: `${sponge.name} relleno de ${filling.name} con estilo ${style.name}.`,
      imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      badge: 'Pedido Personalizado 🎨',
      inVitrina: false,
      customization: {
        sponge: sponge.name,
        filling: filling.name,
        style: style.name,
        size: size.label,
        dedicationMessage: dedication,
        eventDate,
        eventTime,
        deliveryType,
        address,
        clientName,
        clientPhone,
      }
    };

    onAddCustomToCart(customProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#FAF6F0] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8DCC4] shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#3D2723] text-white p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C87D53] text-white flex items-center justify-center font-bold shadow">
              🎨
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Diseña tu Pastel Personalizado</h2>
              <p className="text-xs text-[#E8DCC4]">Para celebraciones inolvidables (Pide con 3-5 días de anticipación)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#E8DCC4] hover:text-white text-sm font-bold bg-[#2B1810] px-3 py-1.5 rounded-full"
          >
            Cerrar ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#E8DCC4]/50 p-3 px-6 flex items-center justify-between text-xs font-bold text-[#3D2723]">
          <span className={step >= 1 ? 'text-[#C87D53]' : ''}>1. Bizcocho</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-[#C87D53]' : ''}>2. Relleno & Estilo</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-[#C87D53]' : ''}>3. Tamaño</span>
          <span>→</span>
          <span className={step >= 4 ? 'text-[#C87D53]' : ''}>4. Datos & Confirmación</span>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* STEP 1: SPONGE */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#3D2723] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C87D53]" /> Elige el sabor de tu Bizcocho:
              </h3>
              <div className="space-y-2">
                {SPONGE_FLAVORS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSponge(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      sponge.id === item.id
                        ? 'bg-white border-[#C87D53] shadow-md ring-2 ring-[#C87D53]/20'
                        : 'bg-white/60 border-[#E8DCC4] hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs text-[#3D2723]">{item.name}</p>
                      <p className="text-[11px] text-[#5A4038] mt-0.5">{item.desc}</p>
                    </div>
                    {sponge.id === item.id && (
                      <div className="w-6 h-6 rounded-full bg-[#C87D53] text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: FILLING & STYLE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-base text-[#3D2723] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C87D53]" /> Selecciona el Relleno Artesanal:
                </h3>
                <div className="space-y-2">
                  {FILLINGS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setFilling(item)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        filling.id === item.id
                          ? 'bg-white border-[#C87D53] shadow-md ring-2 ring-[#C87D53]/20'
                          : 'bg-white/60 border-[#E8DCC4] hover:bg-white'
                      }`}
                    >
                      <span className="font-bold text-xs text-[#3D2723]">{item.name}</span>
                      <div className="flex items-center gap-2">
                        {item.price > 0 && (
                          <span className="text-[11px] text-[#A65A32] font-semibold">
                            +${item.price} MXN
                          </span>
                        )}
                        {filling.id === item.id && (
                          <div className="w-5 h-5 rounded-full bg-[#C87D53] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base text-[#3D2723] mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#C87D53]" /> Estilo de Cobertura Rústica:
                </h3>
                <div className="space-y-2">
                  {STYLES.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setStyle(item)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        style.id === item.id
                          ? 'bg-white border-[#C87D53] shadow-md ring-2 ring-[#C87D53]/20'
                          : 'bg-white/60 border-[#E8DCC4] hover:bg-white'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-xs text-[#3D2723]">{item.name}</p>
                        <p className="text-[10px] text-[#5A4038]">{item.desc}</p>
                      </div>
                      {style.id === item.id && (
                        <div className="w-5 h-5 rounded-full bg-[#C87D53] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SIZE */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#3D2723] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C87D53]" /> Porciones & Tamaño del Pastel:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SIZES.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSize(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      size.id === item.id
                        ? 'bg-white border-[#C87D53] shadow-md ring-2 ring-[#C87D53]/20'
                        : 'bg-white/60 border-[#E8DCC4] hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-serif font-bold text-sm text-[#3D2723]">{item.label}</p>
                      <p className="text-xs text-[#A65A32] font-semibold mt-1">Desde ${item.basePrice} MXN</p>
                    </div>
                    {size.id === item.id && (
                      <span className="mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                        ✓ Seleccionado
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Dedication Input */}
              <div className="pt-4 space-y-2">
                <label className="font-serif font-bold text-xs text-[#3D2723]">
                  Mensaje o Dedicatoria en la Placa de Chocolate:
                </label>
                <input
                  type="text"
                  placeholder="Ej. ¡Feliz Cumpleaños Sofia! 🎉"
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="w-full bg-white px-3.5 py-2.5 rounded-2xl text-xs text-[#3D2723] border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-[#C87D53]"
                />
              </div>

              <div className="space-y-2">
                <label className="font-serif font-bold text-xs text-[#3D2723]">
                  Detalles Especiales o Referencia de Colores:
                </label>
                <textarea
                  placeholder="Escribe si quieres tonos rosas, flores de lavanda, libre de nueces, etc."
                  value={specialDetails}
                  onChange={(e) => setSpecialDetails(e.target.value)}
                  rows={2}
                  className="w-full bg-white px-3.5 py-2.5 rounded-2xl text-xs text-[#3D2723] border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-[#C87D53]"
                />
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & DATE */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-[#3D2723] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C87D53]" /> Fecha del Evento & Datos de Contacto:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#3D2723] block mb-1">Fecha del Evento *</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl text-xs text-[#3D2723] border border-[#E8DCC4]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#3D2723] block mb-1">Hora aproximada</label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl text-xs text-[#3D2723] border border-[#E8DCC4]"
                  />
                </div>
              </div>

              {/* Delivery Choice */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#3D2723] block">Modalidad de Entrega</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-[#3D2723] text-white border-[#3D2723]'
                        : 'bg-white text-[#3D2723] border-[#E8DCC4]'
                    }`}
                  >
                    🏪 Recoger en Tienda (Sin Costo)
                  </button>
                  <button
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-[#3D2723] text-white border-[#3D2723]'
                        : 'bg-white text-[#3D2723] border-[#E8DCC4]'
                    }`}
                  >
                    🚗 Envío a Domicilio
                  </button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="text-[11px] font-bold text-[#3D2723] block mb-1">Dirección de Entrega</label>
                  <input
                    type="text"
                    placeholder="Calle, Número, Colonia, Referencias"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl text-xs text-[#3D2723] border border-[#E8DCC4]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#3D2723] block mb-1">Tu Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl text-xs text-[#3D2723] border border-[#E8DCC4]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#3D2723] block mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="10 dígitos"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl text-xs text-[#3D2723] border border-[#E8DCC4]"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-[#3D2723] text-white p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between font-bold border-b border-white/20 pb-2 text-sm">
                  <span>Presupuesto Estimado:</span>
                  <span className="text-yellow-300">${totalPrice} MXN</span>
                </div>
                <p className="text-[11px] text-[#E8DCC4]">
                  • {sponge.name} | Relleno: {filling.name}
                </p>
                <p className="text-[11px] text-[#E8DCC4]">
                  • {style.name} | {size.label}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="p-6 bg-white rounded-b-3xl border-t border-[#E8DCC4] flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-full border border-[#E8DCC4] text-xs font-bold text-[#3D2723] hover:bg-[#FAF6F0] flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-[#C87D53] hover:bg-[#A65A32] text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shadow"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-[#FAF6F0] hover:bg-[#E8DCC4] text-[#3D2723] border border-[#3D2723] px-4 py-2.5 rounded-full text-xs font-bold transition-all"
              >
                Agregar al Carrito 🛒
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                Pedir por WhatsApp 📲
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
