import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Storelect Algérie | Outillage & Matériel Électrique Professionnel",
  description: "Boutique en ligne N°1 en Algérie pour électriciens et artisans. Disjoncteurs Schneider, Legrand, outillage Knipex 1000V, multimètres Fluke. Livraison 58 Wilayas avec Paiement à la Livraison.",
  keywords: ["matériel électrique algérie", "disjoncteur schneider", "fluke algérie", "knipex algérie", "outillage électricien alger", "livraison 58 wilayas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-background text-slate-100 min-h-screen flex flex-col antialiased selection:bg-electric-cyan selection:text-slate-950">
        {children}
        
        {/* Footer */}
        <footer className="border-t border-surface-border bg-surface-dark mt-auto py-12 text-sm text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="text-xl font-black text-white tracking-wider flex items-center">
                STORE<span className="text-electric-amber">LECT</span>
                <span className="text-[11px] ml-2 px-1.5 py-0.5 rounded bg-electric-cyan/20 text-electric-cyan font-mono">DZ</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Leader de la distribution d’outillage et de matériel électrique en Algérie. Matériel 100% original garanti avec livraison rapide sur les 58 wilayas.
              </p>
              <div className="text-xs text-slate-500 font-mono">
                © 2026 Storelect Algérie - Tous droits réservés.
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Normes & Sécurité</h4>
              <ul className="space-y-2 text-xs">
                <li className="hover:text-electric-cyan cursor-pointer">Matériel Conforme Normes Internationales</li>
                <li className="hover:text-electric-cyan cursor-pointer">Outillage Isolé 1000V VDE (IEC 60900)</li>
                <li className="hover:text-electric-cyan cursor-pointer">Garantie Constructeur Officielle</li>
                <li className="hover:text-electric-cyan cursor-pointer">Protection IP & Disjoncteurs Certifiés</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Services Professionnels</h4>
              <ul className="space-y-2 text-xs">
                <li className="hover:text-electric-cyan cursor-pointer">Devis Rapide pour Entreprises & Artisans</li>
                <li className="hover:text-electric-cyan cursor-pointer">Tarifs Spéciaux sur Grandes Quantités</li>
                <li className="hover:text-electric-cyan cursor-pointer">Facturation Réglementaire</li>
                <li className="hover:text-electric-cyan cursor-pointer">Conseil Technique & Choix de Matériel</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Contact & Commandes</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <a href="tel:0661512133" className="text-electric-amber font-mono font-bold hover:underline">
                    0661 51 21 33
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <a href="mailto:storelect@gmail.com" className="text-slate-300 hover:text-electric-cyan">
                    storelect@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Livraison express à domicile / stop desk dans <strong>58 Wilayas</strong></span>
                </li>
                <li className="text-electric-volt font-medium flex items-center gap-2">
                  <span>💵</span>
                  <span><strong>Paiement Cash à la Réception</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
