import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCart, clearCart, getCartTotal } from "@/lib/cart";
import { isAuthenticated } from "@/lib/auth";
import { CartItem } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/login");
      return;
    }
    
    const currentCart = getCart();
    if (currentCart.length === 0) {
      setLocation("/cart");
      return;
    }
    
    setCart(currentCart);
  }, [setLocation]);

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      const orderData = {
        items: cart.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        totalAmount: getCartTotal(),
      };
      
      return await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      clearCart();
      window.dispatchEvent(new Event("cart-updated"));
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. You can view it in your orders page.",
      });
      setLocation("/orders");
    },
    onError: (error: any) => {
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const total = getCartTotal();

  if (!isAuthenticated() || cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8" data-testid="text-checkout-title">
          Checkout
        </h1>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center" data-testid={`checkout-item-${item.product._id}`}>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold">Total Amount</span>
              <span className="text-3xl font-bold text-primary" data-testid="text-checkout-total">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button 
              size="lg" 
              className="w-full text-lg"
              onClick={() => placeOrderMutation.mutate()}
              disabled={placeOrderMutation.isPending}
              data-testid="button-place-order"
            >
              {placeOrderMutation.isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {placeOrderMutation.isPending ? "Placing Order..." : "Place Order"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
