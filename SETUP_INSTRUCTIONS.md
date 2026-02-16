# Mobile Product Catalog - Setup Instructions

## 🎉 Features

### Core Features
- ✅ **Category-First Navigation** - Browse products by category
- ✅ **Full-Screen Product Carousel** - Swipe through products in each category
- ✅ **Animated UI** - Smooth transitions and Motion animations throughout
- ✅ **Product Detail Pages** - Full details with image gallery
- ✅ **Direct Store Links** - "Visit Store" button for each product
- ✅ **Mobile-First Design** - Optimized for mobile with touch gestures
- ✅ **Google Sheets Ready** - Easy data sync with your spreadsheet

### User Flow
1. **Home Screen**: Grid of category cards (ROUND NECK, HOODIE, POLO, etc.)
2. **Category View**: Full-screen carousel showing products in that category
3. **Product Detail**: Detailed view with all images and store link
4. **Swipe Navigation**: Swipe horizontally to browse products

### Technical Stack
- React + TypeScript
- React Router (navigation)
- React Slick (carousel)
- Motion (animations)
- Tailwind CSS v4 (styling)
- Lucide React (icons)
- Sonner (notifications)

---

## 📊 Google Sheets Integration

### Current Status
The app uses **mock data** from `/src/app/data/products.ts`. Connect to Google Sheets to use your own data:

### Your Sheet Structure
```
product | brand | blend/style | Description | links | main_image | image2 | image3 | image4
```

### Example Row
```
ROUND NECK | BOLDFIT | P-100% | Product description here | https://store.com | https://img1.jpg | https://img2.jpg | https://img3.jpg | https://img4.jpg
```

### Setup Steps

#### 1. Create Your Google Sheet
Use these exact column headers:
- `product` - Category/Type (ROUND NECK, HOODIE, VEST, etc.)
- `brand` - Brand name (BOLDFIT, FUAARK, HRX, etc.)
- `blend/style` - Material blend (P-100%, C-95% S-5%, etc.)
- `Description` - Product description text
- `links` - Full URL to the product page
- `main_image` - Main product image URL
- `image2`, `image3`, `image4` - Additional image URLs

#### 2. Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "Google Sheets API"
4. Create credentials → API Key
5. Copy the API key

#### 3. Get Your Sheet ID
From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
```
Copy the part between `/d/` and `/edit`

#### 4. Make Sheet Accessible
- Share your sheet: "Anyone with the link can view"
- OR share with service account email

#### 5. Configure the App
Edit `/src/app/data/googleSheetsHelper.ts`:
```typescript
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const API_KEY = 'YOUR_API_KEY_HERE';
const SHEET_NAME = 'Sheet1'; // Your sheet name
```

#### 6. Update Components
In `/src/app/data/products.ts`, replace the mock data export:

```typescript
import { fetchProductsFromGoogleSheets } from './googleSheetsHelper';

// Remove the hardcoded products array
// Add this instead:
export async function loadProducts() {
  return await fetchProductsFromGoogleSheets();
}
```

Then in your components:
```typescript
import { useState, useEffect } from 'react';
import { fetchProductsFromGoogleSheets } from '../data/googleSheetsHelper';

function CategoryList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductsFromGoogleSheets()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  // Your component code...
}
```

---

## 🎨 Customization

### Change Color Theme
The app uses a dark theme with purple/pink gradients. To customize:

Edit colors in the page components:
```typescript
// CategoryList.tsx
className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"

// Change to your colors:
className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900"
```

### Modify Animations
All animations use Motion. Adjust timing and effects:
```typescript
// Faster animations
transition={{ duration: 0.3 }}

// Slower animations
transition={{ duration: 1 }}

