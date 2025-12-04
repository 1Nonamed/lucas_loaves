import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
};

export const isCartOpen = atom(false);

export const cartItems = persistentAtom<CartItem[]>('cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addCartItem(item: CartItem) {
  const currentItems = cartItems.get();
  const existingItemIndex = currentItems.findIndex((i) => i.id === item.id);

  if (existingItemIndex >= 0) {
    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex].quantity += item.quantity;
    cartItems.set(updatedItems);
  } else {
    cartItems.set([...currentItems, item]);
  }
  isCartOpen.set(true);
}

export function removeCartItem(id: string) {
  const currentItems = cartItems.get();
  cartItems.set(currentItems.filter((i) => i.id !== id));
}
