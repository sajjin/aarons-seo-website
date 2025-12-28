# Product Search Implementation

## Overview
The search functionality has been implemented to query the local products database (`app/data/products.db`) instead of redirecting to the external Shopify store.

## Files Created/Modified

### 1. API Route: `/app/api/search/route.ts`
- Handles GET requests with query parameter `q`
- Searches across multiple product fields:
  - Title
  - Vendor
  - Type
  - Tags
  - Body HTML
  - Variant SKU
- Returns up to 50 results, prioritized by relevance
- Only returns active products

### 2. Search Results Page: `/app/search/page.tsx`
- Displays search results in a responsive grid layout
- Shows product images, titles, prices, vendors, and descriptions
- Handles loading and error states
- Links to product pages on the main Shopify store

### 3. Styles: `/app/search/search.module.css`
- Responsive design
- Clean, modern UI
- Mobile-optimized grid layout

### 4. Header Component: `/app/components/Header/Header.tsx`
- Updated all search forms (3 total) to use local `/search` route:
  - Main header search
  - Scrolled header search
  - Mobile search bar
- Removed external Shopify search URL

## Database Schema
The products database uses the following key columns for search:
- `handle` - Product URL slug
- `title` - Product name
- `vendor` - Brand/manufacturer
- `type` - Product category
- `tags` - Product tags
- `body_html` - Product description
- `variant_sku` - SKU number
- `variant_price` - Current price
- `variant_compare_at_price` - Original price (for sale pricing)
- `image_src` - Product image URL
- `seo_description` - SEO meta description
- `status` - Product status (only 'active' products are shown)

## Usage
1. Enter search terms in any search bar in the header
2. Press Enter or click the search button
3. View results at `/search?q=<search_term>`
4. Click any product to visit its page on the Shopify store

## Dependencies
- `better-sqlite3` - SQLite database driver for Node.js
- `@types/better-sqlite3` - TypeScript type definitions

## Future Enhancements
- Add pagination for more than 50 results
- Implement filters (by vendor, type, price range)
- Add autocomplete/suggestions
- Cache frequent searches
- Add sorting options (price, relevance, newest)
