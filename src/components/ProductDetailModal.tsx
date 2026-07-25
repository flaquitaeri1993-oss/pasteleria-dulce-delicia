import React, { useState } from 'react';
import { X, ShoppingBag, Check, Clock, Users, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, customization?: { dedicationMessage?: string; specialNotes?: string }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [dedicationMessage, setDedicationMessage] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, {
      dedicationMessage: dedicationMessage.trim() || undefined,
      specialNotes: specialNotes.trim() || undefined,
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#FAF6F0] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8DCC4] shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-[#3D2723] flex items-center justify-center shadow hover:bg-white transition-colors"
          id="modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8DCC4] bg-[#3D2723]/80 px-3 py-1 rounded-full mb-2 inline-block">
                {product.categoryLabel}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">{product.name}</h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Quick info row */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#E8DCC4]">
            <div>
              <span className="text-xs text-[#A65A32] font-semibold block">Precio por unidad</span>
              <p className="font-serif text-2xl font-bold text-[#3D2723]">${product.price} MXN</p>
            </div>

            {product.portions && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A4038]">
                <Users className="w-4 h-4 text-[#C87D53]" />
                <span>Rinde: {product.portions}</span>
              </div>
            )}

            {product.prepTime && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A4038]">
                <Clock className="w-4 h-4 text-[#C87D53]" />
                <span>{product.prepTime}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif font-bold text-sm text-[#3D2723] mb-1">Descripción & Sabor</h3>
            <p className="text-xs text-[#5A4038] leading-relaxed">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Ingredients list if present */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-sm text-[#3D2723] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C87D53]" /> Ingredientes Destacados
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-white text-[#3D2723] text-xs px-3 py-1 rounded-xl border border-[#E8DCC4] font-medium"
                  >
                    • {ing}
                  </span>
                ))}
              </div>
            </div>

          )}

          {/* Custom Dedication Message */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] space-y-3">
            <label className="font-serif font-bold text-xs text-[#3D2723] flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#D96B78]" />
              Dedicatoria o Mensaje en la Placa (Opcional):
            </label>
            <input
              type="text"
              placeholder="Ej. ¡Feliz Cumpleaños Mamá! 🎂"
              value={dedicationMessage}
              onChange={(e) => setDedicationMessage(e.target.value)}
              className="w-full bg-[#FAF6F0] px-3.5 py-2 rounded-xl text-xs text-[#3D2723] focus:outline-none focus:ring-2 focus:ring-[#C87D53] border border-[#E8DCC4]"
            />
          </div>

          {/* Quantity and Add Button */}
          <div className="pt-4 border-t border-[#E8DCC4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#E8DCC4]">
              <span className="text-xs font-bold text-[#3D2723]">Cantidad:</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-[#FAF6F0] text-[#3D2723] font-bold text-sm flex items-center justify-center hover:bg-[#E8DCC4]"
              >
                -
              </button>
              <span className="font-serif font-bold text-base text-[#3D2723] w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-[#FAF6F0] text-[#3D2723] font-bold text-sm flex items-center justify-center hover:bg-[#E8DCC4]"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedSuccess}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 text-white shadow-lg ${
                addedSuccess
                  ? 'bg-emerald-600'
                  : 'bg-[#3D2723] hover:bg-[#2B1810] active:scale-95'
              }`}
              id="modal-add-to-cart-btn"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡Agregado al Pedido!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#C87D53]" />
                  <span>Agregar al Pedido • ${(product.price * quantity).toFixed(0)} MXN</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
