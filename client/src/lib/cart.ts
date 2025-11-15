import { CartItem, Product } from "@shared/schema";

const CART_KEY = "quickcart_cart";

export function getCart(): CartItem[] {
  const cartStr = localStorage.getItem(CART_KEY);
  if (!cartStr) return [];
  try {
    return JSON.parse(cartStr);
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.product._id === product._id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  const filtered = cart.filter(item => item.product._id !== productId);
  saveCart(filtered);
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const item = cart.find(item => item.product._id === productId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}
