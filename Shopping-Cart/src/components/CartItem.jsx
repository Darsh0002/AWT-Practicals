import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-violet-100 hover:shadow-sm transition-all">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-violet-600 font-semibold">
          ₹{item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer text-lg"
        >
          −
        </button>
        <span className="w-6 text-center text-gray-900 font-bold">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer text-lg"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right w-24 shrink-0">
        <p className="font-extrabold text-gray-900">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="w-10 h-10 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
    </div>
  );
}
