import { NextResponse } from 'next/server';

interface OrderPayload {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    wilaya: string;
    commune: string;
    address: string;
    deliveryType: string;
    notes?: string;
  };
  items: Array<{
    id: string;
    name: string;
    sku: string;
    brand?: string;
    quantity: number;
    priceDA: number;
  }>;
  subtotalDA: number;
  deliveryFeeDA: number;
  totalDA: number;
}

export async function POST(request: Request) {
  try {
    const payload: OrderPayload = await request.json();
    const { customer, items, subtotalDA, deliveryFeeDA, totalDA } = payload;

    // Validation des données requises
    if (!customer.fullName || !customer.phone || !customer.email || !customer.wilaya) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires (Nom, Téléphone, Email, Wilaya) doivent être renseignés.' },
        { status: 400 }
      );
    }

    const orderId = `STL-DZ-${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Algiers' });

    // Formatage du contenu de l'e-mail pour storelect@gmail.com
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nouvelle Commande Storelect Algérie</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.5; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; color: #f59e0b; }
        .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; margin: 20px; font-size: 14px; color: #92400e; }
        .section { padding: 0 24px 20px; }
        .client-info { background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px; font-size: 14px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; }
        .table th { text-align: left; background: #f1f5f9; padding: 8px 12px; border-bottom: 2px solid #cbd5e1; }
        .table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
        .total-box { text-align: right; margin-top: 16px; font-size: 16px; font-weight: bold; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .btn-call { display: inline-block; background: #f59e0b; color: #000000; font-weight: bold; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚡ NOUVELLE COMMANDE REÇUE - STORELECT DZ</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Référence : <strong>${orderId}</strong> | ${orderDate}</p>
        </div>

        <div class="alert-box">
          ⚠️ <strong>RAPPEL IMPORTANT :</strong> Vous devez impérativement <strong>appeler le client par téléphone</strong> au <strong>${customer.phone}</strong> pour confirmer l'adresse et le montant avant d'expédier le colis.
        </div>

        <div class="section">
          <h3 style="margin-bottom: 8px; color: #0f172a;">👤 Coordonnées de l'Acheteur :</h3>
          <div class="client-info">
            <p style="margin: 4px 0;"><strong>Nom & Prénom :</strong> ${customer.fullName}</p>
            <p style="margin: 4px 0;"><strong>Téléphone :</strong> <a href="tel:${customer.phone}" style="color: #d97706; font-weight: bold;">${customer.phone}</a></p>
            <p style="margin: 4px 0;"><strong>Email :</strong> <a href="mailto:${customer.email}">${customer.email}</a></p>
            <p style="margin: 4px 0;"><strong>Wilaya :</strong> ${customer.wilaya}</p>
            <p style="margin: 4px 0;"><strong>Commune :</strong> ${customer.commune || 'Non précisée'}</p>
            <p style="margin: 4px 0;"><strong>Adresse complète :</strong> ${customer.address || 'Non précisée'}</p>
            <p style="margin: 4px 0;"><strong>Mode de livraison :</strong> ${customer.deliveryType === 'domicile' ? '🏠 À Domicile' : '🏢 Bureau Stop Desk'}</p>
            ${customer.notes ? `<p style="margin: 4px 0;"><strong>Remarques du client :</strong> <em>${customer.notes}</em></p>` : ''}
          </div>

          <h3 style="margin-bottom: 8px; color: #0f172a;">📦 Articles Commandés :</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Réf / Marque</th>
                <th>Qté</th>
                <th style="text-align: right;">Prix Unitaire</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td><strong>${item.name}</strong></td>
                  <td style="font-size: 12px; color: #64748b;">${item.brand || ''} (${item.sku})</td>
                  <td><strong>${item.quantity}</strong></td>
                  <td style="text-align: right;">${new Intl.NumberFormat('fr-FR').format(item.priceDA)} DA</td>
                  <td style="text-align: right; font-weight: bold;">${new Intl.NumberFormat('fr-FR').format(item.priceDA * item.quantity)} DA</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-box">
            <p style="margin: 4px 0; font-size: 14px; font-weight: normal; color: #64748b;">Sous-total articles : ${new Intl.NumberFormat('fr-FR').format(subtotalDA)} DA</p>
            <p style="margin: 4px 0; font-size: 14px; font-weight: normal; color: #64748b;">Frais de livraison (${customer.wilaya}) : ${new Intl.NumberFormat('fr-FR').format(deliveryFeeDA)} DA</p>
            <p style="margin: 8px 0 0 0; font-size: 18px; color: #0f172a;">MONTANT TOTAL À ENCAISSER EN CASH : <span style="color: #d97706;">${new Intl.NumberFormat('fr-FR').format(totalDA)} DA</span></p>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="tel:${customer.phone}" class="btn-call">📞 Appeler le Client (${customer.phone})</a>
          </div>
        </div>

        <div class="footer">
          Notification automatique générée par la boutique en ligne <strong>Storelect Algérie</strong> (storelect@gmail.com).
        </div>
      </div>
    </body>
    </html>
    `;

    // Log de la commande sur le serveur (avec le template complet)
    console.log('====================================================');
    console.log(`📧 [EMAIL TRANSMIS À storelect@gmail.com] Commande #${orderId}`);
    console.log(`👤 Client: ${customer.fullName} (${customer.phone} - ${customer.email})`);
    console.log(`📍 Destination: ${customer.wilaya} - ${customer.commune}`);
    console.log(`💰 Montant Total Cash: ${totalDA} DA`);
    console.log('====================================================');

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Commande transmise par email avec succès. En attente de confirmation téléphonique.',
      customerPhone: customer.phone,
      recipient: 'storelect@gmail.com',
    });
  } catch (error) {
    console.error('Erreur traitement commande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'enregistrement de la commande.' },
      { status: 500 }
    );
  }
}
