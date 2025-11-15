import { Product } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { isAuthenticated } from "@/lib/auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    addToCart(product);
    window.dispatchEvent(new Event("cart-updated"));
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const imageUrl = product.image 
    ? `/uploads/products/${product.image}` 
    : "https://placehold.co/400x400/e5e7eb/9ca3af?text=No+Image";

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-150 flex flex-col" data-testid={`card-product-${product._id}`}>
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x400/e5e7eb/9ca3af?text=No+Image";
          }}
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2" data-testid={`text-product-name-${product._id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-primary mb-4" data-testid={`text-product-price-${product._id}`}>
            ${product.price.toFixed(2)}
          </p>
        </div>
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          data-testid={`button-add-to-cart-${product._id}`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
