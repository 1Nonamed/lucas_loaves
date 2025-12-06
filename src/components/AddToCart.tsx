import { useState } from "react";
import QuantitySelector from "./QuantitySelector";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  description: string;
}

export default function AddToCart({
  id,
  name,
  price,
  image,
  slug,
  description,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <QuantitySelector initialQuantity={1} onQuantityChange={setQuantity} />
      <button
        className="snipcart-add-item py-3 px-8 text-sm md:text-base bg-warm-gold rounded-lg text-gray-50 font-medium hover:bg-warm-gold/90 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-warm-gold/50 text-center cursor-pointer flex items-center justify-center w-full md:w-auto"
        data-item-id={name}
        data-item-price={price}
        data-item-url={`/products/${slug}`}
        data-item-description={description}
        data-item-image={image}
        data-item-name={name}
        data-item-quantity={quantity}
      >
        Add to Cart - ${(price * quantity).toFixed(2)}
      </button>
    </div>
  );
}
