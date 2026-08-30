'use client';

import React from 'react';
import { Zap, ShieldCheck, Award, Truck, Phone, ArrowRight, Banknote } from 'lucide-react';

interface HeroBannerProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory }) => {
  return (
    <div className="relative overflow-hidden border-b border-surface-border bg-gradient-to-b from-surface-dark via-surface to-background py-12 md:py-16">
      {/* Background Circuit Grid & Light Glows */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-electric-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-amber/10 border border-electric-amber/30 text-electric-amber text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Vente de Matériel Électrique Professionnel en Algérie 🇩🇿</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              OUTILLAGE & MATÉRIEL ÉLECTRIQUE EN{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-amber via-yellow-400 to-electric-cyan">
                DINARS ALGÉRIENS (DA)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light">
              Disjoncteurs Schneider & Legrand originaux, multimètres professionnels Fluke, outillage 1000V VDE Knipex. <strong>Livraison rapide dans 58 Wilayas avec Paiement Cash à la Réception</strong>.
            </p>

            {/* CTA Quick Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectCategory('tableaux-et-protection')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-electric-amber hover:bg-electric-amber-hover text-slate-950 font-bold text-sm shadow-glow-amber transition-all"
              >
                <span>Voir les Disjoncteurs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:0661512133"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-light hover:bg-surface border border-slate-700 hover:border-electric-cyan text-electric-cyan hover:text-white font-mono font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-electric-amber" />
                <span>Commander au 0661 51 21 33</span>
              </a>
            </div>
          </div>

          {/* Hero Right Badges & Trust Points */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-surface-border">
              <div className="w-9 h-9 rounded-lg bg-electric-volt/10 border border-electric-volt/30 flex items-center justify-center mb-3">
                <Banknote className="w-5 h-5 text-electric-volt" />
              </div>
              <div className="text-sm font-bold text-white">Paiement à la Livraison</div>
              <div className="text-xs text-slate-400 mt-1">Vous ne payez qu'après avoir vérifié votre colis avec le livreur.</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-surface-border">
              <div className="w-9 h-9 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center mb-3">
                <Truck className="w-5 h-5 text-electric-cyan" />
              </div>
              <div className="text-sm font-bold text-white">Livraison 58 Wilayas</div>
              <div className="text-xs text-slate-400 mt-1">Expédition rapide à domicile ou au bureau Stop Desk le plus proche.</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-surface-border">
              <div className="w-9 h-9 rounded-lg bg-electric-amber/10 border border-electric-amber/30 flex items-center justify-center mb-3">
                <Award className="w-5 h-5 text-electric-amber" />
              </div>
              <div className="text-sm font-bold text-white">100% Original</div>
              <div className="text-xs text-slate-400 mt-1">Schneider, Legrand, Fluke, Knipex, Wago certifiés neufs.</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-surface-border">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-sm font-bold text-white">Support & Devis Pro</div>
              <div className="text-xs text-slate-400 mt-1">Contact direct par téléphone ou email : storelect@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
