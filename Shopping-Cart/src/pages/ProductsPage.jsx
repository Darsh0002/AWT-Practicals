import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Discover Amazing{" "}
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Products
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Curated essentials for your everyday life.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-16 px-4">
        <div className="relative group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search our collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500/30 focus:ring-4 focus:ring-violet-500/5 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl font-medium">
            No products found for your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
