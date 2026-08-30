'use client';

import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Phone, 
  Banknote, 
  CheckCircle2, 
  Truck, 
  Mail, 
  AlertCircle, 
  Loader2,
  MapPin,
  User,
  Clock
} from 'lucide-react';
import { CartItemType } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  isProMode: boolean;
}

const ALGERIAN_WILAYAS = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna", 
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira", 
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", 
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda", 
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine", 
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla", 
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arreridj", "35 - Boumerdès", 
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", 
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", 
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar", 
  "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt", 
  "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  isProMode,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    wilaya: '16 - Alger',
    commune: '',
    address: '',
    deliveryType: 'domicile', // 'domicile' | 'stopdesk'
    notes: '',
  });

  if (!isOpen) return null;

  const formatDA = (amount: number) => new Intl.NumberFormat('fr-FR').format(amount) + ' DA';

  const subtotalDA = items.reduce((acc, item) => {
    const unitPrice = isProMode
      ? Math.round(item.product.priceInCents * 0.85)
      : item.product.priceInCents;
    return acc + unitPrice * item.quantity;
  }, 0);

  const deliveryFeeDA = formData.deliveryType === 'domicile' ? 700 : 400;
  const totalDA = subtotalDA + (items.length > 0 ? deliveryFeeDA : 0);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        customer: formData,
        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          sku: item.product.sku,
          brand: item.product.specification?.brand,
          quantity: item.quantity,
          priceDA: isProMode ? Math.round(item.product.priceInCents * 0.85) : item.product.priceInCents,
        })),
        subtotalDA,
        deliveryFeeDA,
        totalDA,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setConfirmedOrderId(data.orderId || `STL-DZ-${Date.now().toString().slice(-6)}`);
        setOrderConfirmed(true);
      } else {
        alert(data.error || "Une erreur est survenue lors de l'enregistrement.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion. Veuillez réessayer ou commander directement au 0661 51 21 33.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetOrder = () => {
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-lg bg-surface-dark border-l border-surface-border flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-surface-border flex items-center justify-between bg-surface">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-electric-cyan" />
              <h2 className="text-base font-bold text-white">
                {orderConfirmed ? 'Commande Enregistrée' : isCheckingOut ? 'Informations de Livraison' : `Mon Panier (${items.length})`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          {orderConfirmed ? (
            /* Confirmation Screen with Phone & Email steps */
            <div className="flex-1 p-6 overflow-y-auto space-y-5 text-sm">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-electric-volt/20 border border-electric-volt/40 flex items-center justify-center text-electric-volt shadow-glow-volt mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Commande Envoyée avec Succès !</h3>
                <div className="inline-block px-3 py-1 rounded-full bg-surface-light border border-slate-700 text-xs font-mono text-electric-cyan font-bold">
                  N° Commande : {confirmedOrderId}
                </div>
              </div>

              {/* Étapes claires du processus */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-electric-amber/20 border border-electric-amber/40 flex items-center justify-center text-electric-amber flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">1. Transmission par E-mail</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Votre commande a été envoyée directement à <strong>storelect@gmail.com</strong> et un double à votre adresse <strong>{formData.email}</strong>.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-electric-volt/20 border border-electric-volt/40 flex items-center justify-center text-electric-volt flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">2. Confirmation Téléphonique Obligatoire</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Notre équipe va vous appeler au <strong className="text-electric-amber font-mono">{formData.phone}</strong> pour confirmer votre adresse exacte avant l'envoi du colis.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">3. Expédition & Paiement Cash</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Livraison dans la wilaya de <strong>{formData.wilaya}</strong>. Vous réglez <strong>{formatDA(totalDA)}</strong> en espèces directement au livreur.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Contact */}
                <div className="p-3 bg-surface-dark border border-slate-800 rounded-xl text-center space-y-1 text-xs">
                  <div className="text-slate-400">Une question ou urgence sur votre commande ?</div>
                  <a
                    href="tel:0661512133"
                    className="inline-flex items-center gap-1.5 text-electric-amber font-mono font-bold text-sm hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    0661 51 21 33
                  </a>
                </div>
              </div>

              <button
                onClick={handleResetOrder}
                className="w-full py-3 px-4 rounded-xl bg-electric-cyan hover:bg-electric-cyan-hover text-slate-950 font-bold text-sm shadow-glow-cyan transition-all active:scale-95"
              >
                Retourner à la boutique
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Mandatory Buyer Information Form */
            <form onSubmit={handleOrderSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              <div className="p-3 bg-electric-amber/10 border border-electric-amber/30 rounded-xl text-slate-200 space-y-1">
                <div className="font-bold text-electric-amber flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Informations de Livraison Requises</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  La commande sera envoyée par email à <strong>storelect@gmail.com</strong>. Nous vous appellerons par téléphone pour confirmation avant l'envoi.
                </p>
              </div>

              <div className="space-y-3 bg-surface p-4 rounded-xl border border-surface-border">
                {/* Nom & Prénom */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-electric-cyan" />
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ex: Karim Benali"
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-electric-amber" />
                    Numéro de Téléphone (Pour confirmation d'envoi) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: 0661 XX XX XX / 0550 XX XX XX"
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white text-xs font-mono focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-electric-cyan" />
                    Adresse Email (Pour recevoir la confirmation & facture) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: client@gmail.com"
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Wilaya (58 Wilayas) */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-electric-cyan" />
                    Wilaya de Livraison (58 Wilayas) *
                  </label>
                  <select
                    value={formData.wilaya}
                    onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none cursor-pointer"
                  >
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                {/* Commune */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Commune / Ville *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.commune}
                    onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                    placeholder="Ex: Bab Ezzouar, Hydra, Chéraga, Oran Est..."
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Adresse exacte */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Adresse Complète / Point de repère *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Ex: Cité 500 logts, Bâtiment C, près de la mosquée..."
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Option de livraison */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Option de livraison</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryType: 'domicile' })}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        formData.deliveryType === 'domicile'
                          ? 'border-electric-cyan bg-electric-cyan/10 text-white font-bold'
                          : 'border-slate-800 bg-surface-dark text-slate-400'
                      }`}
                    >
                      <div>🏠 À Domicile</div>
                      <div className="text-[10px] text-slate-400 font-mono">700 DA</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryType: 'stopdesk' })}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        formData.deliveryType === 'stopdesk'
                          ? 'border-electric-cyan bg-electric-cyan/10 text-white font-bold'
                          : 'border-slate-800 bg-surface-dark text-slate-400'
                      }`}
                    >
                      <div>🏢 Bureau Stop Desk</div>
                      <div className="text-[10px] text-slate-400 font-mono">400 DA</div>
                    </button>
                  </div>
                </div>

                {/* Remarques */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Remarques ou instructions (Facultatif)</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ex: Appeler avant 12h, besoin de facture pro..."
                    className="w-full p-2 bg-surface-dark border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Order Summary in Checkout */}
              <div className="p-3.5 rounded-xl bg-surface border border-surface-border space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Sous-total articles :</span>
                  <span className="font-mono text-white">{formatDA(subtotalDA)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Frais de livraison ({formData.deliveryType === 'domicile' ? 'Domicile' : 'Stop Desk'}) :</span>
                  <span className="font-mono text-white">{formatDA(deliveryFeeDA)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total à régler à la livraison :</span>
                  <span className="font-mono text-electric-amber">{formatDA(totalDA)}</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-1/3 py-3 rounded-xl bg-surface-light hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-3 rounded-xl bg-electric-amber hover:bg-electric-amber-hover text-slate-950 font-bold text-xs shadow-glow-amber flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <span>Envoyer la Commande ({formatDA(totalDA)})</span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Items List */
            <>
              <div className="p-3 bg-surface-light/40 border-b border-surface-border text-xs flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-electric-cyan" />
                  Livraison 58 Wilayas
                </span>
                <span className="text-electric-volt font-semibold">Paiement Cash</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <ShoppingBag className="w-12 h-12 text-slate-600 mb-3" />
                    <p className="text-base font-semibold text-slate-300">Votre panier est vide</p>
                    <p className="text-xs text-slate-500 mt-1">Ajoutez des disjoncteurs, câbles ou outils pour commander.</p>
                  </div>
                ) : (
                  items.map((item) => {
                    const unitPrice = isProMode
                      ? Math.round(item.product.priceInCents * 0.85)
                      : item.product.priceInCents;

                    return (
                      <div
                        key={item.product.id}
                        className="flex gap-3 p-3 rounded-xl bg-surface border border-surface-border"
                      >
                        <img
                          src={item.product.images[0] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg bg-surface-dark border border-slate-800"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] font-mono text-electric-amber font-semibold">
                              {item.product.specification?.brand} - Réf: {item.product.sku}
                            </div>
                            <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                              {item.product.name}
                            </h4>
                            <div className="text-xs font-bold text-white font-mono mt-1">
                              {formatDA(unitPrice)}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
                            <div className="flex items-center gap-2 bg-surface-dark px-2 py-0.5 rounded-lg border border-slate-800">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="text-slate-400 hover:text-white p-0.5"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold font-mono text-white px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="text-slate-400 hover:text-white p-0.5"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-slate-500 hover:text-electric-danger transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="p-4 border-t border-surface-border bg-surface space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Total Articles</span>
                    <span className="text-xl font-black text-white font-mono">{formatDA(subtotalDA)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-surface-dark p-2 rounded-lg border border-slate-800">
                    <Banknote className="w-4 h-4 text-electric-volt flex-shrink-0" />
                    <span>Paiement en espèces à la livraison (58 Wilayas)</span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full py-3 px-4 rounded-xl bg-electric-cyan hover:bg-electric-cyan-hover text-slate-950 font-bold text-sm shadow-glow-cyan flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <span>Renseigner mes coordonnées ({formatDA(subtotalDA)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href="tel:0661512133"
                      className="w-full py-2.5 px-4 rounded-xl bg-surface-light hover:bg-slate-700 text-electric-amber font-mono font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Commander directement par Téléphone : 0661 51 21 33</span>
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
