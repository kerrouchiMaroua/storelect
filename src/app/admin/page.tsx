'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Package, 
  ShoppingBag, 
  Phone, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  Eye, 
  Search, 
  ArrowLeft, 
  SlidersHorizontal, 
  Activity, 
  Truck, 
  Banknote, 
  Mail, 
  Save, 
  X,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { ProductType } from '@/types';

// Mock Initial Orders for Admin Demo
const INITIAL_ORDERS = [
  {
    id: 'STL-DZ-894120',
    date: '18/08/2026 00:15',
    customerName: 'Karim Benali',
    phone: '0661512133',
    email: 'karim.benali@gmail.com',
    wilaya: '16 - Alger',
    commune: 'Bab Ezzouar',
    address: 'Cité 1200 logts Bât 4',
    deliveryType: 'domicile',
    items: [
      { name: 'Disjoncteur Resi9 16A Schneider', qty: 4, priceDA: 1450 },
      { name: 'Pince 1000V VDE Knipex', qty: 1, priceDA: 9800 }
    ],
    totalDA: 16300,
    status: 'EN_ATTENTE_APPEL', // 'EN_ATTENTE_APPEL' | 'CONFIRME_PAR_TEL' | 'EXPEDIE' | 'LIVRE'
  },
  {
    id: 'STL-DZ-894119',
    date: '17/08/2026 22:40',
    customerName: 'Samir Mansouri',
    phone: '0550123456',
    email: 'samir.mansouri@yahoo.fr',
    wilaya: '31 - Oran',
    commune: 'Bir El Djir',
    address: 'Près du rond-point Pépinière',
    deliveryType: 'stopdesk',
    items: [
      { name: 'Multimètre Fluke 117 True-RMS', qty: 1, priceDA: 68000 }
    ],
    totalDA: 68400,
    status: 'CONFIRME_PAR_TEL',
  },
  {
    id: 'STL-DZ-894118',
    date: '17/08/2026 19:10',
    customerName: 'Youcef Khelifi',
    phone: '0770987654',
    email: 'youcef.electricien@gmail.com',
    wilaya: '25 - Constantine',
    commune: 'Ali Mendjeli',
    address: 'UV 14 bloc 12',
    deliveryType: 'domicile',
    items: [
      { name: 'Coffret WAGO 885 Bornes', qty: 1, priceDA: 34000 },
      { name: 'Câble TITANEX 3G2.5 100m', qty: 2, priceDA: 38000 }
    ],
    totalDA: 110700,
    status: 'EXPEDIE',
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  
  // Products state
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 'prod-1',
      name: 'Disjoncteur Resi9 1P+N 16A Courbe C - Schneider Electric',
      slug: 'schneider-disjoncteur-resi9-1pn-16a-courbe-c',
      sku: 'SCH-R9PFC616',
      priceInCents: 1450,
      stock: 145,
      taxRate: 19,
      lowStockThreshold: 10,
      isPublished: true,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'],
      categoryId: 'tableaux-et-protection',
      description: 'Disjoncteur modulaire peignable Resi9 XE 16A 230V.',
      specification: {
        brand: 'Schneider Electric',
        voltage: '230V AC',
        amperage: '16A',
        ipRating: 'IP20',
        certification: 'NF / CE',
      }
    },
    {
      id: 'prod-4',
      name: 'Multimètre Numérique Électricien Fluke 117 True-RMS',
      slug: 'fluke-117-multimetre-numerique-electricien-true-rms',
      sku: 'FLU-117-EUR',
      priceInCents: 68000,
      stock: 8,
      taxRate: 19,
      lowStockThreshold: 10,
      isPublished: true,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
      categoryId: 'mesure-et-diagnostic',
      description: 'Multimètre professionnel avec détection de tension sans contact.',
      specification: {
        brand: 'Fluke',
        voltage: '600V CAT III',
        amperage: '10A',
        ipRating: 'IP42',
        certification: 'CAT III 600V / CE',
      }
    },
    {
      id: 'prod-8',
      name: 'Pince pour Installations Électriques 1000V VDE - Knipex',
      slug: 'knipex-pince-installation-electrique-1000v-vde',
      sku: 'KNP-1386200',
      priceInCents: 9800,
      stock: 45,
      taxRate: 19,
      lowStockThreshold: 10,
      isPublished: true,
      isFeatured: true,
      images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'],
      categoryId: 'outillage-electricien',
      description: 'Pince 6-en-1 multifonction isolée 1000V VDE pour électricien.',
      specification: {
        brand: 'Knipex',
        voltage: '1000V VDE',
        certification: 'DIN EN 60900 / VDE',
      }
    },
  ]);

  // Orders state
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchProduct, setSearchProduct] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'Schneider Electric',
    sku: '',
    priceDA: '',
    stock: '20',
    categoryId: 'tableaux-et-protection',
    voltage: '230V AC',
    amperage: '16A',
    ipRating: 'IP20',
    certification: 'NF / CE',
    imageUrl: '',
    description: '',
  });

  const formatDA = (val: number) => new Intl.NumberFormat('fr-FR').format(val) + ' DA';

  // Handle Add Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.priceDA) {
      alert('Veuillez renseigner le nom et le prix.');
      return;
    }

    const created: ProductType = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: newProduct.sku || `STL-${Math.floor(1000 + Math.random() * 9000)}`,
      priceInCents: parseInt(newProduct.priceDA, 10),
      stock: parseInt(newProduct.stock, 10) || 10,
      taxRate: 19,
      lowStockThreshold: 5,
      isPublished: true,
      isFeatured: true,
      images: [
        newProduct.imageUrl ||
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      ],
      categoryId: newProduct.categoryId,
      description: newProduct.description || 'Matériel électrique certifié conforme aux normes.',
      specification: {
        brand: newProduct.brand,
        voltage: newProduct.voltage,
        amperage: newProduct.amperage,
        ipRating: newProduct.ipRating,
        certification: newProduct.certification,
      },
    };

    setProducts([created, ...products]);
    setIsAddModalOpen(false);
    // Reset form
    setNewProduct({
      name: '',
      brand: 'Schneider Electric',
      sku: '',
      priceDA: '',
      stock: '20',
      categoryId: 'tableaux-et-protection',
      voltage: '230V AC',
      amperage: '16A',
      ipRating: 'IP20',
      certification: 'NF / CE',
      imageUrl: '',
      description: '',
    });
    alert('✅ Produit ajouté avec succès au catalogue Storelect !');
  };

  // Stock quick adjustment
  const handleAdjustStock = (id: string, delta: number) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce produit du catalogue ?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const pendingCallsCount = orders.filter((o) => o.status === 'EN_ATTENTE_APPEL').length;
  const totalRevenueDA = orders.reduce((acc, o) => acc + o.totalDA, 0);

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="border-b border-surface-border bg-surface-dark sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-surface border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voir la boutique</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">
                STORE<span className="text-electric-amber">LECT</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-electric-cyan text-slate-950 font-black uppercase tracking-wider">
                ADMIN DZ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 hidden sm:inline">Connecté en tant que : <strong>Admin Storelect</strong></span>
            <div className="w-2.5 h-2.5 rounded-full bg-electric-volt animate-ping" />
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Appels à Passer (Confirmation)</span>
              <PhoneCall className="w-4 h-4 text-electric-amber" />
            </div>
            <div className="text-2xl font-black text-electric-amber font-mono">{pendingCallsCount}</div>
            <div className="text-[11px] text-slate-500">Clients en attente d'appel téléphonique</div>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Produits au Catalogue</span>
              <Package className="w-4 h-4 text-electric-cyan" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{products.length}</div>
            <div className="text-[11px] text-slate-500">Références actives en vente</div>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Commandes Reçues</span>
              <ShoppingBag className="w-4 h-4 text-electric-volt" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{orders.length}</div>
            <div className="text-[11px] text-slate-500">Transmises à storelect@gmail.com</div>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Chiffre d'Affaires Cash</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{formatDA(totalRevenueDA)}</div>
            <div className="text-[11px] text-slate-500">À encaisser à la livraison (58 Wilayas)</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-surface-border mt-8 pb-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-electric-cyan text-slate-950 shadow-glow-cyan'
                : 'bg-surface text-slate-300 hover:text-white border border-surface-border'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestion des Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-electric-cyan text-slate-950 shadow-glow-cyan'
                : 'bg-surface text-slate-300 hover:text-white border border-surface-border'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Commandes & Confirmations Téléphoniques ({orders.length})</span>
            {pendingCallsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-electric-amber text-slate-950 text-[10px] font-black">
                {pendingCallsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-electric-cyan text-slate-950 shadow-glow-cyan'
                : 'bg-surface text-slate-300 hover:text-white border border-surface-border'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Paramètres Boutique (Contact & 58 Wilayas)</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  placeholder="Rechercher par nom, marque, référence SKU..."
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-surface-border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-electric-amber hover:bg-electric-amber-hover text-slate-950 text-xs font-bold shadow-glow-amber transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Nouveau Produit</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="rounded-xl border border-surface-border bg-surface overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-dark border-b border-surface-border text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Produit</th>
                      <th className="p-3.5">Marque / SKU</th>
                      <th className="p-3.5">Specs Électriques</th>
                      <th className="p-3.5">Prix (DA)</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {products
                      .filter(
                        (p) =>
                          p.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchProduct.toLowerCase()) ||
                          p.specification?.brand?.toLowerCase().includes(searchProduct.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-surface-light/50 transition-colors">
                          <td className="p-3.5 flex items-center gap-3">
                            <img
                              src={product.images[0] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg bg-surface-dark border border-slate-700 flex-shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1">{product.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{product.slug}</div>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-semibold text-electric-amber font-mono">{product.specification?.brand}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{product.sku}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="flex gap-1 flex-wrap">
                              {product.specification?.voltage && (
                                <span className="px-1.5 py-0.5 rounded bg-surface-dark border border-slate-700 text-[10px] text-slate-300 font-mono">
                                  ⚡ {product.specification.voltage}
                                </span>
                              )}
                              {product.specification?.amperage && (
                                <span className="px-1.5 py-0.5 rounded bg-surface-dark border border-slate-700 text-[10px] text-electric-amber font-mono">
                                  🔌 {product.specification.amperage}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-3.5 font-bold font-mono text-white text-sm">
                            {formatDA(product.priceInCents)}
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleAdjustStock(product.id, -1)}
                                className="w-5 h-5 rounded bg-surface-dark border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs"
                              >
                                -
                              </button>
                              <span
                                className={`font-mono font-bold ${
                                  product.stock < 10 ? 'text-electric-amber' : 'text-electric-volt'
                                }`}
                              >
                                {product.stock}
                              </span>
                              <button
                                onClick={() => handleAdjustStock(product.id, 1)}
                                className="w-5 h-5 rounded bg-surface-dark border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-electric-danger hover:bg-surface-dark transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & PHONE CONFIRMATION */}
        {activeTab === 'orders' && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-xl bg-electric-amber/10 border border-electric-amber/30 text-xs text-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-electric-amber flex-shrink-0" />
                <span>
                  <strong>Procédure de validation :</strong> Appelez chaque client au téléphone pour valider l'adresse et le montant avant de confier le colis au livreur.
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl bg-surface border border-surface-border space-y-3"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-surface-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono text-sm">{order.id}</span>
                        <span className="text-xs text-slate-400">({order.date})</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Wilaya : <strong className="text-white">{order.wilaya}</strong> - {order.commune} ({order.address})
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          order.status === 'EN_ATTENTE_APPEL'
                            ? 'bg-electric-amber/20 text-electric-amber border border-electric-amber/40 animate-pulse'
                            : order.status === 'CONFIRME_PAR_TEL'
                            ? 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40'
                            : order.status === 'EXPEDIE'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                            : 'bg-electric-volt/20 text-electric-volt border border-electric-volt/40'
                        }`}
                      >
                        {order.status === 'EN_ATTENTE_APPEL' && '⏳ À Appeler pour Confirmation'}
                        {order.status === 'CONFIRME_PAR_TEL' && '📞 Confirmé par Tél'}
                        {order.status === 'EXPEDIE' && '🚚 Colis Expédié'}
                        {order.status === 'LIVRE' && '✅ Livré & Encaissé'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Customer */}
                    <div className="p-3 bg-surface-dark rounded-lg border border-slate-800 space-y-1">
                      <div className="text-slate-400 font-semibold">Client & Contact :</div>
                      <div className="font-bold text-white">{order.customerName}</div>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:${order.phone}`}
                          className="px-2.5 py-1 rounded bg-electric-amber hover:bg-electric-amber-hover text-slate-950 font-mono font-bold flex items-center gap-1.5 shadow-glow-amber transition-all"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Appeler : {order.phone}</span>
                        </a>
                      </div>
                      <div className="text-[11px] text-slate-400 pt-1">{order.email}</div>
                    </div>

                    {/* Items */}
                    <div className="p-3 bg-surface-dark rounded-lg border border-slate-800 space-y-1">
                      <div className="text-slate-400 font-semibold">Articles commandés :</div>
                      <ul className="space-y-1 text-slate-300">
                        {order.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{it.qty}x {it.name}</span>
                            <span className="font-mono text-white">{formatDA(it.priceDA * it.qty)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Total & Action */}
                    <div className="p-3 bg-surface-dark rounded-lg border border-slate-800 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="text-slate-400 font-semibold">Montant Cash Total :</div>
                        <div className="text-xl font-black text-electric-amber font-mono">
                          {formatDA(order.totalDA)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {order.status === 'EN_ATTENTE_APPEL' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'CONFIRME_PAR_TEL')}
                            className="flex-1 py-1.5 px-2 rounded bg-electric-cyan hover:bg-electric-cyan-hover text-slate-950 font-bold text-xs shadow-glow-cyan transition-all"
                          >
                            Marquer Confirmé
                          </button>
                        )}
                        {order.status === 'CONFIRME_PAR_TEL' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'EXPEDIE')}
                            className="flex-1 py-1.5 px-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs transition-all"
                          >
                            Marquer Expédié
                          </button>
                        )}
                        {order.status === 'EXPEDIE' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'LIVRE')}
                            className="flex-1 py-1.5 px-2 rounded bg-electric-volt hover:bg-electric-volt-hover text-slate-950 font-bold text-xs transition-all"
                          >
                            Marquer Livré & Encaissé
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="mt-6 max-w-2xl bg-surface border border-surface-border rounded-xl p-6 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Paramètres Officiels Storelect Algérie
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Numéro de Téléphone Principal (Appels & Devis)</label>
                <input
                  type="text"
                  defaultValue="0661 51 21 33"
                  className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Adresse E-mail de Réception des Commandes</label>
                <input
                  type="email"
                  defaultValue="storelect@gmail.com"
                  className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Tarif Livraison Domicile (58 Wilayas)</label>
                  <input
                    type="text"
                    defaultValue="700 DA"
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tarif Livraison Bureau Stop Desk</label>
                  <input
                    type="text"
                    defaultValue="400 DA"
                    className="w-full p-2.5 bg-surface-dark border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Paramètres sauvegardés avec succès.')}
              className="px-4 py-2 rounded-lg bg-electric-cyan text-slate-950 font-bold text-xs shadow-glow-cyan"
            >
              Enregistrer les Paramètres
            </button>
          </div>
        )}
      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-surface-dark border border-surface-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-surface-border flex items-center justify-between bg-surface">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-electric-amber" />
                <h3 className="text-sm font-bold text-white">Ajouter un Nouveau Produit au Catalogue</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Nom */}
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Nom du Produit *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Disjoncteur 20A 1P+N Schneider Electric"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Marque */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Marque Constructeur *</label>
                  <select
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white focus:border-electric-cyan focus:outline-none"
                  >
                    <option value="Schneider Electric">Schneider Electric</option>
                    <option value="Legrand">Legrand</option>
                    <option value="Fluke">Fluke</option>
                    <option value="Knipex">Knipex</option>
                    <option value="WAGO">WAGO</option>
                    <option value="Wiha">Wiha</option>
                    <option value="Bosch Professional">Bosch Professional</option>
                    <option value="Hager">Hager</option>
                    <option value="Nexans">Nexans</option>
                    <option value="Chauvin Arnoux">Chauvin Arnoux</option>
                    <option value="Autre">Autre Marque</option>
                  </select>
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Référence Fabricant (SKU)</label>
                  <input
                    type="text"
                    placeholder="Ex: SCH-R9PFC620"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white font-mono focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Prix en DA */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Prix de Vente en Dinars (DA) *</label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 2400"
                    value={newProduct.priceDA}
                    onChange={(e) => setNewProduct({ ...newProduct, priceDA: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white font-mono font-bold focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quantité en Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white font-mono focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Catégorie</label>
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white focus:border-electric-cyan focus:outline-none"
                  >
                    <option value="tableaux-et-protection">Tableaux & Protection</option>
                    <option value="mesure-et-diagnostic">Mesure & Diagnostic</option>
                    <option value="outillage-electricien">Outillage Spécialisé</option>
                    <option value="cablage-et-raccordement">Câblage & Raccordement</option>
                    <option value="appareillage-domotique">Domotique & Connecté</option>
                  </select>
                </div>

                {/* Tension */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tension Électrique</label>
                  <input
                    type="text"
                    placeholder="Ex: 230V AC / 400V Triphasé"
                    value={newProduct.voltage}
                    onChange={(e) => setNewProduct({ ...newProduct, voltage: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white font-mono focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Courant In */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ampérage / Calibre</label>
                  <input
                    type="text"
                    placeholder="Ex: 16A, 32A, 63A"
                    value={newProduct.amperage}
                    onChange={(e) => setNewProduct({ ...newProduct, amperage: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white font-mono focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Indice IP */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Indice IP</label>
                  <input
                    type="text"
                    placeholder="Ex: IP20, IP65"
                    value={newProduct.ipRating}
                    onChange={(e) => setNewProduct({ ...newProduct, ipRating: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white font-mono focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* URL Image */}
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Lien de la Photo (URL Web)</label>
                  <input
                    type="text"
                    placeholder="Ex: https://images.unsplash.com/... ou /products/mon-outil.jpg"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Description Technique</label>
                  <textarea
                    rows={3}
                    placeholder="Détails du produit, normes, conformité..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full p-2.5 bg-surface border border-slate-700 rounded-lg text-white text-xs focus:border-electric-cyan focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-surface hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-electric-amber hover:bg-electric-amber-hover text-slate-950 font-bold text-xs shadow-glow-amber transition-all"
                >
                  Enregistrer le Produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
