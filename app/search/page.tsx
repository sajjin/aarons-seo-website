'use client';

import { Suspense } from 'react';
import nextDynamic from 'next/dynamic';
import VehicleSelector from '@/app/components/VehicleSelector/VehicleSelector';
import Header from '@/app/components/Header/Header';
import styles from '@/app/pages/homepage/page.module.css';


export const dynamic = 'force-dynamic';

const SearchClient = nextDynamic(() => import('./SearchClient'), { ssr: false });

export default function SearchPage() {
  return (
    <Suspense fallback={<div className={"search-loading"}>Loading search…</div>}>
      <Header />
      <main className={styles.mainContent}>
        <VehicleSelector />
        <SearchClient/>
      </main>
    </Suspense>
  );
}
