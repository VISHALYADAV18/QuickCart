import { Link, useLocation } from "wouter";
import { ShoppingBag, User, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isAuthenticated, getUser, clearAuth, isAdmin } from "@/lib/auth";
import { getCartItemCount } from "@/lib/cart";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const authenticated = isAuthenticated();
  const user = getUser();
  const admin = isAdmin();

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };
    
    updateCartCount();
    
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-updated", updateCartCount);
    
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    setLocation("/");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <span className="text-2xl font-bold text-primary hover-elevate active-elevate-2 px-3 py-1 rounded-md cursor-pointer">
              QuickCart
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" data-testid="link-home-nav">
              <Button 
                variant={location === "/" ? "secondary" : "ghost"} 
                size="default"
                className="font-medium"
              >
                Home
              </Button>
            </Link>
            <Link href="/products" data-testid="link-products">
              <Button 
                variant={location === "/products" ? "secondary" : "ghost"} 
                size="default"
                className="font-medium"
              >
                Products
              </Button>
            </Link>
            {authenticated && (
              <Link href="/orders" data-testid="link-orders">
                <Button 
                  variant={location === "/orders" ? "secondary" : "ghost"} 
                  size="default"
                  className="font-medium"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </Button>
              </Link>
            )}
            {admin && (
              <Link href="/admin" data-testid="link-admin">
                <Button 
                  variant={location === "/admin" ? "secondary" : "ghost"} 
                  size="default"
                  className="font-medium"
                >
                  Admin
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/cart" data-testid="link-cart">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1 text-xs"
                    data-testid="badge-cart-count"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {authenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:inline" data-testid="text-user-name">
                  {user?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Link href="/login" data-testid="link-login">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
