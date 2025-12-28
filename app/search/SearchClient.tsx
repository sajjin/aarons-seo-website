'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './search.module.css';

interface SearchResult {
  handle: string;
  title: string;
  vendor: string;
  type: string;
  tags: string;
  variant_price: string;
  variant_compare_at_price: string;
  image_src: string;
  seo_description: string;
  variant_sku: string;
  status: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
  filters?: {
    year?: string;
    make?: string;
    model?: string;
    submodel?: string;
  };
}

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const year = searchParams.get('year') || '';
  const make = searchParams.get('make') || '';
  const model = searchParams.get('model') || '';
  const submodel = searchParams.get('submodel') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const limitParam = parseInt(searchParams.get('limit') || '24', 10);
  const pageFromUrl = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const limitFromUrl = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 24;
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(pageFromUrl);
  const [limit, setLimit] = useState<number>(limitFromUrl);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query && !year && !make && !model && !submodel) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (year) params.append('year', year);
        if (make) params.append('make', make);
        if (model) params.append('model', model);
        if (submodel) params.append('submodel', submodel);
        params.append('page', String(pageFromUrl));
        params.append('limit', String(limitFromUrl));

        const response = await fetch(`/api/search?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data: SearchResponse = await response.json();
        setResults(data.results);
        setTotal(data.total);
        setPage(data.page);
        setLimit(data.limit);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, year, make, model, submodel, pageFromUrl, limitFromUrl]);

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? price : `$${numPrice.toFixed(2)}`;
  };

  return (
    <>
      <main className={styles.mainContent}>
        <div className={styles.searchPage}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Search Results</h1>
              {query && <p className={styles.query}>Showing results for: <strong>{query}</strong></p>}
              {(year || make || model || submodel) && (
                <p className={styles.query}>
                  Filtered by: {" "}
                  <strong>
                    {[year, make, model, submodel].filter(Boolean).join(' ')}
                  </strong>
                </p>
              )}
              {total > 0 && (
                <p className={styles.query}>
                  Total: <strong>{total}</strong> • Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                </p>
              )}
            </div>

            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Searching...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>Error: {error}</p>
              </div>
            )}

            {!loading && !error && results.length === 0 && (query || year || make || model) && (
              <div className={styles.noResults}>
                <p>No products found matching your criteria</p>
                <p>Try different keywords or vehicle selections.</p>
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <>
                <div className={styles.resultsCount}>
                  Showing {results.length} {results.length === 1 ? 'result' : 'results'} on this page
                </div>
                <div className={styles.resultsGrid}>
                  {results.map((product, index) => (
                    <div key={`${product.handle}-${index}`} className={styles.productCard}>
                      <Link 
                        href={`https://boostbarnmotorsports.com/products/${product.handle}`}
                        className={styles.productLink}
                      >
                        {product.image_src && (
                          <div className={styles.imageWrapper}>
                            <Image
                              src={product.image_src}
                              alt={product.title}
                              width={300}
                              height={300}
                              className={styles.productImage}
                            />
                          </div>
                        )}
                        <div className={styles.productInfo}>
                          {product.vendor && (
                            <p className={styles.vendor}>{product.vendor}</p>
                          )}
                          <h3 className={styles.productTitle}>{product.title}</h3>
                          {product.seo_description && (
                            <p className={styles.description}>
                              {product.seo_description.substring(0, 120)}
                              {product.seo_description.length > 120 ? '...' : ''}
                            </p>
                          )}
                          <div className={styles.priceContainer}>
                            {product.variant_compare_at_price && 
                              parseFloat(product.variant_compare_at_price) > parseFloat(product.variant_price) && (
                              <span className={styles.comparePrice}>
                                {formatPrice(product.variant_compare_at_price)}
                              </span>
                            )}
                            <span className={styles.price}>
                              {formatPrice(product.variant_price)}
                            </span>
                          </div>
                          {product.type && (
                            <p className={styles.type}>{product.type}</p>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    {page > 1 ? (
                      <Link
                        className={styles.pageButton}
                        href={{
                          pathname: '/search',
                          query: {
                            ...(query ? { q: query } : {}),
                            ...(year ? { year } : {}),
                            ...(make ? { make } : {}),
                            ...(model ? { model } : {}),
                            ...(submodel ? { submodel } : {}),
                            limit: String(limit),
                            page: String(page - 1)
                          }
                        }}
                      >
                        ← Previous
                      </Link>
                    ) : (
                      <span className={`${styles.pageButton} ${styles.disabled}`}>← Previous</span>
                    )}

                    <span className={styles.pageInfo}>Page {page} of {totalPages}</span>

                    {page < totalPages ? (
                      <Link
                        className={styles.pageButton}
                        href={{
                          pathname: '/search',
                          query: {
                            ...(query ? { q: query } : {}),
                            ...(year ? { year } : {}),
                            ...(make ? { make } : {}),
                            ...(model ? { model } : {}),
                            ...(submodel ? { submodel } : {}),
                            limit: String(limit),
                            page: String(page + 1)
                          }
                        }}
                      >
                        Next →
                      </Link>
                    ) : (
                      <span className={`${styles.pageButton} ${styles.disabled}`}>Next →</span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