// Spring animations
transition={{ type: "spring", stiffness: 100 }}
```

### Carousel Speed
In `CategoryView.tsx`, adjust slider settings:
```typescript
const sliderSettings = {
  speed: 500,  // Animation speed (ms)
  autoplay: true,  // Enable auto-play
  autoplaySpeed: 3000,  // Time per slide
};
```

---

## 📱 User Experience

### Navigation Flow
1. **Home (Categories)** - Tap any category card
2. **Category View** - Swipe left/right to browse products
3. **Product Detail** - Tap "View Details" for more info
4. **Visit Store** - Tap to open product link in new tab

### Key Interactions
- **Swipe**: Browse products within a category
- **Tap**: Navigate to details or external links
- **Back Button**: Return to previous screen
- **Settings Icon**: View Google Sheets setup guide

### Mobile Optimization
- Full-screen layouts for immersive experience
- Touch-friendly button sizes (minimum 44px)
- Smooth scroll and swipe gestures
- Optimized images for fast loading

---

## 🔧 Technical Details

### File Structure
```
/src
  /app
    /components
      - GoogleSheetsGuide.tsx    # Setup instructions
      - ProductSkeleton.tsx      # Loading state
      - SwipeIndicator.tsx       # Swipe hint
    /data
      - products.ts              # Product data & helpers
      - googleSheetsHelper.ts    # Google Sheets API
    /pages
      - CategoryList.tsx         # Home page (categories)
      - CategoryView.tsx         # Category products carousel
      - ProductDetail.tsx        # Product details page
    - App.tsx                    # Root component
    - routes.ts                  # Route configuration
```

### Data Structure
```typescript
interface Product {
  id: string;
  product: string;        // Category
  brand: string;
  blend: string;          // Material/blend
  description: string;
  link: string;           // Store URL
  mainImage: string;
  additionalImages: string[];
}
```

### Helper Functions
```typescript
// Get all unique categories
getCategories(): string[]

// Get products by category
getProductsByCategory(category: string): Product[]
```

---

## 🚀 Next Steps

### Recommended Enhancements
1. **Add to Favorites** - Let users save favorite products
2. **Filter by Brand** - Filter products within categories
3. **Search** - Global search across all products
4. **Share Product** - Social media sharing
5. **Real-time Sync** - Auto-refresh from Google Sheets
6. **Offline Support** - Cache products for offline viewing

### Integration Ideas
- **Analytics**: Track which categories/products are popular
- **Comments**: Add product reviews/ratings
- **Comparison**: Compare multiple products side-by-side
- **Notifications**: Alert users about new products

---

## 💡 Tips

### Accessing Settings
Tap the ⚙️ icon in the top-right corner of the home screen to view the Google Sheets setup guide.

### Image Requirements
- Use high-resolution images (minimum 800x800px)
- Recommended format: JPG or WebP
- Use HTTPS URLs only
- Consider using a CDN for fast loading

### Performance
- Limit additional images to 3-4 per product
- Compress images before uploading
- Use lazy loading for images
- Keep descriptions concise

### Testing
- Test on various mobile devices
- Check touch gestures work properly
- Verify external links open correctly
- Test with slow network connections

---

## 🐛 Troubleshooting

**Categories not showing?**
- Check that products have a `product` field
- Verify data is loaded correctly
- Check browser console for errors

**Products not loading from Google Sheets?**
- Verify Sheet ID and API Key are correct
- Check sheet is shared properly
- Ensure column names match exactly
- Check browser console for API errors

**Swipe not working?**
- Clear browser cache
- Check touch events are enabled
- Test on actual mobile device

**Images not displaying?**
- Verify image URLs are accessible
- Check CORS policies
- Use HTTPS URLs
- Test URLs in browser

---

## 📞 Support

### Common Issues
1. **Blank screen**: Check browser console for errors
2. **Slow loading**: Optimize image sizes
3. **Navigation issues**: Clear browser cache

### Resources
- [React Router Docs](https://reactrouter.com/)
- [Motion Docs](https://motion.dev/)
- [Google Sheets API](https://developers.google.com/sheets/api)

---

**Built with ❤️ using Figma Make**

Version 2.0 - Category-First Design
