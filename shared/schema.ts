import { z } from "zod";

// User Schema
export const insertUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["customer", "admin"]).default("customer").optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  createdAt: Date;
}

// Product Schema
export const insertProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// Order Schema
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export const insertOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
  })),
  totalAmount: z.number().positive(),
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
}

// Cart Item (Frontend only)
export interface CartItem {
  product: Product;
  quantity: number;
}
