'use client';

import React from 'react';
import { X, ShieldCheck, Zap, Activity, FileText, Banknote, Truck } from 'lucide-react';
import { ProductType } from '@/types';

interface TechSpecsModalProps {
  product: ProductType | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ProductType) => void;
  isProMode: boolean;
}

export const TechSpecsModal: React.FC<TechSpecsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isProMode,
}) => {
  if (!isOpen || !product) return null;

  const spec = product.specification;
  const regularPrice = product.priceInCents;
  const proPrice = Math.round(product.priceInCents * 0.85);
  const currentPrice = isProMode ? proPrice : regularPrice;

  const priceDisplay = new Intl.NumberFormat('fr-FR').format(currentPrice) + ' DA';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-surface-dark border border-surface-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-surface-border bg-surface">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-electric-cyan" />
            <h3 className="text-lg font-bold text-white">Fiche Technique Constructeur</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <div>
            <div className="text-xs font-mono text-electric-amber font-semibold uppercase">
              SKU: {product.sku} | Marque: {spec?.brand || 'Standard'}
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{product.name}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="bg-surface rounded-xl p-4 border border-surface-border space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-electric-cyan" />
              Spécifications Électriques & Mécaniques
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {spec?.voltage && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Tension nominale</div>
                  <div className="font-semibold text-white font-mono">{spec.voltage}</div>
                </div>
              )}
              {spec?.amperage && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Courant (In)</div>
                  <div className="font-semibold text-electric-amber font-mono">{spec.amperage}</div>
                </div>
              )}
              {spec?.curveType && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Courbe de déclenchement</div>
                  <div className="font-semibold text-white font-mono">{spec.curveType}</div>
                </div>
              )}
              {spec?.polesCount && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Nombre de pôles</div>
                  <div className="font-semibold text-white font-mono">{spec.polesCount}</div>
                </div>
              )}
              {spec?.differentialSensitivity && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Sensibilité différentielle</div>
                  <div className="font-semibold text-electric-volt font-mono">{spec.differentialSensitivity}</div>
                </div>
              )}
              {spec?.ipRating && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Indice de protection</div>
                  <div className="font-semibold text-electric-cyan font-mono">{spec.ipRating}</div>
                </div>
              )}
              {spec?.cableCrossSection && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Section de raccordement</div>
                  <div className="font-semibold text-white font-mono">{spec.cableCrossSection}</div>
                </div>
              )}
              {spec?.wattage && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Puissance max</div>
                  <div className="font-semibold text-white font-mono">{spec.wattage}</div>
                </div>
              )}
              {spec?.certification && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Homologation / Normes</div>
                  <div className="font-semibold text-white font-mono">{spec.certification}</div>
                </div>
              )}
              {spec?.warrantyYears && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Garantie constructeur</div>
                  <div className="font-semibold text-white font-mono">{spec.warrantyYears} ans</div>
                </div>
              )}
              {spec?.countryOfOrigin && (
                <div className="p-2.5 rounded-lg bg-surface-dark border border-slate-800">
                  <div className="text-[11px] text-slate-400">Pays d'origine</div>
                  <div className="font-semibold text-white font-mono">{spec.countryOfOrigin}</div>
                </div>
              )}
            </div>
          </div>

          {/* Réassurances Livraison Algérie */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-3 bg-surface-light/50 rounded-lg border border-surface-border text-slate-300">
              <Banknote className="w-5 h-5 text-electric-volt flex-shrink-0" />
              <span>Paiement en espèces à la livraison.</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-surface-light/50 rounded-lg border border-surface-border text-slate-300">
              <Truck className="w-5 h-5 text-electric-cyan flex-shrink-0" />
              <span>Livraison 58 Wilayas en 24h-72h.</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-surface-border bg-surface">
          <div>
            <div className="text-xs text-slate-400">Prix unitaire {isProMode ? 'Tarif Pro' : ''}</div>
            <div className="text-2xl font-black text-white font-mono">{priceDisplay}</div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-light hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-electric-cyan hover:bg-electric-cyan-hover text-slate-950 text-sm font-bold shadow-glow-cyan transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Ajouter au Panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
