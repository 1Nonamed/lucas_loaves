import { useStore } from "@nanostores/react";
import { cartItems } from "../stores/cartStore";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Snipcart: any;
  }
}

export default function Checkout() {
  const $cartItems = useStore(cartItems);
  const [isLoading, setIsLoading] = useState(false);

  const total = $cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Clear Snipcart cart first to avoid duplicates if they go back and forth
      // Note: Snipcart API might be async
      try {
        await window.Snipcart.api.cart.items.clear();
      } catch (e) {
        console.warn("Failed to clear cart or cart already empty", e);
      }

      // Add items to Snipcart
      const itemsToAdd = $cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        url: `/products/${item.slug}`, // URL for Snipcart validation
        description: item.name,
        image: item.image,
        quantity: item.quantity,
      }));

      await window.Snipcart.api.cart.items.add(itemsToAdd);

      // Open checkout
      window.Snipcart.api.theme.cart.open();
    } catch (error) {
      console.error("Error syncing with Snipcart", error);
      alert("Something went wrong starting checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if ($cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">
          Your cart is empty
        </h2>
        <a
          href="/"
          className="text-warm-gold font-medium hover:underline text-lg"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-earthy-brown mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-6 space-y-6">
              {$cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center border-b border-stone-100 last:border-0 pb-6 last:pb-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-800">{item.name}</h3>
                    <p className="text-stone-500 text-sm">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium text-earthy-brown">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-stone-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-xs text-stone-400">Calculated next</span>
              </div>
              <div className="border-t border-stone-100 pt-4 flex justify-between font-bold text-lg text-earthy-brown">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full py-4 bg-warm-gold text-white rounded-xl font-bold text-lg hover:bg-warm-gold/90 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-warm-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </button>

            <p className="text-center text-xs text-stone-400 mt-4">
              Secure checkout powered by Snipcart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
