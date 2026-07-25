import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, CheckCircle2, Calendar, Clock, MapPin, Truck, Store, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/storeInfo';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('12:00');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isConfirmedModal, setIsConfirmedModal] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee = deliveryType === 'delivery' ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    let message = `¡Hola Pastelería Dulce Delicia! 🎂✨ Quisiera realizar el siguiente pedido:\n\n*PRODUCTOS:*`;

    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${item.product.name}* (x${item.quantity}) - $${item.product.price * item.quantity} MXN`;
      if (item.customization?.dedicationMessage) {
        message += `\n   └ Dedicatoria: "${item.customization.dedicationMessage}"`;
      }
    });

    message += `\n\n*ENTREGA:* ${deliveryType === 'pickup' ? 'Recolección en Tienda 🏪' : 'Envío a Domicilio 🚗'}`;
    if (deliveryType === 'delivery' && address) {
      message += `\n*Dirección:* ${address}`;
    }
    if (orderDate) message += `\n*Fecha:* ${orderDate} (${orderTime})`;
    if (notes) message += `\n*Notas:* ${notes}`;

    message += `\n\n*TOTAL ESTIMADO:* $${total} MXN`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleWebCheckout = () => {
    const code = 'DD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);
    setIsConfirmedModal(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fade-in flex justify-end">
      <div
        className="w-full max-w-md bg-[#FAF6F0] h-full flex flex-col shadow-2xl border-l border-[#E8DCC4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#3D2723] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C87D53] text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Mi Pedido Dulce</h3>
              <p className="text-xs text-[#E8DCC4]">{cartItems.length} postres seleccionados</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2B1810] text-[#E8DCC4] hover:text-white flex items-center justify-center"
            id="cart-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#E8DCC4]/50 flex items-center justify-center text-4xl">
              🧁
            </div>
            <h4 className="font-serif font-bold text-lg text-[#3D2723]">Tu pedido está vacío</h4>
            <p className="text-xs text-[#5A4038] max-w-xs">
              ¡Explora nuestra vitrina del día o catálogo y agrega tus postres artesanales favoritos!
            </p>
            <button
              onClick={onClose}
              className="bg-[#C87D53] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#A65A32] transition-colors"
            >
              Ver Postres Disponibles
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#E8DCC4] flex items-center gap-3 shadow-sm"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-xs text-[#3D2723] truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-xs font-bold text-[#C87D53] mt-0.5">
                      ${item.product.price} MXN
                    </p>

                    {item.customization?.dedicationMessage && (
                      <p className="text-[10px] text-[#A65A32] italic mt-0.5 truncate">
                        "Msg: {item.customization.dedicationMessage}"
                      </p>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-lg bg-[#FAF6F0] text-[#3D2723] font-bold text-xs flex items-center justify-center border border-[#E8DCC4]"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-[#3D2723]">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-lg bg-[#FAF6F0] text-[#3D2723] font-bold text-xs flex items-center justify-center border border-[#E8DCC4]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[#5A4038] hover:text-red-600 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Delivery Choice */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] space-y-3">
              <label className="font-serif font-bold text-xs text-[#3D2723] block">
                Modalidad de Entrega:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    deliveryType === 'pickup'
                      ? 'bg-[#3D2723] text-white border-[#3D2723]'
                      : 'bg-[#FAF6F0] text-[#3D2723] border-[#E8DCC4]'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-[#C87D53]" /> Recoger en Tienda
                </button>

                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    deliveryType === 'delivery'
                      ? 'bg-[#3D2723] text-white border-[#3D2723]'
                      : 'bg-[#FAF6F0] text-[#3D2723] border-[#E8DCC4]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5 text-[#C87D53]" /> Envío a Domicilio
                </button>
              </div>

              {deliveryType === 'delivery' && (
                <input
                  type="text"
                  placeholder="Dirección completa de entrega"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FAF6F0] px-3.5 py-2 rounded-xl text-xs text-[#3D2723] border border-[#E8DCC4]"
                />
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[10px] font-bold text-[#3D2723] block mb-1">Fecha preferida</label>
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="w-full bg-[#FAF6F0] px-2.5 py-1.5 rounded-xl text-xs border border-[#E8DCC4]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#3D2723] block mb-1">Hora estimativa</label>
                  <input
                    type="time"
                    value={orderTime}
                    onChange={(e) => setOrderTime(e.target.value)}
                    className="w-full bg-[#FAF6F0] px-2.5 py-1.5 rounded-xl text-xs border border-[#E8DCC4]"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Notas adicionales para la pastelería..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#FAF6F0] px-3.5 py-2 rounded-xl text-xs text-[#3D2723] border border-[#E8DCC4]"
              />
            </div>

            {/* Total Breakdown */}
            <div className="bg-[#3D2723] text-white p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-[#E8DCC4]">
                <span>Subtotal Postres:</span>
                <span>${subtotal} MXN</span>
              </div>
              <div className="flex justify-between text-[#E8DCC4]">
                <span>Envío:</span>
                <span>{deliveryType === 'delivery' ? `$${deliveryFee} MXN` : 'Gratis en tienda'}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-yellow-300 pt-2 border-t border-white/20">
                <span>Total Estimado:</span>
                <span>${total} MXN</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E8DCC4] space-y-2">
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
              id="cart-whatsapp-btn"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido por WhatsApp 📲</span>
            </button>

            <button
              onClick={handleWebCheckout}
              className="w-full bg-[#3D2723] hover:bg-[#2B1810] text-white py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2"
              id="cart-web-confirm-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C87D53]" />
              <span>Confirmar Registro en Web 📝</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isConfirmedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 border border-[#E8DCC4] shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3D2723]">¡Pedido Registrado con Éxito! 🎉</h3>
            <p className="text-xs text-[#5A4038]">
              Tu folio de pedido es: <strong className="text-[#C87D53] text-sm block mt-1">{orderCode}</strong>
            </p>
            <p className="text-[11px] text-[#5A4038]">
              Nos pondremos en contacto contigo vía WhatsApp o llamada para confirmar los detalles finales y horario de entrega.
            </p>
            <button
              onClick={() => {
                setIsConfirmedModal(false);
                onClearCart();
                onClose();
              }}
              className="w-full bg-[#3D2723] text-white py-2.5 rounded-full font-bold text-xs hover:bg-[#2B1810] transition-colors"
            >
              Entendido 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
