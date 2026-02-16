import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ExternalLink, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useProducts } from "../context/ProductsContext";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const allImages = [product.mainImage, ...product.additionalImages].filter(Boolean);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.brand} - ${product.productType || product.product}`,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.header>

      <div className="pb-24">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[50vh]"
        >
          <img
            src={allImages[selectedImage]}
            alt={product.productType || product.product}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>

        {/* Thumbnail Images */}
        <div className="px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
          {allImages.map((image, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-purple-500 shadow-lg shadow-purple-500/50"
                  : "border-white/20"
              }`}
            >
              <img
                src={image}
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>

        {/* Product Info */}
        <div className="px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          >
            {/* Brand Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full mb-4"
            >
              <span className="text-purple-300 font-semibold text-sm">
                {product.brand}
              </span>
            </motion.div>

            {/* Product Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-white mb-4"
            >
              {product.productType || product.product}
            </motion.h1>

            {/* Blend/Style */}
            {product.blend && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <h3 className="text-white/60 text-sm mb-1">Material Blend</h3>
                <p className="text-white font-semibold text-lg">{product.blend}</p>
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-white/60 text-sm mb-2">Description</h3>
              <p className="text-white/90 leading-relaxed">{product.description}</p>
            </motion.div>

            {/* Visit Store Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(product.link, "_blank")}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-purple-500/50 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Product Store
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Category</span>
              <span className="text-white font-semibold">{product.productType || product.product}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open(product.link, "_blank")}
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center"
        >
          <ExternalLink className="w-7 h-7 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
}
