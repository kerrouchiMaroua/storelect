'use client';

import React, { useState, useMemo } from 'react';
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

// Dataset des 15 Produits Électriques Réels en Dinars Algériens (DA)
const INITIAL_PRODUCTS: ProductType[] = [
  {
    id: 'prod-1',
    name: 'Disjoncteur Resi9 1P+N 16A Courbe C - Schneider Electric',
    slug: 'schneider-disjoncteur-resi9-1pn-16a-courbe-c',
    sku: 'SCH-R9PFC616',
    priceInCents: 1450, // 1 450 DA
    compareAtPriceInCents: 1800,
    taxRate: 19,
    stock: 145,
    lowStockThreshold: 10,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'tableaux-et-protection',
    category: { id: 'cat-1', name: 'Tableaux & Protection', slug: 'tableaux-et-protection' },
    description: 'Disjoncteur modulaire peignable Resi9 XE 16A 230V pour protection des circuits prises et éclairage.',
    specification: {
      brand: 'Schneider Electric',
      modelNumber: 'R9PFC616',
      voltage: '230V AC',
      amperage: '16A',
      polesCount: '1P+N',
      curveType: 'Courbe C',
      ipRating: 'IP20',
      certification: 'NF / CE / VDE',
      warrantyYears: 3,
      countryOfOrigin: 'France',
    },
  },
  {
    id: 'prod-2',
    name: 'Interrupteur Différentiel Drivia 63A 30mA Type A - Legrand',
    slug: 'legrand-interrupteur-differentiel-drivia-63a-30ma-type-a',
    sku: 'LEG-411638',
    priceInCents: 13500, // 13 500 DA
    compareAtPriceInCents: 16000,
    taxRate: 19,
    stock: 48,
    lowStockThreshold: 5,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'tableaux-et-protection',
    category: { id: 'cat-1', name: 'Tableaux & Protection', slug: 'tableaux-et-protection' },
    description: 'Interrupteur différentiel 63A 30mA Type A pour circuits spécialisés (climatisation, borne IRVE, machines industrielles).',
    specification: {
      brand: 'Legrand',
      modelNumber: '411638',
      voltage: '230V AC',
      amperage: '63A',
      differentialSensitivity: '30mA',
      polesCount: '1P+N',
      ipRating: 'IP20',
      certification: 'NF / CE',
      warrantyYears: 2,
      countryOfOrigin: 'France',
    },
  },
  {
    id: 'prod-3',
    name: 'Parafoudre Autoprotégé Type 2 iPRD 40kA - Hager',
    slug: 'hager-parafoudre-autoprotégé-type-2-40ka',
    sku: 'HAG-SPN040D',
    priceInCents: 22000, // 22 000 DA
    compareAtPriceInCents: 26500,
    taxRate: 19,
    stock: 22,
    lowStockThreshold: 5,
    isPublished: true,
    isFeatured: false,
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'tableaux-et-protection',
    category: { id: 'cat-1', name: 'Tableaux & Protection', slug: 'tableaux-et-protection' },
    description: 'Protection contre les surtensions d’origine atmosphérique et foudre avec cartouche débrochable et voyant d’état.',
    specification: {
      brand: 'Hager',
      modelNumber: 'SPN040D',
      voltage: '230V / 400V',
      amperage: '40kA (Imax)',
      polesCount: '1P+N',
      ipRating: 'IP20',
      certification: 'NF / CE',
      warrantyYears: 5,
      countryOfOrigin: 'France',
    },
  },
  {
    id: 'prod-4',
    name: 'Multimètre Numérique Électricien Fluke 117 True-RMS',
    slug: 'fluke-117-multimetre-numerique-electricien-true-rms',
    sku: 'FLU-117-EUR',
    priceInCents: 68000, // 68 000 DA
    compareAtPriceInCents: 75000,
    taxRate: 19,
    stock: 35,
    lowStockThreshold: 5,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'mesure-et-diagnostic',
    category: { id: 'cat-2', name: 'Mesure & Diagnostic', slug: 'mesure-et-diagnostic' },
    description: 'Multimètre d’électricien de référence avec détection sans contact VoltAlert et fonction AutoVolt.',
    specification: {
      brand: 'Fluke',
      modelNumber: '117 True-RMS',
      voltage: '600V CAT III',
      amperage: '10A continu',
      ipRating: 'IP42',
      certification: 'CAT III 600V / CE / UL',
      warrantyYears: 3,
      countryOfOrigin: 'États-Unis',
    },
  },
  {
    id: 'prod-5',
    name: 'Contrôleur d’Isolement et Continuité 1000V C.A 6526 - Chauvin Arnoux',
    slug: 'chauvin-arnoux-controleur-isolement-continuite-ca-6526',
    sku: 'CHA-P01140826',
    priceInCents: 145000, // 145 000 DA
    compareAtPriceInCents: 165000,
    taxRate: 19,
    stock: 12,
    lowStockThreshold: 3,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'mesure-et-diagnostic',
    category: { id: 'cat-2', name: 'Mesure & Diagnostic', slug: 'mesure-et-diagnostic' },
    description: 'Mégohmmètre professionnel de contrôle des installations électriques sous 50V à 1000V.',
    specification: {
      brand: 'Chauvin Arnoux',
      modelNumber: 'C.A 6526',
      voltage: '50V à 1000V',
      ipRating: 'IP54',
      certification: 'CAT IV 600V / NF EN 61557',
      warrantyYears: 2,
      countryOfOrigin: 'France',
    },
  },
  {
    id: 'prod-6',
    name: 'Pince Ampèremétrique Fluke 376 FC True-RMS avec Sonde iFlex',
    slug: 'fluke-376-fc-pince-amperemetrique-true-rms-iflex',
    sku: 'FLU-376-FC',
    priceInCents: 125000, // 125 000 DA
    compareAtPriceInCents: 139000,
    taxRate: 19,
    stock: 18,
    lowStockThreshold: 4,
    isPublished: true,
    isFeatured: false,
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'mesure-et-diagnostic',
    category: { id: 'cat-2', name: 'Mesure & Diagnostic', slug: 'mesure-et-diagnostic' },
    description: 'Pince industrielle 1000A AC/DC et sonde souple iFlex 2500A pour armoires et transformateurs.',
    specification: {
      brand: 'Fluke',
      modelNumber: '376 FC',
      voltage: '1000V AC/DC',
      amperage: '1000A / 2500A iFlex',
      ipRating: 'IP42',
      certification: 'CAT IV 600V / CAT III 1000V',
      warrantyYears: 3,
      countryOfOrigin: 'États-Unis',
    },
  },
  {
    id: 'prod-7',
    name: 'Outil Universel à Dégainer ErgoStrip 16 95 01 SB - Knipex',
    slug: 'knipex-ergostrip-outil-universel-degainer-denuder',
    sku: 'KNP-169501SB',
    priceInCents: 6500, // 6 500 DA
    compareAtPriceInCents: 7800,
    taxRate: 19,
    stock: 85,
    lowStockThreshold: 15,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'outillage-electricien',
    category: { id: 'cat-3', name: 'Outillage Spécialisé', slug: 'outillage-electricien' },
    description: 'Dégainage ultra-rapide des câbles ronds, câbles coaxiaux et paires torsadées dans les boîtes d’encastrement.',
    specification: {
      brand: 'Knipex',
      modelNumber: '16 95 01 SB',
      cableCrossSection: '0.2 à 4.0 mm²',
      certification: 'Made in Germany',
      warrantyYears: 5,
      countryOfOrigin: 'Allemagne',
    },
  },
  {
    id: 'prod-8',
    name: 'Pince pour Installations Électriques 1000V VDE 13 86 200 - Knipex',
    slug: 'knipex-pince-installation-electrique-1000v-vde-1386200',
    sku: 'KNP-1386200',
    priceInCents: 9800, // 9 800 DA
    compareAtPriceInCents: 11500,
    taxRate: 19,
    stock: 60,
    lowStockThreshold: 10,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'outillage-electricien',
    category: { id: 'cat-3', name: 'Outillage Spécialisé', slug: 'outillage-electricien' },
    description: 'Pince multifonction 6-en-1 isolée 1000V VDE (coupe, dénudage 0.75-2.5mm², sertissage).',
    specification: {
      brand: 'Knipex',
      modelNumber: '13 86 200',
      voltage: '1000V AC / VDE',
      cableCrossSection: '0.75 à 2.5 mm²',
      certification: 'DIN EN 60900 / VDE',
      warrantyYears: 10,
      countryOfOrigin: 'Allemagne',
    },
  },
  {
    id: 'prod-9',
    name: 'Coffret 16 Tournevis Isolés slimVario 1000V - Wiha',
    slug: 'wiha-coffret-16-tournevis-isoles-slimvario-1000v',
    sku: 'WIH-41231',
    priceInCents: 14500, // 14 500 DA
    compareAtPriceInCents: 17000,
    taxRate: 19,
    stock: 40,
    lowStockThreshold: 8,
    isPublished: true,
    isFeatured: false,
    images: ['https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'outillage-electricien',
    category: { id: 'cat-3', name: 'Outillage Spécialisé', slug: 'outillage-electricien' },
    description: 'Lames minces slimBit 1000V pour accès sans effort aux vis profondes des disjoncteurs.',
    specification: {
      brand: 'Wiha',
      modelNumber: 'slimVario 41231',
      voltage: '1000V AC / VDE',
      certification: 'IEC 60900 / DIN EN 60900',
      warrantyYears: 5,
      countryOfOrigin: 'Allemagne',
    },
  },
  {
    id: 'prod-10',
    name: 'Perforateur Sans Fil SDS-Plus GBH 18V-26 Professional - Bosch Pro',
    slug: 'bosch-pro-perforateur-sans-fil-sds-plus-gbh-18v-26',
    sku: 'BOS-0611909001',
    priceInCents: 52000, // 52 000 DA
    compareAtPriceInCents: 60000,
    taxRate: 19,
    stock: 25,
    lowStockThreshold: 5,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'outillage-electricien',
    category: { id: 'cat-3', name: 'Outillage Spécialisé', slug: 'outillage-electricien' },
    description: 'Moteur Brushless 18V avec force de frappe 2.6 Joules et système de protection KickBack Control.',
    specification: {
      brand: 'Bosch Professional',
      modelNumber: 'GBH 18V-26',
      voltage: '18V Li-Ion',
      wattage: '2.6 Joules',
      certification: 'CE / Pro360',
      warrantyYears: 3,
      countryOfOrigin: 'Allemagne',
    },
  },
  {
    id: 'prod-11',
    name: 'Coffret L-BOXX Mini 885 Bornes Automatiques Série 221 - WAGO',
    slug: 'wago-coffret-l-boxx-mini-885-bornes-automatiques-221',
    sku: 'WAG-887-952',
    priceInCents: 34000, // 34 000 DA
    compareAtPriceInCents: 39000,
    taxRate: 19,
    stock: 50,
    lowStockThreshold: 10,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'cablage-et-raccordement',
    category: { id: 'cat-4', name: 'Câblage & Raccordement', slug: 'cablage-et-raccordement' },
    description: 'Assortiment complet de connecteurs rapides Wago 2, 3 et 5 conducteurs pour conducteurs de 0.14 à 4 mm².',
    specification: {
      brand: 'WAGO',
      modelNumber: 'L-Boxx 887-952',
      voltage: '450V AC',
      amperage: '32A',
      cableCrossSection: '0.14 à 4 mm²',
      certification: 'ENEC / UL / CE',
      warrantyYears: 5,
      countryOfOrigin: 'Allemagne',
    },
  },
  {
    id: 'prod-12',
    name: 'Couronne 100m Câble Industriel Souple TITANEX H07RN-F 3G2.5 - Nexans',
    slug: 'nexans-couronne-100m-cable-industriel-titanex-h07rn-f-3g2-5',
    sku: 'NEX-10048455',
    priceInCents: 38000, // 38 000 DA
    compareAtPriceInCents: 44000,
    taxRate: 19,
    stock: 30,
    lowStockThreshold: 5,
    isPublished: true,
    isFeatured: false,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'cablage-et-raccordement',
    category: { id: 'cat-4', name: 'Câblage & Raccordement', slug: 'cablage-et-raccordement' },
    description: 'Isolation élastomère haute résistance mécanique, chimique et immersion temporaire AD8.',
    specification: {
      brand: 'Nexans',
      modelNumber: 'TITANEX 3G2.5',
      voltage: '450/750V',
      cableCrossSection: '3G2.5 mm²',
      ipRating: 'AD8 (Immersible)',
      certification: 'HAR / NF / CE',
      warrantyYears: 5,
      countryOfOrigin: 'France',
    },
  },
  {
    id: 'prod-13',
    name: 'Couronne 100m Gaine Préfilée ICTA 20 3G1.5mm² - Courant Flex',
    slug: 'gaine-prefilee-icta-20-3g1-5-100m-courant-flex',
    sku: 'COU-PREF20-3G15',
    priceInCents: 18500, // 18 500 DA
    compareAtPriceInCents: 22000,
    taxRate: 19,
    stock: 40,
    lowStockThreshold: 8,
    isPublished: true,
    isFeatured: false,
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'cablage-et-raccordement',
    category: { id: 'cat-4', name: 'Câblage & Raccordement', slug: 'cablage-et-raccordement' },
    description: 'Gaine anti-écrasement 750N préfilée 3 conducteurs H07V-U pour gain de temps de pose jusqu’à 70%.',
    specification: {
      brand: 'Courant',
      modelNumber: 'ICTA 20',
      voltage: '450/750V',
      cableCrossSection: '3G1.5 mm²',
      certification: 'CE',
      warrantyYears: 2,
      countryOfOrigin: 'France',
    },
  },
  {
    id: 'prod-14',
    name: 'Pack Démarrage Céliane with Netatmo Connecté - Legrand',
    slug: 'legrand-pack-demarrage-celiane-with-netatmo-connecte',
    sku: 'LEG-067700',
    priceInCents: 28500, // 28 500 DA
    compareAtPriceInCents: 33000,
    taxRate: 19,
    stock: 35,
    lowStockThreshold: 5,
    isPublished: true,
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'appareillage-domotique',
    category: { id: 'cat-5', name: 'Appareillage & Domotique', slug: 'appareillage-domotique' },
    description: 'Passerelle Wi-Fi / Zigbee avec prise Control 16A et commande générale départ/arrivée.',
    specification: {
      brand: 'Legrand',
      modelNumber: '067700',
      voltage: '230V AC',
      amperage: '16A (3680W max)',
      ipRating: 'IP20',
      certification: 'Zigbee 3.0 / CE / NF',
      warrantyYears: 2,
      countryOfOrigin: 'France',
    },
  },
  {
    id: 'prod-15',
    name: 'Micromodule Récepteur Éclairage Wiser Zigbee - Schneider Electric',
    slug: 'schneider-micromodule-eclairage-connecte-wiser-zigbee',
    sku: 'SCH-CCT5011-0001',
    priceInCents: 9500, // 9 500 DA
    compareAtPriceInCents: 11500,
    taxRate: 19,
    stock: 70,
    lowStockThreshold: 10,
    isPublished: true,
    isFeatured: false,
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'appareillage-domotique',
    category: { id: 'cat-5', name: 'Appareillage & Domotique', slug: 'appareillage-domotique' },
    description: 'Micromodule encastrable pour transformer un va-et-vient en point d’éclairage connecté Zigbee 3.0.',
    specification: {
      brand: 'Schneider Electric',
      modelNumber: 'Wiser CCT5011',
      voltage: '230V AC',
      wattage: '200W LED / 300W Résistif',
      ipRating: 'IP20',
      certification: 'Zigbee 3.0 / CE',
      warrantyYears: 2,
      countryOfOrigin: 'France',
    },
  },
];

const CATEGORIES = [
  { id: 'all', name: 'Tous les produits', icon: SlidersHorizontal },
  { id: 'tableaux-et-protection', name: 'Tableaux & Disjoncteurs', icon: ShieldAlert },
  { id: 'mesure-et-diagnostic', name: 'Mesure Fluke & Diagnostic', icon: Gauge },
  { id: 'outillage-electricien', name: 'Outillage Knipex 1000V', icon: Wrench },
  { id: 'cablage-et-raccordement', name: 'Câblage & Bornes Wago', icon: Cable },
  { id: 'appareillage-domotique', name: 'Domotique & Connecté', icon: Cpu },
];

export default function StorefrontPage() {
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
    return INITIAL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSku = product.sku.toLowerCase().includes(q);
        const matchBrand = product.specification?.brand.toLowerCase().includes(q);
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
  }, [selectedCategory, searchQuery, selectedBrands, selectedVoltages, onlyInStock, sortBy]);

  // Unique brands & voltages from dataset for filter sidebar
  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    INITIAL_PRODUCTS.forEach((p) => {
      if (p.specification?.brand) brands.add(p.specification.brand);
    });
    return Array.from(brands);
  }, []);

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
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
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
                        className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-all ${
                          isChecked
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
            {filteredProducts.length === 0 ? (
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
