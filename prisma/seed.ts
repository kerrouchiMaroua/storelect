import { PrismaClient, Role, AddressType, OrderStatus, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('⚡ Démarrage du Seed de Storelect...');

  // Nettoyage préalable de la base
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Base de données nettoyée avec succès.');

  // 1. Création des Utilisateurs de Test
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin Storelect',
      email: 'admin@storelect.pro',
      passwordHash: '$2a$12$e9g0Vp...placeholderHashedPasswordAdmin',
      role: Role.ADMIN,
      phone: '+33140000001',
    },
  });

  const proUser = await prisma.user.create({
    data: {
      name: 'Électricité Générale Martinez',
      email: 'pro@martinez-elec.fr',
      passwordHash: '$2a$12$e9g0Vp...placeholderHashedPasswordPro',
      role: Role.PRO,
      companyName: 'SARL MARTINEZ ELEC',
      vatNumber: 'FR84812345678',
      siret: '81234567800019',
      phone: '+33612345678',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      name: 'Thomas Bernard',
      email: 'thomas.bernard@example.com',
      passwordHash: '$2a$12$e9g0Vp...placeholderHashedPasswordCustomer',
      role: Role.CUSTOMER,
      phone: '+33698765432',
    },
  });

  console.log('👤 Utilisateurs créés (Admin, Pro, Particulier).');

  // 2. Création des Catégories & Sous-Catégories
  const catProtection = await prisma.category.create({
    data: {
      name: 'Tableaux & Protection',
      slug: 'tableaux-et-protection',
      description: 'Disjoncteurs modulaires, interrupteurs différentiels, parafoudres et coffrets conformes NF C 15-100.',
      icon: 'ShieldAlert',
      sortOrder: 1,
      subCategories: {
        create: [
          { name: 'Disjoncteurs & Différentiels', slug: 'disjoncteurs-differentiels' },
          { name: 'Parafoudres & Protection Surtension', slug: 'parafoudres-surtension' },
          { name: 'Coffrets & Tableaux Nus', slug: 'coffrets-tableaux' },
        ],
      },
    },
    include: { subCategories: true },
  });

  const catMesure = await prisma.category.create({
    data: {
      name: 'Mesure & Diagnostic',
      slug: 'mesure-et-diagnostic',
      description: 'Multimètres professionnels, testeurs de tension (VAT), caméras thermiques et contrôleurs de terre.',
      icon: 'Gauge',
      sortOrder: 2,
      subCategories: {
        create: [
          { name: 'Multimètres Numériques', slug: 'multimetres-numeriques' },
          { name: 'Contrôleurs d’Installation & Isolement', slug: 'controleurs-installation' },
          { name: 'Pinces Multimétriques', slug: 'pinces-multimetriques' },
        ],
      },
    },
    include: { subCategories: true },
  });

  const catOutillage = await prisma.category.create({
    data: {
      name: 'Outillage Spécialisé Électricien',
      slug: 'outillage-electricien',
      description: 'Pinces isolées 1000V VDE, tournevis dynamométriques, pinces à sertir et électroportatif de chantier.',
      icon: 'Wrench',
      sortOrder: 3,
      subCategories: {
        create: [
          { name: 'Pinces & Outils à Dégainer 1000V', slug: 'pinces-degainage-1000v' },
          { name: 'Tournevis Isolés & Dynamométrie', slug: 'tournevis-isoles' },
          { name: 'Perforateurs & Électroportatif', slug: 'electroportatif' },
        ],
      },
    },
    include: { subCategories: true },
  });

  const catCablage = await prisma.category.create({
    data: {
      name: 'Câblage & Raccordement',
      slug: 'cablage-et-raccordement',
      description: 'Couronnes de câbles industriels, gaines ICTA préfilées, connecteurs rapides et bornes Wago.',
      icon: 'Cable',
      sortOrder: 4,
      subCategories: {
        create: [
          { name: 'Bornes de Raccordement & Wago', slug: 'bornes-wago' },
          { name: 'Câbles Industriels & Domestiques', slug: 'cables-couronnes' },
          { name: 'Gaines & Conduits Préfilés', slug: 'gaines-icta' },
        ],
      },
    },
    include: { subCategories: true },
  });

  const catDomotique = await prisma.category.create({
    data: {
      name: 'Appareillage & Domotique',
      slug: 'appareillage-domotique',
      description: 'Interrupteurs, prises connectées, micromodules Zigbee et gestionnaires d’énergie connectés.',
      icon: 'Cpu',
      sortOrder: 5,
      subCategories: {
        create: [
          { name: 'Packs Connectés & Passerelles', slug: 'packs-connectes' },
          { name: 'Prises & Interrupteurs Haut de Gamme', slug: 'prises-interrupteurs' },
        ],
      },
    },
    include: { subCategories: true },
  });

  console.log('📁 5 Catégories et leurs sous-catégories créées.');

  // 3. Les 15 Produits Réels d'Électricité & Outillage Pro
  const productsData = [
    // 1. Schneider Disjoncteur
    {
      name: 'Disjoncteur Resi9 1P+N 16A Courbe C - Schneider Electric',
      slug: 'schneider-disjoncteur-resi9-1pn-16a-courbe-c',
      sku: 'SCH-R9PFC616',
      barcode: '3606480800047',
      shortDescription: 'Disjoncteur peignable Resi9 XE 16A 230V pour protection des circuits prises et éclairage.',
      description: `Le disjoncteur modulaire Resi9 de Schneider Electric assure la protection contre les courts-circuits et les surcharges électriques selon la norme NF C 15-100. Sa technologie embrochable sans vis permet un raccordement direct sans outil. Idéal pour les installations résidentielles et tertiaires.`,
      priceInCents: 1190, // 11.90 €
      compareAtPriceInCents: 1550,
      costPriceInCents: 620,
      stock: 145,
      isFeatured: true,
      categoryId: catProtection.id,
      subCategoryId: catProtection.subCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
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
        material: 'Thermoplastique auto-extinguible',
      },
    },
    // 2. Legrand Différentiel
    {
      name: 'Interrupteur Différentiel Drivia 63A 30mA Type A - Legrand',
      slug: 'legrand-interrupteur-differentiel-drivia-63a-30ma-type-a',
      sku: 'LEG-411638',
      barcode: '3414970428987',
      shortDescription: 'Interrupteur différentiel 63A 30mA Type A pour circuits spécialisés (plaque induction, borne IRVE, lave-linge).',
      description: `L'interrupteur différentiel Legrand Drivia Type A détecte les défauts à composante alternative et continue. Conforme à la norme NF EN 61008-1, il offre une sécurité absolue pour les appareils électroménagers modernes et les bornes de recharge pour véhicules électriques.`,
      priceInCents: 8990, // 89.90 €
      compareAtPriceInCents: 11900,
      costPriceInCents: 5100,
      stock: 48,
      isFeatured: true,
      categoryId: catProtection.id,
      subCategoryId: catProtection.subCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Legrand',
        modelNumber: '411638',
        voltage: '230V AC',
        amperage: '63A',
        differentialSensitivity: '30mA',
        polesCount: '2P (1P+N)',
        ipRating: 'IP20',
        certification: 'NF / CE',
        warrantyYears: 2,
        countryOfOrigin: 'France',
      },
    },
    // 3. Hager Parafoudre
    {
      name: 'Parafoudre Autoprotégé Type 2 iPRD 40kA - Hager',
      slug: 'hager-parafoudre-autoprotégé-type-2-40ka',
      sku: 'HAG-SPN040D',
      barcode: '3250615512015',
      shortDescription: 'Protection contre les surtensions d’origine atmosphérique avec cartouche débrochable et voyant d’état.',
      description: `Parafoudre modulaire monophasé Hager 40kA avec déconnecteur thermique intégré. Obligatoire dans les départements à risque kéraunique élevé selon la norme NF C 15-100. Cartouche remplaçable avec voyant de fin de vie mécanique.`,
      priceInCents: 14500, // 145.00 €
      compareAtPriceInCents: 18900,
      costPriceInCents: 8900,
      stock: 22,
      isFeatured: false,
      categoryId: catProtection.id,
      subCategoryId: catProtection.subCategories[1].id,
      images: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
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
    // 4. Fluke 117
    {
      name: 'Multimètre Numérique Électricien Fluke 117 True-RMS',
      slug: 'fluke-117-multimetre-numerique-electricien-true-rms',
      sku: 'FLU-117-EUR',
      barcode: '0095969335607',
      shortDescription: 'Multimètre professionnel avec technologie VoltAlert (détection sans contact) et fonction AutoVolt.',
      description: `Le multimètre Fluke 117 est l’outil de référence mondial pour les électriciens professionnels. Équipé du True-RMS pour des mesures précises sur charges non linéaires, d’un rétroéclairage LED blanc et d’une impédance d’entrée faible (LoZ) pour éliminer les tensions fantômes.`,
      priceInCents: 32900, // 329.00 €
      compareAtPriceInCents: 38900,
      costPriceInCents: 21500,
      stock: 35,
      isFeatured: true,
      categoryId: catMesure.id,
      subCategoryId: catMesure.subCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Fluke',
        modelNumber: '117 True-RMS',
        voltage: 'Jusqu’à 600V AC/DC CAT III',
        amperage: '10A continu (20A surcharge 30s)',
        ipRating: 'IP42',
        certification: 'CAT III 600V / CE / UL',
        warrantyYears: 3,
        weightKg: 0.55,
        countryOfOrigin: 'États-Unis',
      },
    },
    // 5. Chauvin Arnoux Contrôleur
    {
      name: 'Contrôleur d’Isolement et Continuité 1000V C.A 6526 - Chauvin Arnoux',
      slug: 'chauvin-arnoux-controleur-isolement-continuite-ca-6526',
      sku: 'CHA-P01140826',
      barcode: '3760171419359',
      shortDescription: 'Mégohmmètre de contrôle selon norme NF C 15-100 avec mesure d’isolement sous 50V à 1000V.',
      description: `Idéal pour la vérification initiale et périodique des installations électriques. Grand afficheur rétroéclairé avec double affichage numérique et bargraphe analogique, alarmes configurables et connexion Bluetooth pour rapports de contrôle.`,
      priceInCents: 74900, // 749.00 €
      compareAtPriceInCents: 85000,
      costPriceInCents: 52000,
      stock: 12,
      isFeatured: true,
      categoryId: catMesure.id,
      subCategoryId: catMesure.subCategories[1].id,
      images: [
        'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Chauvin Arnoux',
        modelNumber: 'C.A 6526',
        voltage: 'Test 50V / 100V / 250V / 500V / 1000V',
        ipRating: 'IP54',
        certification: 'CAT IV 600V / CE / NF EN 61557',
        warrantyYears: 2,
        weightKg: 0.70,
        countryOfOrigin: 'France',
      },
    },
    // 6. Pince Ampèremétrique Fluke 376
    {
      name: 'Pince Ampèremétrique Fluke 376 FC True-RMS avec Sonde iFlex',
      slug: 'fluke-376-fc-pince-amperemetrique-true-rms-iflex',
      sku: 'FLU-376-FC',
      barcode: '0095969792011',
      shortDescription: 'Pince multimètre industrielle 1000A AC/DC et sonde souple iFlex 2500A avec connectivité sans-fil Fluke Connect.',
      description: `La Fluke 376 FC offre des capacités de mesure étendues dans les environnements industriels sévères. La sonde de courant souple iFlex incluse permet de mesurer facilement les conducteurs encombrés et les barres omnibus jusqu'à 2500A AC.`,
      priceInCents: 62900, // 629.00 €
      compareAtPriceInCents: 71000,
      costPriceInCents: 43000,
      stock: 18,
      isFeatured: false,
      categoryId: catMesure.id,
      subCategoryId: catMesure.subCategories[2].id,
      images: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Fluke',
        modelNumber: '376 FC',
        voltage: '1000V AC/DC',
        amperage: '1000A (Pince) / 2500A (iFlex)',
        ipRating: 'IP42',
        certification: 'CAT IV 600V / CAT III 1000V',
        warrantyYears: 3,
        weightKg: 0.40,
        countryOfOrigin: 'États-Unis',
      },
    },
    // 7. Knipex ErgoStrip
    {
      name: 'Outil Universel à Dégainer ErgoStrip 16 95 01 SB - Knipex',
      slug: 'knipex-ergostrip-outil-universel-degainer-denuder',
      sku: 'KNP-169501SB',
      barcode: '4003773079927',
      shortDescription: 'Outil de dégainage rapide et précis pour tous câbles ronds, coaxiaux et paires torsadées de 0.2 à 4.0 mm².',
      description: `Conception ergonomique en forme de pistolet pour faciliter le dégainage, la découpe longitudinale et le dénudage des gaines de câbles dans les boîtes d'encastrement profondes. Lames affûtées avec précision en acier trempé de Solingen.`,
      priceInCents: 3850, // 38.50 €
      compareAtPriceInCents: 4690,
      costPriceInCents: 2100,
      stock: 85,
      isFeatured: true,
      categoryId: catOutillage.id,
      subCategoryId: catOutillage.subCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Knipex',
        modelNumber: '16 95 01 SB',
        cableCrossSection: '0.2 à 4.0 mm² (Câble rond Ø 8.0-13.0 mm)',
        certification: 'Made in Germany',
        warrantyYears: 5,
        weightKg: 0.08,
        countryOfOrigin: 'Allemagne',
      },
    },
    // 8. Pince Knipex VDE 13 86 200
    {
      name: 'Pince pour Installations Électriques 1000V VDE 13 86 200 - Knipex',
      slug: 'knipex-pince-installation-electrique-1000v-vde-1386200',
      sku: 'KNP-1386200',
      barcode: '4003773075097',
      shortDescription: 'Pince multifonction 6-en-1 : préhension, cintrage, ébavurage, coupe de câbles, dénudage et sertissage.',
      description: `Isolation VDE 1000V avec poignées bi-matière conforme à la norme IEC 60900. Permet de couper le câble cuivre/aluminium jusqu'à Ø 15 mm (5x2.5 mm²) et de dénuder les conducteurs de 0.75 à 2.5 mm².`,
      priceInCents: 5490, // 54.90 €
      compareAtPriceInCents: 6500,
      costPriceInCents: 3200,
      stock: 60,
      isFeatured: true,
      categoryId: catOutillage.id,
      subCategoryId: catOutillage.subCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Knipex',
        modelNumber: '13 86 200',
        voltage: 'Isolé 1000V AC / 1500V DC',
        cableCrossSection: '0.75 - 1.5 - 2.5 mm²',
        certification: 'DIN EN 60900 / VDE / GS',
        warrantyYears: 10,
        weightKg: 0.28,
        countryOfOrigin: 'Allemagne',
      },
    },
    // 9. Coffret Wiha Tournevis
    {
      name: 'Coffret 16 Outils Tournevis Isolés slimVario 1000V - Wiha',
      slug: 'wiha-coffret-16-tournevis-isoles-slimvario-1000v',
      sku: 'WIH-41231',
      barcode: '4010995412319',
      shortDescription: 'Jeu de lames slimBit interchangeables minces 1000V avec poignée SoftFinish et testeur de phase.',
      description: `Le système Wiha slimVario permet d'accéder sans effort aux vis et ressorts situés en profondeur dans les disjoncteurs et borniers. Testé individuellement à 10 000 V AC et homologué pour 1 000 V AC selon IEC 60900.`,
      priceInCents: 7990, // 79.90 €
      compareAtPriceInCents: 9800,
      costPriceInCents: 4400,
      stock: 40,
      isFeatured: false,
      categoryId: catOutillage.id,
      subCategoryId: catOutillage.subCategories[1].id,
      images: [
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Wiha',
        modelNumber: 'slimVario 41231',
        voltage: 'Isolé 1000V AC / VDE',
        certification: 'IEC 60900 / DIN EN 60900',
        warrantyYears: 5,
        weightKg: 0.65,
        countryOfOrigin: 'Allemagne',
      },
    },
    // 10. Perforateur Bosch Pro
    {
      name: 'Perforateur Sans Fil SDS-Plus GBH 18V-26 Professional - Bosch Pro',
      slug: 'bosch-pro-perforateur-sans-fil-sds-plus-gbh-18v-26',
      sku: 'BOS-0611909001',
      barcode: '3165140807890',
      shortDescription: 'Perforateur burineur 18V Brushless avec force de frappe de 2.6 J et protection KickBack Control anti-blocage.',
      description: `Le perforateur universel pour les travaux d'installation électrique quotidiens (percement pour passages de câbles, scellements de boîtes). Moteur sans charbon EC puissant et système de contrôle électronique de recul KickBack Control pour préserver les poignets.`,
      priceInCents: 26900, // 269.00 €
      compareAtPriceInCents: 32000,
      costPriceInCents: 17500,
      stock: 25,
      isFeatured: true,
      categoryId: catOutillage.id,
      subCategoryId: catOutillage.subCategories[2].id,
      images: [
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Bosch Professional',
        modelNumber: 'GBH 18V-26',
        voltage: '18V Li-Ion',
        wattage: 'Force d’impact 2.6 Joules',
        certification: 'CE / Pro360 Garantie 3 ans',
        warrantyYears: 3,
        weightKg: 3.2,
        countryOfOrigin: 'Allemagne',
      },
    },
    // 11. Wago L-Boxx
    {
      name: 'Coffret L-BOXX Mini 885 Bornes Automatiques Série 221 - WAGO',
      slug: 'wago-coffret-l-boxx-mini-885-bornes-automatiques-221',
      sku: 'WAG-887-952',
      barcode: '4055143378948',
      shortDescription: 'Mallette d’atelier complète contenant 885 connecteurs à leviers 2, 3 et 5 conducteurs (0.14 à 4 mm²).',
      description: `Le coffret ultime pour les électriciens. Les bornes WAGO 221 transparentes permettent le raccordement rapide et sans outil de tous types de conducteurs (souples, rigides, semi-rigides) avec contrôle visuel immédiat de l’insertion.`,
      priceInCents: 18900, // 189.00 €
      compareAtPriceInCents: 22900,
      costPriceInCents: 11500,
      stock: 50,
      isFeatured: true,
      categoryId: catCablage.id,
      subCategoryId: catCablage.subCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'WAGO',
        modelNumber: 'L-Boxx 887-952',
        voltage: '450V AC',
        amperage: '32A',
        cableCrossSection: '0.14 - 4 mm² (souple) / 0.2 - 4 mm² (rigide)',
        certification: 'ENEC / UL / CE',
        warrantyYears: 5,
        weightKg: 2.1,
        countryOfOrigin: 'Allemagne',
      },
    },
    // 12. Câble Nexans Titanex
    {
      name: 'Couronne 100m Câble Industriel Souple TITANEX H07RN-F 3G2.5 - Nexans',
      slug: 'nexans-couronne-100m-cable-industriel-titanex-h07rn-f-3g2-5',
      sku: 'NEX-10048455',
      barcode: '3444450125432',
      shortDescription: 'Câble en élastomère haute résistance mécanique et chimique pour chantiers, événementiel et raccordements extérieurs.',
      description: `Câble référence TITANEX de Nexans à isolation caoutchouc renforcée. Résiste aux hydrocarbures, aux intempéries extrêmes (-25°C à +90°C), aux UV et aux immersions temporaires (AD8). Section 3 conducteurs de 2.5 mm² avec âme en cuivre nu souple classe 5.`,
      priceInCents: 18500, // 185.00 €
      compareAtPriceInCents: 21900,
      costPriceInCents: 12000,
      stock: 30,
      isFeatured: false,
      categoryId: catCablage.id,
      subCategoryId: catCablage.subCategories[1].id,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Nexans',
        modelNumber: 'TITANEX 3G2.5',
        voltage: '450/750V',
        cableCrossSection: '3G2.5 mm² (Phase, Neutre, Terre)',
        ipRating: 'AD8 (Submersible)',
        certification: 'HAR / NF / CE',
        warrantyYears: 5,
        weightKg: 19.5,
        countryOfOrigin: 'France',
      },
    },
    // 13. Gaine Préfilée ICTA
    {
      name: 'Couronne 100m Gaine Préfilée ICTA 20 3G1.5mm² H07V-U - Courant Flex',
      slug: 'gaine-prefilee-icta-20-3g1-5-100m-courant-flex',
      sku: 'COU-PREF20-3G15',
      barcode: '3350120150109',
      shortDescription: 'Gaine annelée fendue préfilée 3 fils 1.5mm² (Bleu, Rouge, Vert/Jaune) pour gain de temps de pose jusqu’à 70%.',
      description: `Gaine anti-écrasement 750N non propagatrice de la flamme avec fils rigides H07V-U déjà tirés en usine. Réduit considérablement le temps de câblage sur les chantiers résidentiels neufs et rénovations lourdes. Conforme NF C 15-100.`,
      priceInCents: 9800, // 98.00 €
      compareAtPriceInCents: 12500,
      costPriceInCents: 5800,
      stock: 40,
      isFeatured: false,
      categoryId: catCablage.id,
      subCategoryId: catCablage.subCategories[2].id,
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Courant',
        modelNumber: 'ICTA 20 Préfilée',
        voltage: '450/750V',
        cableCrossSection: '3G1.5 mm²',
        certification: 'NF C 15-100 / CE',
        warrantyYears: 2,
        weightKg: 10.2,
        countryOfOrigin: 'France',
      },
    },
    // 14. Legrand Céliane with Netatmo
    {
      name: 'Pack de Démarrage Installation Connectée Céliane with Netatmo - Legrand',
      slug: 'legrand-pack-demarrage-celiane-with-netatmo-connecte',
      sku: 'LEG-067700',
      barcode: '3414971004944',
      shortDescription: 'Passerelle Wi-Fi / Zigbee avec prise Control et commande sans fil générale Départ/Arrivée finition Titane.',
      description: `Pilotez votre éclairage, vos appareils électriques et vos volets roulants depuis votre smartphone via l'application Home + Control ou par la voix (Apple HomeKit, Google Assistant, Amazon Alexa). Mesure en temps réel de la consommation électrique instantanée et cumulée.`,
      priceInCents: 13990, // 139.90 €
      compareAtPriceInCents: 16900,
      costPriceInCents: 8900,
      stock: 35,
      isFeatured: true,
      categoryId: catDomotique.id,
      subCategoryId: catDomotique.subCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Legrand',
        modelNumber: '067700',
        voltage: '230V AC',
        amperage: '16A (Prise Control 3680W max)',
        ipRating: 'IP20',
        certification: 'Zigbee 3.0 / CE / NF',
        warrantyYears: 2,
        countryOfOrigin: 'France',
      },
    },
    // 15. Micromodule Schneider Wiser
    {
      name: 'Micromodule Récepteur Éclairage Connecté Wiser Zigbee - Schneider Electric',
      slug: 'schneider-micromodule-eclairage-connecte-wiser-zigbee',
      sku: 'SCH-CCT5011-0001',
      barcode: '3606481977755',
      shortDescription: 'Micromodule encastrable compact pour transformer tout va-et-vient ou bouton poussoir existant en circuit connecté.',
      description: `S'installe discrètement derrière l'interrupteur dans la boîte d'encastrement ou dans une boîte de dérivation. Compatible avec toutes les ampoules LED variables (dimmables) jusqu'à 200W et charges résistives jusqu'à 300W. Compatible passerelle Schneider Wiser et écosystème Zigbee.`,
      priceInCents: 4790, // 47.90 €
      compareAtPriceInCents: 5800,
      costPriceInCents: 2800,
      stock: 70,
      isFeatured: false,
      categoryId: catDomotique.id,
      subCategoryId: catDomotique.subCategories[1].id,
      images: [
        'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      ],
      specs: {
        brand: 'Schneider Electric',
        modelNumber: 'Wiser CCT5011',
        voltage: '230V AC 50Hz',
        wattage: '200W LED / 300W Résistif',
        ipRating: 'IP20',
        certification: 'Zigbee 3.0 / CE',
        warrantyYears: 2,
        countryOfOrigin: 'France',
      },
    },
  ];

  // Insertion des produits et spécifications
  for (const item of productsData) {
    const { specs, ...productFields } = item;
    const createdProduct = await prisma.product.create({
      data: {
        ...productFields,
        specification: {
          create: specs,
        },
      },
    });

    // Ajout d'avis clients réalistes pour les produits phares
    if (createdProduct.isFeatured) {
      await prisma.review.create({
        data: {
          productId: createdProduct.id,
          userId: proUser.id,
          rating: 5,
          title: 'Matériel irréprochable pour chantier pro',
          comment: `Installé sur plusieurs chantiers tertiaires et résidentiels. Qualité de fabrication au rendez-vous, gain de temps considérable lors de la pose. Conforme aux exigences du Consuel sans aucune remarque.`,
          isVerifiedPurchase: true,
          status: 'APPROVED',
          helpfulCount: 8,
        },
      });

      await prisma.review.create({
        data: {
          productId: createdProduct.id,
          userId: customerUser.id,
          rating: 5,
          title: 'Conforme et livraison rapide',
          comment: `Produit d'origine neuf avec facture détaillée mentionnant les références exactes. Parfait pour la mise aux normes de mon tableau électrique.`,
          isVerifiedPurchase: true,
          status: 'APPROVED',
          helpfulCount: 3,
        },
      });
    }
  }

  console.log('⚡ 15 Produits réels insérés avec spécifications techniques et avis clients vérifiés.');
  console.log('✅ Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
