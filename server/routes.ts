import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db";
import User from "./models/User";
import Product from "./models/Product";
import Order from "./models/Order";
import { generateToken, authenticateToken, isAdmin, type AuthRequest } from "./middleware/auth";
import { upload } from "./middleware/upload";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB
  await connectDB();

  // Serve uploaded images
  app.use("/uploads", express.static("uploads"));

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "customer",
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken((user._id as any).toString(), user.role);

      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Login failed" });
    }
  });

  // Product Routes
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch products" });
    }
  });

  app.post("/api/products", authenticateToken, isAdmin, upload.single("image"), async (req: AuthRequest & { file?: Express.Multer.File }, res) => {
    try {
      const { name, price, description, category } = req.body;

      const product = new Product({
        name,
        price: parseFloat(price),
        description,
        category,
        image: req.file ? req.file.filename : "",
      });

      await product.save();

      res.status(201).json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to add product" });
    }
  });

  app.delete("/api/products/:id", authenticateToken, isAdmin, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete product" });
    }
  });

  // Order Routes
  app.post("/api/orders", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { items, totalAmount } = req.body;

      const order = new Order({
        userId: req.userId,
        items,
        totalAmount,
      });

      await order.save();

      res.status(201).json(order);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to create order" });
    }
  });

  app.get("/api/orders/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch orders" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
