import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure this route runs on Node.js runtime (not Edge),
// since better-sqlite3 requires native Node APIs.
export const runtime = 'nodejs';
// Mark route as dynamic to avoid static rendering during build
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get('q') || '').trim();
    const year = (searchParams.get('year') || '').trim();
    const make = (searchParams.get('make') || '').trim();
    const model = (searchParams.get('model') || '').trim();
    const submodel = (searchParams.get('submodel') || '').trim();

    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const limitParam = parseInt(searchParams.get('limit') || '24', 10);
    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 24;
    const offset = (page - 1) * limit;
    
    const hasQuery = query.length > 0;
    const hasVehicleParams = !!(year || make || model || submodel);

    if (!hasQuery && !hasVehicleParams) {
      return NextResponse.json({ results: [], total: 0, page, limit, totalPages: 0 });
    }

    const dbPath = path.join(process.cwd(), 'products.db');

    const db = new Database(dbPath, { readonly: true });

    // Build WHERE clause fragments and params
    const whereFragments: string[] = [];
    const whereParams: string[] = [];

    if (hasQuery) {
      const searchTerm = `%${query.toLowerCase()}%`;
      whereFragments.push(`(
        LOWER(title) LIKE ?
        OR LOWER(vendor) LIKE ?
        OR LOWER(type) LIKE ?
        OR LOWER(tags) LIKE ?
        OR LOWER(body_html) LIKE ?
        OR LOWER(variant_sku) LIKE ?
      )`);
      whereParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (hasVehicleParams) {
      const vehicleConditions: string[] = [];
      if (year) {
        vehicleConditions.push('LOWER(tags) LIKE ?');
        whereParams.push(`%${year.toLowerCase()}%`);
      }
      if (make) {
        vehicleConditions.push('LOWER(tags) LIKE ?');
        whereParams.push(`%${make.toLowerCase()}%`);
      }
      if (model) {
        vehicleConditions.push('LOWER(tags) LIKE ?');
        whereParams.push(`%${model.toLowerCase()}%`);
      }
      if (submodel) {
        vehicleConditions.push('LOWER(tags) LIKE ?');
        whereParams.push(`%${submodel.toLowerCase()}%`);
      }
      if (vehicleConditions.length > 0) {
        whereFragments.push(`(${vehicleConditions.join(' AND ')})`);
      }
    }

    const whereSql = whereFragments.length > 0 ? ' AND ' + whereFragments.join(' AND ') : '';

    // Count total rows for pagination
    const countSql = `
      SELECT COUNT(DISTINCT handle) AS total
      FROM products
      WHERE status = 'active'${whereSql}
    `;
    const countStmt = db.prepare(countSql);
    const countRow = countStmt.get(...whereParams) as { total: number } | undefined;
    const total = countRow?.total ?? 0;
    const totalPages = total > 0 ? Math.ceil(total / limit) : 0;

    // Fetch paginated results
    let resultsSql = `
      SELECT DISTINCT 
        handle,
        title,
        vendor,
        type,
        tags,
        variant_price,
        variant_compare_at_price,
        image_src,
        seo_description,
        variant_sku,
        status
      FROM products
      WHERE status = 'active'${whereSql}
    `;

    const resultsParams: (string | number)[] = [...whereParams];
    if (hasQuery) {
      const orderTerm = `%${query.toLowerCase()}%`;
      resultsSql += `
        ORDER BY 
          CASE 
            WHEN LOWER(title) LIKE ? THEN 1
            WHEN LOWER(vendor) LIKE ? THEN 2
            WHEN LOWER(type) LIKE ? THEN 3
            ELSE 4
          END,
          title
        LIMIT ? OFFSET ?
      `;
      resultsParams.push(orderTerm, orderTerm, orderTerm, limit, offset);
    } else {
      resultsSql += `
        ORDER BY title
        LIMIT ? OFFSET ?
      `;
      resultsParams.push(limit, offset);
    }

    const resultsStmt = db.prepare(resultsSql);
    const results = resultsStmt.all(...resultsParams);

    db.close();

    return NextResponse.json({
      results,
      total,
      page,
      limit,
      totalPages,
      query,
      filters: { year, make, model, submodel }
    });

  } catch (error) {
    console.error('Search error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    const isNotDb = typeof error === 'object' && error && (error as any).code === 'SQLITE_NOTADB';
    return NextResponse.json(
      {
        error: 'Failed to search products',
        details: msg,
        ...(isNotDb
          ? {
              hint:
                'Products DB is not a SQLite file. If using Git LFS, run: git lfs install && git lfs fetch --all && git lfs checkout',
            }
          : {}),
      },
      { status: 500 }
    );
  }
}
