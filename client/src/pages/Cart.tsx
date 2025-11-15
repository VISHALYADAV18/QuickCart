import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCart, updateQuantity, removeFromCart, getCartTotal } from "@/lib/cart";
import { CartItem } from "@shared/schema";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/login");
      return;
    }
    
    loadCart();
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, [setLocation]);

  const loadCart = () => {
    setCart(getCart());
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event("cart-updated"));
  };

  const total = getCartTotal();

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8" data-testid="text-cart-title">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-6" data-testid="text-empty-cart">
              Your cart is empty
            </p>
            <Link href="/products">
              <Button size="lg" data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <Card key={item.product._id} className="p-6" data-testid={`cart-item-${item.product._id}`}>
                <div className="flex gap-6">
                  <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                    <img
                      src={item.product.image ? `/uploads/products/${item.product.image}` : "https://placehold.co/80x80/e5e7eb/9ca3af?text=No+Image"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/80x80/e5e7eb/9ca3af?text=No+Image";
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" data-testid={`text-cart-item-name-${item.product._id}`}>
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                          data-testid={`button-decrease-${item.product._id}`}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium" data-testid={`text-quantity-${item.product._id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                          data-testid={`button-increase-${item.product._id}`}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="w-24 text-right font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(item.product._id)}
                        data-testid={`button-remove-${item.product._id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-card">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold">Total</span>
                <span className="text-3xl font-bold text-primary" data-testid="text-cart-total">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Link href="/checkout">
                <Button size="lg" className="w-full text-lg" data-testid="button-checkout">
                  Proceed to Checkout
                </Button>
              </Link>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
