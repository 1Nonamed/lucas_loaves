import { useStore } from "@nanostores/react";
import { isCartOpen, cartItems, removeCartItem } from "../stores/cartStore";

export default function CartFlyout() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  const total = $cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!$isCartOpen) return null;

  return (
    <aside className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => isCartOpen.set(false)}
      />
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-warm-beige/30">
          <h2 className="text-2xl font-bold text-earthy-brown">Your Cart</h2>
          <button
            onClick={() => isCartOpen.set(false)}
            className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        {/* Cart is empty */}
        <section className="flex-1 overflow-y-auto p-6 space-y-6">
          {$cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-500 space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 opacity-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-lg">Your cart is empty.</p>
              <button
                onClick={() => isCartOpen.set(false)}
                className="text-warm-gold font-medium hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            // Displaying cart items
            $cartItems.map((item) => (
              <article key={item.id} className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg">
                      {item.name}
                    </h3>
                    <p className="text-stone-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-earthy-brown">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Footer */}
        {$cartItems.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-stone-600">
                Subtotal
              </span>
              <span className="text-2xl font-bold text-earthy-brown">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="w-full py-4 bg-warm-gold text-white rounded-xl font-bold text-lg hover:bg-warm-gold/90 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-warm-gold/20">
              Checkout
            </button>
            <p className="text-center text-xs text-stone-400 mt-4">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
