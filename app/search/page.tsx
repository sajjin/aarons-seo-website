'use client';

import { Suspense } from 'react';
import nextDynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

const SearchClient = nextDynamic(() => import('./SearchClient'), { ssr: false });

export default function SearchPage() {
  return (
    <Suspense fallback={<div className={"search-loading"}>Loading search…</div>}>
      <SearchClient />
    </Suspense>
  );
}
