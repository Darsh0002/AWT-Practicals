import { Link, useLocation } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || "DEMO-" + Math.random().toString(36).substring(2, 7).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      {/* Success Icon */}
      <div className="w-24 h-24 mx-auto mb-10 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center animate-bounce-in shadow-xl shadow-emerald-100/50">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
        Order Confirmed!
      </h1>
      <p className="text-gray-500 text-xl font-medium mb-12">
        Thank you for your purchase. Your order is being processed.
      </p>

      <div className="inline-block bg-white rounded-3xl border border-gray-100 p-8 mb-12 shadow-2xl shadow-gray-100">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Order Reference</p>
        <p className="text-3xl font-black text-violet-600 tracking-tighter">
          #{orderNumber}
        </p>
      </div>

      <div>
        <Link
          to="/"
          className="inline-flex px-12 py-5 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-violet-600 shadow-xl shadow-gray-200 hover:shadow-violet-200 transition-all uppercase tracking-widest"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
