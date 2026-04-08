import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 text-lg">Add some products to your collection!</p>
        <Link
          to="/"
          className="inline-flex px-10 py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-violet-600 shadow-xl shadow-gray-200 hover:shadow-violet-200 transition-all uppercase tracking-wider"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping Bag</h1>
        <button
          onClick={clearCart}
          className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer uppercase tracking-widest"
        >
          Empty Bag
        </button>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-12">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-2xl shadow-gray-200/50">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span className="text-gray-900">₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500 font-medium">
            <span>Shipping</span>
            <span className="text-emerald-600 font-bold">Complimentary</span>
          </div>
          <div className="border-t border-gray-100 pt-6 flex justify-between">
            <span className="text-2xl font-black text-gray-900">Total</span>
            <span className="text-2xl font-black text-violet-600">
              ₹{cartTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="block w-full py-5 rounded-2xl bg-gray-900 text-white text-center font-bold text-lg hover:bg-violet-600 shadow-xl shadow-gray-200 hover:shadow-violet-200 transition-all uppercase tracking-widest"
        >
          Checkout Now
        </Link>
      </div>
    </div>
  );
}
