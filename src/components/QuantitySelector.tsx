import { useState } from "react";

interface Props {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

export default function QuantitySelector({
  initialQuantity = 1,
  onQuantityChange,
}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      onQuantityChange?.(value);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={decrement}
        disabled={quantity <= 1}
        className="px-3 py-1 bg-warm-beige border border-warm-gold/20 rounded-lg hover:bg-warm-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1"
        className="text-center w-16 px-2 py-1 border border-warm-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-gold/50"
      />
      <button
        onClick={increment}
        className="px-3 py-1 bg-warm-beige border border-warm-gold/20 rounded-lg hover:bg-warm-gold/10 transition-colors"
      >
        +
      </button>
    </div>
  );
}

export { QuantitySelector };
