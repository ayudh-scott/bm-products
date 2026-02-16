// Google Sheets Integration Helper
// Updated to match your sheet structure

import { Product } from './products';

/**
 * Fetches product data from Google Sheets
 *
 * Your Google Sheet columns (order matters):
 * 0: category, 1: product, 2: brand, 3: blend/style, 4: Description, 5: links,
 * 6: main_image, 7: image2, 8: image3, 9: image4
 */

const SHEET_ID = '1dEUBVIJxro9M2bjPGmFeE0rtJUo4hAUG5prsTjyJHcI'; // Replace with your Google Sheet ID
const API_KEY = 'AIzaSyBxMAto9hbSJ3yRfMmnJXbQvm2UR1UtXqw'; // Replace with your Google API Key
const SHEET_NAME = 'Sheet1'; // Replace with your sheet name if different

/** Ensures URL is absolute so it opens the real site, not under localhost */
function ensureAbsoluteUrl(value: string): string {
  const trimmed = (value || '').trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return 'https://' + trimmed.replace(/^\/+/, '');
}

export async function fetchProductsFromGoogleSheets(): Promise<Product[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }
    
    const data = await response.json();
    const rows = data.values;
    
    // Skip header row (index 0). Sheet columns: category, product, brand, blend/style, Description, links, main_image, image2, image3, image4
    const products: Product[] = rows.slice(1).map((row: string[], index: number) => {
      const mainImageRaw = (row[6] || '').trim();
      const additional = [
        row[7],
        row[8],
        row[9]
      ].filter(Boolean).map((url) => ensureAbsoluteUrl(String(url))) as string[];
      const mainImage = mainImageRaw ? ensureAbsoluteUrl(mainImageRaw) : (additional[0] || '');
      const link = ensureAbsoluteUrl(row[5] || '');
      return {
        id: (index + 1).toString(),
        product: row[0] || '',       // category (TOPS, BOTTOMS, OUTER, INNER)
        productType: (row[1] || '').trim() || undefined,
        brand: row[2] || '',
        blend: row[3] || '',
        description: row[4] || '',
        link,
        mainImage,
        additionalImages: additional,
      };
    });
    
    return products.filter(p => p.product && p.brand);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

/**
 * How to get your Sheet ID:
 * From your Google Sheet URL:
 * https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
 * Copy the part between /d/ and /edit
 */

/**
 * How to get API Key:
 * 1. Go to https://console.cloud.google.com
 * 2. Create a project or select existing
 * 3. Enable Google Sheets API
 * 4. Create credentials -> API Key
 * 5. Copy the API key
 */

/**
 * Usage in your component:
 * 
 * import { fetchProductsFromGoogleSheets } from '../data/googleSheetsHelper';
 * import { useState, useEffect } from 'react';
 * 
 * function MyComponent() {
 *   const [products, setProducts] = useState<Product[]>([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     fetchProductsFromGoogleSheets()
 *       .then(setProducts)
 *       .finally(() => setLoading(false));
 *   }, []);
 * 
 *   // Your component code...
 * }
 */

/**
 * Auto-sync every minute:
 */
export function setupAutoSync(callback: (products: Product[]) => void, intervalMs: number = 60000) {
  fetchProductsFromGoogleSheets().then(callback);
  
  const intervalId = setInterval(() => {
    fetchProductsFromGoogleSheets().then(callback);
  }, intervalMs);
  
  return () => clearInterval(intervalId);
}
