import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck, Shield, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
              Fresh Groceries,
              <br />
              <span className="text-primary">Delivered Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed" data-testid="text-hero-subtitle">
              Shop quality groceries from the comfort of your home.
              <br className="hidden md:block" />
              Quick, easy, and always fresh.
            </p>
            <Link href="/products">
              <Button 
                size="lg" 
                className="text-lg px-12 py-6 h-auto font-semibold"
                data-testid="button-shop-groceries"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Groceries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your groceries delivered to your doorstep in no time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Fresh, high-quality products every single time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Shopping</h3>
              <p className="text-muted-foreground">
                Browse, add to cart, and checkout in just a few clicks
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
