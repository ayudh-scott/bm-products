import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Slider from "react-slick";
import { getProductsByCategory } from "../data/products";
import { useProducts } from "../context/ProductsContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function CategoryView() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products: allProducts } = useProducts();
  
  const products = category ? getProductsByCategory(decodeURIComponent(category), allProducts) : [];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    arrows: false,
    vertical: false,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No products found</p>
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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/")}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
            <div>
              <h1 className="text-white font-bold text-xl">{category}</h1>
              <p className="text-white/60 text-sm">
                {currentSlide + 1} / {products.length}
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Slider */}
      <div className="h-[calc(100vh-80px)]">
        <Slider {...sliderSettings}>
          {products.map((product, index) => (
            <div key={product.id} className="h-[calc(100vh-80px)]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full relative"
              >
                {/* Main Image */}
                <div className="h-[60%] relative">
                  <motion.img
                    key={product.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    src={product.mainImage}
                    alt={product.productType || product.product}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Swipe Indicator */}
                  <AnimatePresence>
                    {index === 0 && currentSlide === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute right-6 top-1/2 -translate-y-1/2"
                      >
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-white/80 text-sm font-medium"
                        >
                          Swipe →
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Info */}
                <div className="h-[40%] px-6 py-6 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Brand */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full mb-4"
                    >
                      <span className="text-purple-300 font-semibold text-sm">
                        {product.brand}
                      </span>
                    </motion.div>

                    {/* Product Name */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl font-bold text-white mb-3"
                    >
                      {product.productType || product.product}
                    </motion.h2>

                    {/* Blend */}
                    {product.blend && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-4"
                      >
                        <span className="text-white/50 text-sm">Blend: </span>
                        <span className="text-white font-medium">{product.blend}</span>
                      </motion.div>
                    )}

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-white/70 leading-relaxed mb-6"
                    >
                      {product.description}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex gap-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="flex-1 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-2xl transition-colors border border-white/20"
                      >
                        View Details
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(product.link, "_blank")}
                        className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Visit Store
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {products.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
