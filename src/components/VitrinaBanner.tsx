import React from 'react';
import { Store, Clock, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface VitrinaBannerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const VitrinaBanner: React.FC<VitrinaBannerProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const vitrinaProducts = products.filter((p) => p.inVitrina);

  return (
    <section id="vitrina" className="py-12 bg-[#3D2723] text-[#FAF6F0] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C87D53]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C87D53]/30 border border-[#C87D53]/50 text-[#E8DCC4] px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Store className="w-3.5 h-3.5 text-emerald-400" />
              <span>En Vitrina Hoy • Listos para llevar</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Vitrina del Día 🧁✨
            </h2>
            <p className="text-sm text-[#E8DCC4] mt-1 max-w-xl">
              Postres recién horneados e inspeccionados esta mañana. Disponibles para recolección inmediata o envío rápido a domicilio.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#2B1810] px-4 py-2.5 rounded-2xl border border-[#C87D53]/30 text-xs">
            <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div>
              <p className="font-bold text-white">Estado de la Vitrina</p>
              <p className="text-[11px] text-[#E8DCC4]">Surtida y lista para consentirte</p>
            </div>
          </div>
        </div>

        {/* Product Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vitrinaProducts.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-[#2B1810] border border-[#C87D53]/30 rounded-2xl overflow-hidden hover:border-[#C87D53] transition-all flex flex-col group shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#3D2723]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#C87D53]/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Vitrina Hoy
                </div>

                {product.badge && (
                  <div className="absolute top-3 right-3 bg-[#D96B78] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                    {product.badge}
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C87D53] tracking-wider block mb-1">
                    {product.categoryLabel}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif font-bold text-base text-white hover:text-[#C87D53] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#E8DCC4]/80 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#3D2723] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-[#E8DCC4]">Precio</span>
                    <p className="font-serif font-bold text-lg text-white">${product.price} MXN</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-2 rounded-xl bg-[#3D2723] hover:bg-[#C87D53] text-white transition-colors"
                      title="Ver Detalle"
                      id={`vitrina-view-${product.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-2 rounded-xl bg-[#C87D53] hover:bg-[#A65A32] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                      id={`vitrina-add-${product.id}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Pedir Hoy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
