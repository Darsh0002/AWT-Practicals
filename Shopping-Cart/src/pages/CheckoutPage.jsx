import { useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const orderPlaced = useRef(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
    orderPlaced.current = true;
    clearCart();
    navigate("/confirmation", { state: { orderNumber } });
  };

  // Only redirect if cart is empty AND we didn't just place an order
  if (cartItems.length === 0 && !orderPlaced.current) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight text-center sm:text-left">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-100/50">
            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm">1</span>
              Shipping Details
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-violet-500/30 focus:ring-4 focus:ring-violet-500/5 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-violet-500/30 focus:ring-4 focus:ring-violet-500/5 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-violet-500/30 focus:ring-4 focus:ring-violet-500/5 transition-all"
                  placeholder="Street address, apartment, suite"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-violet-500/30 focus:ring-4 focus:ring-violet-500/5 transition-all"
                    placeholder="Mumbai"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-violet-500/30 focus:ring-4 focus:ring-violet-500/5 transition-all"
                    placeholder="400001"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-violet-600 shadow-2xl shadow-gray-200 hover:shadow-violet-200 transition-all uppercase tracking-widest cursor-pointer"
          >
            Confirm Order & Pay — ₹{cartTotal.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 rounded-3xl p-8 sticky top-24 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Review Order</h2>
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs font-bold text-gray-400 mt-0.5">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-extrabold text-gray-900 shrink-0">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span className="text-gray-900">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Shipping</span>
                <span className="text-emerald-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-gray-900 items-baseline pt-2">
                <span className="text-xl font-black">Total</span>
                <span className="text-3xl font-black text-violet-600">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-violet-50 rounded-2xl border border-violet-100">
              <p className="text-xs text-violet-600 font-medium leading-relaxed">
                By placing your order, you agree to our terms of service and privacy policy. We use SSL encryption to keep your data safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
