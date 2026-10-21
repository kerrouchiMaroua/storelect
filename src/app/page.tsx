'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { Header } from '@/components/storefront/Header';

import { HeroBanner } from '@/components/storefront/HeroBanner';

import { ProductCard } from '@/components/storefront/ProductCard';

import { TechSpecsModal } from '@/components/storefront/TechSpecsModal';

import { CartDrawer } from '@/components/storefront/CartDrawer';

import { ProductType, CartItemType } from '@/types';

import {

  SlidersHorizontal,

  ShieldAlert,

  Gauge,

  Wrench,

  Cable,

  Cpu,

  Filter,

  RotateCcw,

  ArrowUpDown,

  Phone,

  Truck,

  Banknote

} from 'lucide-react';

const CATEGORIES = [

  { id: 'all', name: 'Tous les produits', icon: SlidersHorizontal },

  { id: 'tableaux-et-protection', name: 'Tableaux & Disjoncteurs', icon: ShieldAlert },

  { id: 'mesure-et-diagnostic', name: 'Mesure Fluke & Diagnostic', icon: Gauge },

  { id: 'outillage-electricien', name: 'Outillage Knipex 1000V', icon: Wrench },

  { id: 'cablage-et-raccordement', name: 'Câblage & Bornes Wago', icon: Cable },

  { id: 'appareillage-domotique', name: 'Domotique & Connecté', icon: Cpu },

];

