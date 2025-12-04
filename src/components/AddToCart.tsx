import { useState } from "react";
import { addCartItem } from "../stores/cartStore";
import QuantitySelector from "./QuantitySelector";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

export default function AddToCart({ id, name, price, image, slug }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addCartItem({
      id,
      name,
      price,
      image,
      slug,
      quantity,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <QuantitySelector initialQuantity={1} onQuantityChange={setQuantity} />
      <button
        onClick={handleAdd}
        className="py-3 px-8 text-sm md:text-base bg-warm-gold rounded-lg text-gray-50 font-medium hover:bg-warm-gold/90 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-warm-gold/50 text-center cursor-pointer flex items-center justify-center w-full md:w-auto"
      >
        Add to Cart - ${price.toFixed(2)}
      </button>
    </div>
  );
}
