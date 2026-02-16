// Product data structure matching your Google Sheet
// Columns: category, product, brand, blend/style, Description, links, main_image, image2, image3, image4

export interface Product {
  id: string;
  product: string;        // Category (TOPS, BOTTOMS, OUTER, INNER) - used for grouping
  productType?: string;  // Product type (ROUND NECK, HOODIE, etc.) - from sheet "product" column
  brand: string;
  blend: string;
  description: string;
  link: string;
  mainImage: string;
  additionalImages: string[];
}

export const products: Product[] = [
  {
    id: "1",
    product: "ROUND NECK",
    brand: "BOLDFIT",
    blend: "P-100%",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://www.boldfit.com/products/mens-velocitee-black?variant=41209427296343",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "2",
    product: "ROUND NECK",
    brand: "ATHFLEX",
    blend: "C-95%, S-5%",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://athflex.com/products/flex-on-t-shirt-white?Size=M",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "3",
    product: "ROUND NECK",
    brand: "HRX",
    blend: "77%N 23%E",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://www.myntra.com/tshirts/hrx+by+hrithik+roshan/hrx-by-hrithik-roshan-training-t-shirt/30394778/buy",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "4",
    product: "HOODIE",
    brand: "FUAARK",
    blend: "60% C 40% P",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://fuaark.com/products/brookline-oversized-hoodie-grey",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "5",
    product: "POLO",
    brand: "FUAARK",
    blend: "C-95%, S-5%",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://fuaark.com/products/polo-tshirt-black",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "6",
    product: "COMPRESSION-T",
    brand: "FUAARK",
    blend: "60% N 27% P 8% S",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://fuaark.com/products/power-seamless-fullsleeves-t-shirt-charcoal",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "7",
    product: "VEST",
    brand: "BOLDFIT",
    blend: "P-100%",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://www.boldfit.com/products/mens-velocitee-black?variant=41209427296343",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "8",
    product: "COMPRESSION-V",
    brand: "ATHFLEX",
    blend: "NS",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://athflex.com/products/hustle-high-neck-compression-tank-black?Size=L",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "9",
    product: "TRACKPANT",
    brand: "BOLDFIT",
    blend: "100%P",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://www.boldfit.com/products/mens-training-trackpant-bftbm5005r?variant=41086630658135",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
  {
    id: "10",
    product: "SHORTS",
    brand: "BOLDFIT",
    blend: "80%N 16%P 14%S",
    description: "asdhalshlahd lalhdlahdlhalsdhasdla sdha sdlasdlhasldhalshdlahsdlhalsdhlahsdl alda lshdalshdlahsldhaldlad",
    link: "https://www.boldfit.com/products/boldfit-shorts-for-men-black?variant=41525412560983",
    mainImage: "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    additionalImages: [
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
      "https://www.boldfit.com/cdn/shop/files/Artboard_2_513629e6-bfcd-4a62-84fb-394467c630ee.jpg?v=1738327012&width=1500",
    ],
  },
];

// Get unique categories from products (works with any Product[])
export function getCategories(productList: Product[] = products): string[] {
  const list = productList?.length ? productList : products;
  return Array.from(new Set(list.map(p => p.product)));
}

// Get products by category (works with any Product[])
export function getProductsByCategory(category: string, productList: Product[] = products): Product[] {
  const list = productList?.length ? productList : products;
  return list.filter(p => p.product === category);
}

// Instructions for connecting to Google Sheets:
// Column mapping: product, brand, blend/style, Description, links, main_image, image2, image3, image4