export default function StorefrontPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        setProductsError(null);

        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error);
        setProductsError('Impossible de charger les produits. Réessayez plus tard.');
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // State

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [selectedVoltages, setSelectedVoltages] = useState<string[]>([]);

  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const [isProMode, setIsProMode] = useState<boolean>(false);

  // Cart & Modals

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [inspectingProduct, setInspectingProduct] = useState<ProductType | null>(null);

  // Cart operations

  const handleAddToCart = (product: ProductType) => {

    setCartItems((prev) => {

      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {

        return prev.map((item) =>

          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item

        );

      }

      return [...prev, { product, quantity: 1 }];

    });

    setIsCartOpen(true);

  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {

    if (quantity <= 0) {

      handleRemoveItem(productId);

      return;

    }

    setCartItems((prev) =>

      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))

    );

  };

  const handleRemoveItem = (productId: string) => {

    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));

  };

  // Toggle helpers

  const toggleBrand = (brand: string) => {

    setSelectedBrands((prev) =>

      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]

    );

  };

  const toggleVoltage = (voltage: string) => {

    setSelectedVoltages((prev) =>

      prev.includes(voltage) ? prev.filter((v) => v !== voltage) : [...prev, voltage]

    );

  };

  const resetFilters = () => {

    setSelectedCategory('all');

    setSearchQuery('');

    setSelectedBrands([]);

    setSelectedVoltages([]);

    setOnlyInStock(false);

  };

  // Filtered Products Calculation

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      // Category filter

      if (selectedCategory !== 'all' && product.category?.slug !== selectedCategory) {

        return false;

      }

      // Search query filter

      if (searchQuery.trim()) {

        const q = searchQuery.toLowerCase();

        const matchName = product.name.toLowerCase().includes(q);

        const matchSku = product.sku.toLowerCase().includes(q);

        const matchBrand = product.specification?.brand?.toLowerCase().includes(q);

        const matchDesc = product.description.toLowerCase().includes(q);

        if (!matchName && !matchSku && !matchBrand && !matchDesc) return false;

      }

      // Brand filter

      if (selectedBrands.length > 0) {

        const brand = product.specification?.brand;

        if (!brand || !selectedBrands.includes(brand)) return false;

      }

      // Voltage filter

      if (selectedVoltages.length > 0) {

        const voltage = product.specification?.voltage || '';

        const hasMatch = selectedVoltages.some((v) => voltage.includes(v));

        if (!hasMatch) return false;

      }

      // Stock filter

      if (onlyInStock && product.stock <= 0) {

        return false;

      }

      return true;

    }).sort((a, b) => {

      if (sortBy === 'price-asc') return a.priceInCents - b.priceInCents;

      if (sortBy === 'price-desc') return b.priceInCents - a.priceInCents;

      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);

    });

  }, [products, selectedCategory, searchQuery, selectedBrands, selectedVoltages, onlyInStock, sortBy]);

  // Unique brands & voltages from dataset for filter sidebar

  const allBrands = useMemo(() => {

    const brands = new Set<string>();

    products.forEach((p) => {

      if (p.specification?.brand) brands.add(p.specification.brand);

    });

    return Array.from(brands);

  }, [products]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (

    <div className="min-h-screen flex flex-col bg-background">

      {/* Header */}

      <Header

        cartCount={totalCartCount}

        onOpenCart={() => setIsCartOpen(true)}

        isProMode={isProMode}

        onToggleProMode={() => setIsProMode(!isProMode)}

        searchQuery={searchQuery}

        onSearchChange={setSearchQuery}

      />

      {/* Hero Section */}

      <HeroBanner onSelectCategory={(slug) => setSelectedCategory(slug)} />

      {/* Reassurance Bar DZ */}

      <div className="bg-surface border-b border-surface-border py-3 px-4">

        <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center gap-4 text-xs">

          <div className="flex items-center gap-2 text-slate-300">

            <Truck className="w-4 h-4 text-electric-cyan" />

            <span>Livraison <strong>58 Wilayas</strong> (24h-72h)</span>

          </div>

          <div className="flex items-center gap-2 text-slate-300">

            <Banknote className="w-4 h-4 text-electric-volt" />

            <span>Paiement <strong>en Espèces à la Livraison</strong></span>

          </div>

          <div className="flex items-center gap-2 text-slate-300">

            <Phone className="w-4 h-4 text-electric-amber" />

            <span>Commandes par Tél : <strong className="font-mono text-white">0661 51 21 33</strong></span>

          </div>

        </div>

      </div>

      {/* Category Pills Bar */}

      <div className="border-b border-surface-border bg-surface-dark sticky top-16 z-30">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">

          {CATEGORIES.map((cat) => {

            const Icon = cat.icon;

            const isSelected = selectedCategory === cat.id;

            return (

              <button

                key={cat.id}

                onClick={() => setSelectedCategory(cat.id)}

                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${isSelected

                  ? 'bg-electric-cyan text-slate-950 shadow-glow-cyan'

                  : 'bg-surface text-slate-300 hover:text-white hover:bg-surface-light border border-surface-border'

                  }`}

              >

                <Icon className="w-3.5 h-3.5" />

                <span>{cat.name}</span>

              </button>

            );

          })}

        </div>

      </div>

      {/* Main Catalog Body */}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Filter Sidebar */}

          <aside className="lg:col-span-1 space-y-6">

            <div className="glass-panel p-5 rounded-2xl border border-surface-border space-y-6 sticky top-32">

              <div className="flex items-center justify-between pb-3 border-b border-surface-border">

                <div className="flex items-center gap-2 text-sm font-bold text-white">

                  <Filter className="w-4 h-4 text-electric-cyan" />

                  <span>Filtres Spécialisés</span>

                </div>

                <button

                  onClick={resetFilters}

                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-electric-amber transition-colors"

                >

                  <RotateCcw className="w-3 h-3" />

                  <span>Effacer</span>

                </button>

              </div>

              {/* Filter: Stock */}

              <div className="space-y-2">

                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">

                  <input

                    type="checkbox"

                    checked={onlyInStock}

                    onChange={(e) => setOnlyInStock(e.target.checked)}

                    className="w-4 h-4 rounded border-slate-700 bg-surface-dark text-electric-cyan focus:ring-electric-cyan"

                  />

                  <span>En stock immédiatement uniquement</span>

                </label>

              </div>

              {/* Filter: Brands */}

              <div className="space-y-2.5">

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">

                  Marques Disponibles en Algérie

                </h4>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">

                  {allBrands.map((brand) => (

                    <label

                      key={brand}

                      className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer select-none p-1 rounded hover:bg-surface-light"

                    >

                      <span className="flex items-center gap-2">

                        <input

                          type="checkbox"

                          checked={selectedBrands.includes(brand)}

                          onChange={() => toggleBrand(brand)}

                          className="w-3.5 h-3.5 rounded border-slate-700 bg-surface-dark text-electric-cyan focus:ring-electric-cyan"

                        />

                        <span>{brand}</span>

                      </span>

                    </label>

                  ))}

                </div>

              </div>

              {/* Filter: Technical Voltage */}

              <div className="space-y-2.5">

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">

                  Tension de Service

                </h4>

                <div className="flex flex-wrap gap-1.5">

                  {['230V', '400V', '18V', '1000V'].map((volt) => {

                    const isChecked = selectedVoltages.includes(volt);

                    return (

                      <button

                        key={volt}

                        onClick={() => toggleVoltage(volt)}

                        className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-all ${isChecked

                          ? 'bg-electric-amber text-slate-950 border-electric-amber font-bold'

                          : 'bg-surface-dark text-slate-300 border-slate-800 hover:border-slate-700'

                          }`}

                      >

                        {volt}

                      </button>

                    );

                  })}

                </div>

              </div>

              {/* Pro Box */}

              <div className="p-3.5 rounded-xl bg-gradient-to-br from-surface-light to-surface border border-electric-amber/30 text-xs space-y-2">

                <div className="font-bold text-electric-amber flex items-center gap-1.5">

                  <span>⚡ Électriciens & Entreprises</span>

                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">

                  Bénéficiez de <strong>-15% de remise</strong> sur vos commandes en gros et factures avec registre de commerce.

                </p>

                <div className="text-[11px] text-electric-cyan font-mono font-bold">

                  📞 0661 51 21 33

                </div>

              </div>

            </div>

          </aside>

          {/* Products Grid Section */}

          <div className="lg:col-span-3 space-y-6">

            {/* Top Toolbar */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-surface-border">

              <div className="text-sm text-slate-300">

                Affichage de <span className="font-bold text-white font-mono">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}

              </div>

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-2 text-xs text-slate-400">

                  <ArrowUpDown className="w-3.5 h-3.5 text-electric-cyan" />

                  <span>Trier par :</span>

                </div>

                <select

                  value={sortBy}

                  onChange={(e) => setSortBy(e.target.value as any)}

                  className="bg-surface-dark border border-surface-border rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-electric-cyan cursor-pointer"

                >

                  <option value="featured">Sélection Pro (Vedettes)</option>

                  <option value="price-asc">Prix : Moins cher au plus cher (DA)</option>

                  <option value="price-desc">Prix : Plus cher au moins cher (DA)</option>

                </select>

              </div>

            </div>

            {/* Grid */}

            {isLoadingProducts ? (
              <div className="glass-panel p-12 text-center rounded-2xl border border-surface-border text-slate-300">
                Chargement des produits...
              </div>
            ) : productsError ? (
              <div className="glass-panel p-12 text-center rounded-2xl border border-surface-border space-y-4">
                <h3 className="text-lg font-bold text-white">Erreur de chargement</h3>
                <p className="text-sm text-slate-400">{productsError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded-lg bg-electric-cyan text-slate-950 text-xs font-bold"
                >
                  Réessayer
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (

              <div className="glass-panel p-12 text-center rounded-2xl border border-surface-border space-y-4">

                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">

                  <Filter className="w-6 h-6" />

                </div>

                <h3 className="text-lg font-bold text-white">Aucun produit trouvé</h3>

                <p className="text-sm text-slate-400 max-w-md mx-auto">

                  Essayez de modifier vos filtres ou de réinitialiser la recherche.

                </p>

                <button

                  onClick={resetFilters}

                  className="px-4 py-2 rounded-lg bg-electric-cyan text-slate-950 text-xs font-bold shadow-glow-cyan"

                >

                  Réinitialiser les filtres

                </button>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {filteredProducts.map((product) => (

                  <ProductCard

                    key={product.id}

                    product={product}

                    onAddToCart={handleAddToCart}

                    onOpenSpecs={(p) => setInspectingProduct(p)}

                    isProMode={isProMode}

                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </main>

      {/* Tech Specs Modal */}

      <TechSpecsModal

        product={inspectingProduct}

        isOpen={!!inspectingProduct}

        onClose={() => setInspectingProduct(null)}

        onAddToCart={handleAddToCart}

        isProMode={isProMode}

      />

      {/* Cart Drawer with 58 Wilayas & COD */}

      <CartDrawer

        isOpen={isCartOpen}

        onClose={() => setIsCartOpen(false)}

        items={cartItems}

        onUpdateQuantity={handleUpdateQuantity}

        onRemoveItem={handleRemoveItem}

        isProMode={isProMode}

      />

    </div>

  );

}

