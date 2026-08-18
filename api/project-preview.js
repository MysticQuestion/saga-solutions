const PREVIEWS = {
  'neural-breach': [
    'https://screenshot2.lovable.dev/bbd76016-5d22-48aa-97fe-8c877bf35760/id-preview-c3acf23c--31af633f-6c4a-4d7d-8063-7379e19b1a28.lovable.app-1781113622182.png',
    'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0beff80f-3170-458e-a8dd-ea488a799cad/id-preview-a7f6d6dc--31af633f-6c4a-4d7d-8063-7379e19b1a28.lovable.app-1781096955214.png',
  ],
  'ark-of-bones': [
    'https://screenshot2.lovable.dev/a7ea6945-c7d8-4e66-b520-4d0203f345a8/id-preview-10e1336e--120a0249-bb33-403e-bf0b-34ee753673b6.lovable.app-1782035296189.png',
    'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bca5fe87-6c61-476a-9f03-eadabc589b8f/id-preview-3dbc922a--120a0249-bb33-403e-bf0b-34ee753673b6.lovable.app-1780934722699.png',
  ],
  streets: [
    'https://screenshot2.lovable.dev/e39178bf-8b48-488b-b02d-10b54c3416f8/id-preview-6eba0f83--872ed083-87d1-474e-8326-0b4afac2e9d9.lovable.app-1786708450126.png',
    'https://storage.googleapis.com/gpt-engineer-file-uploads/uNkkNpjJUzP0GB7fBdtYmwcmQB92/social-images/social-1772324998614-esnoc.webp',
  ],
  'bay-evidence': [
    'https://screenshot2.lovable.dev/9606be5a-c6f3-4436-b06d-e77b6ae92443/id-preview-ec371479--5afa63b7-dc49-40e9-a8e5-f2b67d1da1e9.lovable.app-1787061680171.png',
    'https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5907469f-9e23-47f1-a023-73517e0c8494',
  ],
  aethos: [
    'https://screenshot2.lovable.dev/a58a2c68-9c43-48ac-8537-2ec01e4ac744/id-preview-5de14e9d--18d35eb2-99ac-4798-829f-294fb1deb83e.lovable.app-1782406733732.png',
  ],
  'mystic-sage': [
    'https://screenshot2.lovable.dev/b45cbd59-65f6-4688-802a-88a952f9b950/id-preview-f11e1168--57ea58e5-e244-4284-9af6-cad3a9b0b5b3.lovable.app-1785294861221.png',
    'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c7b937f0-4510-41ce-816e-1e1520e26445/id-preview-306d24b1--57ea58e5-e244-4284-9af6-cad3a9b0b5b3.lovable.app-1777603668645.png',
  ],
  'saga-vibes': [
    'https://screenshot2.lovable.dev/bad258b2-82a7-4d85-8cdc-bc8101acaf21/id-preview-13c21b67--1aafb283-c01b-477a-a1e3-78354721a5e0.lovable.app-1785970480856.png',
    'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73eac439-1634-4457-b157-af680f20a966/id-preview-6e65eba5--1aafb283-c01b-477a-a1e3-78354721a5e0.lovable.app-1780762816968.png',
  ],
};

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method not allowed');
  }

  const key = String(req.query?.key || '').toLowerCase();
  const sources = PREVIEWS[key];
  if (!sources) return res.status(404).send('Unknown project preview');

  let lastStatus = 502;

  for (const source of sources) {
    try {
      const upstream = await fetch(source, {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'User-Agent': 'Mozilla/5.0 (compatible; SagaSystemsPreview/1.0)',
        },
        redirect: 'follow',
      });

      lastStatus = upstream.status;
      if (!upstream.ok) continue;

      const body = Buffer.from(await upstream.arrayBuffer());
      const contentType = upstream.headers.get('content-type') || 'image/png';

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Saga-Preview-Key', key);

      if (req.method === 'HEAD') return res.status(200).end();
      return res.status(200).send(body);
    } catch {
      lastStatus = 502;
    }
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(lastStatus === 404 ? 404 : 502).send('Preview temporarily unavailable');
}
