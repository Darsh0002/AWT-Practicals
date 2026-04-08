import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < full; i++) stars.push("★");
    if (half) stars.push("½");
    return stars.join("");
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-violet-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-violet-600 transition-colors">
            {product.name}
          </h3>
          <span className="text-xl font-extrabold text-gray-900 whitespace-nowrap">
           ₹{product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-6">
          <span className="text-amber-400 text-sm tracking-wider">
            {renderStars(product.rating)}
          </span>
          <span className="text-xs text-gray-400 font-medium ml-1">
            ({product.rating})
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
            added
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
              : "bg-gray-900 text-white hover:bg-violet-600 shadow-xl shadow-gray-200 hover:shadow-violet-200 uppercase tracking-wider"
          }`}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
