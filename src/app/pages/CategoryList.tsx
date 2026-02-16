import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, Settings } from "lucide-react";
import { useState } from "react";
import { getCategories, getProductsByCategory } from "../data/products";
import { GoogleSheetsGuide } from "../components/GoogleSheetsGuide";
import { useProducts } from "../context/ProductsContext";

export function CategoryList() {
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, error } = useProducts();
  
  const categories = getCategories(products);
  
  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
  };

  return (
    <div className="min-h-screen bg-black">

      {/* Header */}
      <header className="relative z-10 sticky top-0 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-white">Categories</h1>
              <p className="text-white/60 text-sm mt-1">Choose your style</p>
            </motion.div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowGuide(!showGuide)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/10"
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
          </motion.div>
        </div>
      </header>

      {/* Error from Google Sheets fetch */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-6 py-2"
        >
          <p className="text-amber-300 text-sm">Using offline data. {error}</p>
        </motion.div>
      )}

      {/* Google Sheets Guide */}
      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative z-10 px-6 py-4"
        >
          <GoogleSheetsGuide />
        </motion.div>
      )}

      {/* Categories Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-6 py-8 pb-24"
      >
        <div className="grid grid-cols-2 gap-4">
          {filteredCategories.map((category, index) => {
            const productsInCategory = getProductsByCategory(category, products);
            const previewImage = productsInCategory.find((p) => p.mainImage)?.mainImage ?? productsInCategory[0]?.additionalImages?.[0];

            return (
              <motion.div
                key={category}
                variants={item}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
                className="cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors">
                  {/* Image Preview */}
                  <div className="aspect-square relative overflow-hidden">
                    {previewImage ? (
                      <motion.img
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                        src={previewImage}
                        alt={category}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5" />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Product Count Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm"
                    >
                      <span className="text-xs font-medium text-white/90">
                        {productsInCategory.length}
                      </span>
                    </motion.div>
                  </div>

                  {/* Category Name */}
                  <div className="p-4 border-t border-white/5">
                    <h3 className="text-white font-semibold text-base tracking-tight truncate">
                      {category}
                    </h3>
                    <p className="text-white/50 text-xs mt-0.5">
                      {productsInCategory.length} {productsInCategory.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">No categories found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
