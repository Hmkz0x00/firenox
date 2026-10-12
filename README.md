# FIRENOX

Website for FIRENOX fire safety spray, intended for firenoxglobal.com.

## Development

Requires Node.js 20.9 or later and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

## Production

```sh
pnpm build
pnpm start
```

The project uses Next.js 16 and React 19. Website images and videos are in
`public/`. Three.js packages are installed, but the current hero uses an MP4.

## Static hosting

A static export was successfully tested. To generate static files, add
`output: 'export'` to the object in `next.config.mjs`, then run `pnpm build`.
Upload the contents of `out/` to the static host. Exported sites do not use
`pnpm start`.

Before launch, update `metadataBase` in `app/layout.tsx` to the production domain
and connect the enquiry form to a real submission service. The current form
validates locally but does not send enquiries.

Dependencies, build output, temporary files, and local environment files are
excluded from version control. Keep all passwords and API keys out of Git.
