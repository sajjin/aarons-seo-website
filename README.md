This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Reusable Sections

- `app/components/Header.tsx`: Site header with navigation; uses `NAVIGATION_ITEMS` from `app/data/site.ts`.
- `app/components/HeroSection.tsx`: Landing hero with intro text.
- `app/components/BrandsSection.tsx`: Popular brands grid; uses `BRANDS` from `app/data/site.ts`.
- `app/components/ProjectsSection.tsx`: Projects preview; uses `PROJECTS` from `app/data/projects.ts`.
- `app/components/ProductSection.tsx`: Generic product section with sidebar and grid.
- `app/components/AnnouncementBanner.tsx`: Dismissible announcement bar.
- `app/components/BackToTop.tsx`: Scroll-to-top button.
- `app/components/Footer.tsx`: Site footer.

## Shared Data

- `app/data/site.ts`: Navigation items, brands, and example product/menu data.

## Usage Example

Import and use any section in a page:

```tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductSection from '../components/ProductSection';
import { SUSPENSION_ITEMS, SUSPENSION_PRODUCTS } from '../data/site';

export default function SomePage() {
	return (
		<>
			<Header />
			<main>
				<ProductSection
					title="Suspension"
					viewMoreHref="#"
					menuItems={SUSPENSION_ITEMS}
					products={SUSPENSION_PRODUCTS}
					heroImage="/assets/img/products/Fortune_Auto_Pic_450x.webp"
				/>
			</main>
			<Footer />
		</>
	);
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
