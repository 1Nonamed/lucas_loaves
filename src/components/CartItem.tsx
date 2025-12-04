import { removeCartItem } from "../stores/cartStore";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <article className="flex gap-4">
      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-bold text-stone-800 text-lg">{item.name}</h3>
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
  );
}
