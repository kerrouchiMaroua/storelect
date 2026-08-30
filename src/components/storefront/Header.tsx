'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShoppingBag, ShieldCheck, Truck, Phone, Search, Building2, User, Mail } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  isProMode: boolean;
  onToggleProMode: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  isProMode,
  onToggleProMode,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-surface-dark/95 backdrop-blur-md">
      {/* Top Banner - Réassurances Algérie */}
      <div className="bg-surface border-b border-surface-border text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-slate-400">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-electric-cyan" />
              Livraison Express 58 Wilayas (Domicile / Stop Desk)
            </span>
            <span className="flex items-center gap-1.5 text-electric-volt font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-electric-volt" />
              Paiement à la Livraison (Cash on Delivery)
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="tel:0661512133" 
              className="flex items-center gap-1.5 text-electric-amber hover:underline font-mono font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-electric-amber" />
              0661 51 21 33
            </a>
            <a 
              href="mailto:storelect@gmail.com" 
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              storelect@gmail.com
            </a>
            <button
              onClick={onToggleProMode}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                isProMode
                  ? 'bg-electric-amber text-slate-950 shadow-glow-amber'
                  : 'bg-surface-light text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Building2 className="w-3 h-3" />
              {isProMode ? 'Tarifs Gros Pro (Actifs)' : 'Passer en Tarifs Pro'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-cyan/20 to-electric-amber/20 border border-electric-cyan/40 flex items-center justify-center shadow-glow-cyan">
              <Zap className="w-6 h-6 text-electric-cyan animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white flex items-center">
                STORE<span className="text-electric-amber">LECT</span>
                <span className="text-[10px] ml-1.5 px-1.5 py-0.2 rounded bg-electric-cyan/20 text-electric-cyan font-mono border border-electric-cyan/30">DZ</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest block uppercase">
                Outillage & Matériel Électrique
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher disjoncteur Schneider, multimètre Fluke, câble, pince Knipex..."
                className="w-full pl-10 pr-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-dark hover:bg-surface border border-slate-700 hover:border-electric-amber text-slate-300 hover:text-white text-xs font-semibold transition-all"
            >
              <Building2 className="w-3.5 h-3.5 text-electric-amber" />
              <span className="hidden sm:inline">Espace Admin</span>
            </Link>

            <a
              href="tel:0661512133"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface hover:bg-surface-light border border-surface-border text-electric-amber font-mono font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">0661 51 21 33</span>
            </a>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-cyan hover:bg-electric-cyan-hover text-slate-950 font-bold text-sm shadow-glow-cyan transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline">Panier</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-electric-amber text-slate-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface-dark">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher réf, marque, disjoncteur..."
              className="w-full pl-10 pr-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-cyan"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
