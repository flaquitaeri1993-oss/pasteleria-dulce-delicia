/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VitrinaBanner } from './components/VitrinaBanner';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { AssistantChatDrawer } from './components/AssistantChatDrawer';
import { CartDrawer } from './components/CartDrawer';
import { AmbienceGallery } from './components/AmbienceGallery';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { CartItem, Product } from './types';
import { Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    customization?: { dedicationMessage?: string; specialNotes?: string }
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (customization) {
          updated[existingIndex].customization = {
            ...updated[existingIndex].customization,
            ...customization,
          };
        }
        return updated;
      } else {
        return [...prev, { product, quantity, customization }];
      }
    });
  };

  const handleAddCustomToCart = (customProduct: any) => {
    setCartItems((prev) => [
      ...prev,
      {
        product: customProduct,
        quantity: 1,
        customization: {
          dedicationMessage: customProduct.customization?.dedicationMessage,
          specialNotes: `Sabor: ${customProduct.customization?.sponge}, Relleno: ${customProduct.customization?.filling}`,
        },
      },
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3D2723] font-sans antialiased selection:bg-[#C87D53] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Layout */}
      <main id="hero">
        <HeroSection
          onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onNavigateToCatalog={() => handleNavigate('catalogo')}
          onNavigateToVitrina={() => handleNavigate('vitrina')}
        />

        {/* Vitrina del Día Banner */}
        <VitrinaBanner
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* Catalog Section */}
        <CatalogSection
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* Ambiance & Photo Spot Gallery */}
        <AmbienceGallery />

        {/* FAQ Section */}
        <FaqSection onOpenAssistant={() => setIsAssistantOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Floating Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="group relative bg-[#D96B78] hover:bg-[#C87D53] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white"
          id="floating-assistant-btn"
          title="Hablar con Asistente Dulce Delicia"
        >
          <Sparkles className="w-6 h-6 animate-pulse text-yellow-200" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
            ¿Puedo ayudarte? 🍰
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-white animate-ping" />
        </button>
      </div>

      {/* Modals and Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity, customization) => {
          handleAddToCart(product, quantity, customization);
        }}
      />

      <CustomCakeBuilder
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
        onAddCustomToCart={handleAddCustomToCart}
      />

      <AssistantChatDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onOpenCustomBuilder={() => {
          setIsAssistantOpen(false);
          setIsCustomBuilderOpen(true);
        }}
        onNavigateToVitrina={() => {
          setIsAssistantOpen(false);
          handleNavigate('vitrina');
        }}
        onNavigateToCatalog={() => {
          setIsAssistantOpen(false);
          handleNavigate('catalogo');
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
