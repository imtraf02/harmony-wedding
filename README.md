This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Cloudflare deployment

1. Run `npx wrangler login` once on the deployment machine.
2. In Cloudflare Workers & Pages, add production variables `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD`. Do not add `CF_ACCESS_LOCAL_BYPASS` to production.
3. Apply D1 migrations with `npm run db:migrate:prod`.
4. Deploy with `npm run cf:deploy`.

Use `npm run cf:preview` for a local OpenNext/Cloudflare preview. Local-only Access bypass belongs in `.dev.vars` as `CF_ACCESS_LOCAL_BYPASS=true`.

To work on the CMS locally, run `npm run db:migrate:local` once, then `npm run dev:cms`. Do not use `npm run dev` for CMS CRUD: standard Next development mode does not expose the D1 and R2 bindings.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
