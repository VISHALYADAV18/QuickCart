import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { isAuthenticated } from "@/lib/auth";
import { Order } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

export default function Orders() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/login");
    }
  }, [setLocation]);

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders/me"],
    enabled: isAuthenticated(),
  });

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8" data-testid="text-orders-title">
          My Orders
        </h1>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-6 w-32" />
              </Card>
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id} className="p-6" data-testid={`order-${order._id}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground" data-testid={`text-order-date-${order._id}`}>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Order ID: {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary" data-testid={`text-order-total-${order._id}`}>
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-3">Items:</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground" data-testid="text-no-orders">
              No orders yet. Start shopping to see your orders here!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
