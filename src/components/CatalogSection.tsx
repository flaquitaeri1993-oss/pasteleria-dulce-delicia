import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, Eye, Sparkles, Check } from 'lucide-react';
import { CategoryId, Product } from '../types';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const CATEGORIES: { id: CategoryId; label: string; icon: string }[] = [
  { id: 'all', label: 'Todos los Postres', icon: '✨' },
  { id: 'pasteles', label: 'Pasteles Artesanales', icon: '🎂' },
  { id: 'cheesecakes', label: 'Cheesecakes', icon: '🍰' },
  { id: 'gelatinas', label: 'Gelatinas Creativas 3D', icon: '🍮' },
  { id: 'cupcakes', label: 'Cupcakes Gourmet', icon: '🧁' },
  { id: 'fresas', label: 'Fresas con Chocolate', icon: '🍓' },
  { id: 'vasitos', label: 'Vasitos Dulces', icon: '🍨' },
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = Array.from(
    new Set(products.flatMap((p) => p.tags || []))
  );

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.ingredients && p.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesTag = selectedTag === 'all' || (p.tags && p.tags.includes(selectedTag));

    return matchesCategory && matchesSearch && matchesTag;
  });

  return (
    <section id="catalogo" className="py-16 bg-[#FAF6F0] border-t border-[#E8DCC4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A65A32] bg-[#E8DCC4]/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Nuestra Carta Dulce
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D2723]">
            Catálogo de Postres Artesanales 🎂
          </h2>
          <p className="text-sm sm:text-base text-[#5A4038] mt-2">
            Elaborados diariamente con mantequilla pura, frutas seleccionadas e ingredientes 100% de origen natural.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-[#E8DCC4] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#A65A32] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por postre o ingrediente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF6F0] pl-10 pr-4 py-2.5 rounded-2xl text-xs font-medium text-[#3D2723] focus:outline-none focus:ring-2 focus:ring-[#C87D53] border border-[#E8DCC4]"
                id="catalog-search-input"
              />
            </div>

            {/* Tag Badges */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              <span className="text-xs font-bold text-[#3D2723] flex items-center gap-1 flex-shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#C87D53]" /> Filtro:
              </span>
              <button
                onClick={() => setSelectedTag('all')}
                className={`text-[11px] px-3 py-1.5 rounded-full font-semibold flex-shrink-0 transition-all ${
                  selectedTag === 'all'
                    ? 'bg-[#3D2723] text-white'
                    : 'bg-[#FAF6F0] text-[#5A4038] hover:bg-[#E8DCC4]'
                }`}
              >
                Todos
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[11px] px-3 py-1.5 rounded-full font-semibold flex-shrink-0 transition-all ${
                    selectedTag === tag
                      ? 'bg-[#C87D53] text-white'
                      : 'bg-[#FAF6F0] text-[#5A4038] hover:bg-[#E8DCC4]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#E8DCC4]/50 pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#C87D53] text-white shadow-md shadow-[#C87D53]/20 scale-105'
                    : 'bg-[#FAF6F0] text-[#3D2723] hover:bg-[#E8DCC4]'
                }`}
                id={`catalog-cat-${cat.id}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DCC4]">
            <span className="text-4xl block mb-3">🧁</span>
            <h3 className="font-serif font-bold text-lg text-[#3D2723]">No encontramos postres con tu búsqueda</h3>
            <p className="text-xs text-[#5A4038] mt-1">Prueba quitando los filtros o buscando otra palabra clave.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedTag('all');
              }}
              className="mt-4 bg-[#C87D53] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#A65A32] transition-colors"
            >
              Ver todos los postres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC4] shadow-sm hover:shadow-xl hover:border-[#C87D53] transition-all flex flex-col group"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#3D2723] text-[#FAF6F0] text-[10px] font-bold px-3 py-1 rounded-full shadow">
                      {product.badge}
                    </span>
                  )}

                  {product.inVitrina && (
                    <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                      <Check className="w-3 h-3" /> En Vitrina Hoy
                    </span>
                  )}
                </div>

                {/* Details Container */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#A65A32] mb-1">
                      <span>{product.categoryLabel}</span>
                      {product.portions && <span>{product.portions}</span>}
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif font-bold text-lg text-[#3D2723] hover:text-[#C87D53] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#5A4038] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tag Badges */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.tags.map((t) => (
                          <span
                            key={t}
                            className="bg-[#FAF6F0] text-[#5A4038] text-[10px] font-medium px-2 py-0.5 rounded-md border border-[#E8DCC4]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#E8DCC4] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A65A32] font-semibold block">
                        Precio
                      </span>
                      <p className="font-serif font-bold text-xl text-[#3D2723]">
                        ${product.price} <span className="text-xs font-sans font-normal text-[#5A4038]">MXN</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="p-2.5 rounded-2xl bg-[#FAF6F0] hover:bg-[#E8DCC4] text-[#3D2723] transition-colors"
                        title="Ver Ficha Completa"
                        id={`catalog-view-${product.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-[#C87D53] hover:bg-[#A65A32] text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#C87D53]/20 hover:scale-[1.02] active:scale-95"
                        id={`catalog-add-${product.id}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
