'use client';

import React from 'react';
import { Zap, ShoppingBag, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { ProductType } from '@/types';

interface ProductCardProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
  onOpenSpecs: (product: ProductType) => void;
  isProMode: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenSpecs,
  isProMode,
}) => {
  const spec = product.specification;
  
  // Formatage en Dinars Algériens (DA)
  const formatDA = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' DA';
  };

  const regularPrice = product.priceInCents;
  const proPrice = Math.round(product.priceInCents * 0.85); // 15% de remise artisan/pro
  const currentPrice = isProMode ? proPrice : regularPrice;
  const comparePrice = product.compareAtPriceInCents ? formatDA(product.compareAtPriceInCents) : null;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-surface border border-surface-border hover:border-slate-600 transition-all duration-200 hover:shadow-card-industrial overflow-hidden">
      {/* Brand & Stock Header */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-electric-amber bg-electric-amber/10 px-2 py-0.5 rounded border border-electric-amber/20">
            {spec?.brand || 'Storelect'}
          </span>
          {product.stock > 10 ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-electric-volt">
              <CheckCircle className="w-3 h-3" />
              En stock ({product.stock})
            </span>
          ) : product.stock > 0 ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-electric-amber">
              <AlertTriangle className="w-3 h-3" />
              Reste {product.stock}
            </span>
          ) : (
            <span className="text-[11px] font-medium text-electric-danger">Sur commande</span>
          )}
        </div>

        {/* Product Image */}
        <div className="relative w-full h-44 my-3 rounded-lg overflow-hidden bg-surface-dark flex items-center justify-center border border-surface-border/50 group-hover:border-electric-cyan/30 transition-colors">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          />
          {product.isFeatured && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-electric-cyan text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-glow-cyan">
              Top Vente DZ
            </span>
          )}
          <button
            onClick={() => onOpenSpecs(product)}
            className="absolute bottom-2 right-2 p-2 rounded-lg bg-surface-dark/90 text-slate-300 hover:text-white border border-surface-border hover:border-electric-cyan opacity-0 group-hover:opacity-100 transition-all"
            title="Voir la fiche technique"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* SKU & Title */}
        <div className="text-[10px] font-mono text-slate-500 uppercase">Réf: {product.sku}</div>
        <h3 className="font-bold text-white text-sm line-clamp-2 mt-0.5 group-hover:text-electric-cyan transition-colors">
          {product.name}
        </h3>

        {/* Technical Badges */}
        <div className="flex flex-wrap gap-1.5 my-2.5">
          {spec?.voltage && (
            <span className="badge-tech text-[10px] bg-surface-light text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
              ⚡ {spec.voltage}
            </span>
          )}
          {spec?.amperage && (
            <span className="badge-tech text-[10px] bg-electric-amber/10 text-electric-amber px-1.5 py-0.5 rounded border border-electric-amber/20">
              🔌 {spec.amperage}
            </span>
          )}
          {spec?.ipRating && (
            <span className="badge-tech text-[10px] bg-electric-cyan/10 text-electric-cyan px-1.5 py-0.5 rounded border border-electric-cyan/20">
              🛡️ {spec.ipRating}
            </span>
          )}
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="p-4 pt-2 border-t border-surface-border/60 bg-surface-dark/40 mt-2">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-lg font-black text-white font-mono">
              {formatDA(currentPrice)}
            </div>
            {isProMode && (
              <div className="text-[10px] text-electric-amber font-mono font-semibold">
                Tarif Pro Artisan (-15%)
              </div>
            )}
          </div>
          {comparePrice && !isProMode && (
            <span className="text-xs text-slate-500 line-through font-mono">
              {comparePrice}
            </span>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => onOpenSpecs(product)}
            className="col-span-2 flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-surface-light hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>Fiche</span>
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="col-span-3 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-electric-cyan hover:bg-electric-cyan-hover disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 text-xs font-bold shadow-glow-cyan transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Commander</span>
          </button>
        </div>
      </div>
    </div>
  );
};
