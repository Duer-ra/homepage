# Duevox homepage

The Duevox marketing homepage is a React and Vite application.

## Local development

```powershell
npm ci
npm run dev
```

## Checks

```powershell
npm run lint
npm run build
```

The production files are generated in `dist/`. The `dist/` directory is
ignored because it is generated during deployment.

## Deploying to Vercel

When this repository contains multiple applications, set the Vercel project
**Root Directory** to:

```text
homepage/duevox-homepage
```

The Vercel project should use:

- Framework preset: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: `20.x` or newer

These settings are also recorded in `vercel.json`. If the Vercel project root
is set to the repository root instead, Vercel will not find this app's
`package.json` and `npm run build` will fail before Vite starts.



# Duevox website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + lucide-react.

    npm install
    npm run dev

Pages: `/`, `/features`, `/how-it-works`, `/about`, `/security`, `/pricing`, `/faq`, `/contact`.

- Brand colours live in `app/globals.css` (`@theme`, `brand-50…950`).
- Nav/footer links: `lib/nav.ts`. FAQ content: `lib/faq.ts`.
- Product visuals in `components/Mockups.tsx` are CSS placeholders — swap for real screenshots/photos.
- `components/ContactForm.tsx` has a TODO to wire up a real submit endpoint.
