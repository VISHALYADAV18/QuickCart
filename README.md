# QuickCart - Fresh Groceries Delivered Fast

A minimalistic MERN (MongoDB, Express, React, Node.js) e-commerce platform for grocery shopping, inspired by Apple, Netflix, and Uber's clean design aesthetics.

## Features

### Customer Features
- Browse products in a clean, spacious grid layout
- Add items to cart (login required)
- Checkout and place orders
- View order history
- User registration and JWT-based authentication

### Admin Features
- Add new products with image uploads
- Delete existing products
- View all products
- Simple, focused admin panel

## Tech Stack

**Frontend:**
- React (Vite)
- React Router (Wouter)
- TailwindCSS
- shadcn/ui components
- TanStack Query for data fetching

**Backend:**
- Node.js + Express
- MongoDB Atlas
- Mongoose ODM
- JWT authentication
- bcrypt for password hashing
- Multer for image uploads

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (connection string provided)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd quickcart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration (Required)**
   
   Create a `.env` file in the project root with your MongoDB Atlas credentials:
   
   ```bash
   # Create .env file
   touch .env
   ```
   
   Add the following to your `.env` file:
   
   ```env
   # MongoDB Atlas Connection String
   # Replace with your actual MongoDB Atlas connection string
   # IMPORTANT: URL-encode special characters in the password!
   # Example: If password is MyP@ss, encode as MyP%40ss
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   
   # JWT Secret (generate a secure random string)
   JWT_SECRET=your_secure_random_string_at_least_32_chars
   ```

   **Critical:** If your MongoDB password contains special characters, they MUST be URL-encoded:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
   - etc.
   
   Example: Password `MyP@ss#123` becomes `MyP%40ss%23123`

   **Generate a secure JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   The app will start on `http://localhost:5000`

   If you see a MongoDB connection error, verify:
   - Your `.env` file exists and has the correct format
   - The password is URL-encoded properly
   - Your IP address is whitelisted in MongoDB Atlas

### Default Admin Account

To create an admin account, register a new user and then update the role in MongoDB:

1. Register via the UI at `/register`
2. Connect to MongoDB Atlas and find your user
3. Update the `role` field from `"customer"` to `"admin"`
4. Log out and log back in

## Project Structure

```
quickcart/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities (auth, cart, queryClient)
│   │   └── App.tsx        # Main app component
│   └── index.html
├── server/                # Backend Express application
│   ├── config/           # Database configuration
│   ├── models/           # Mongoose schemas
│   ├── middleware/       # Auth & upload middleware
│   ├── routes.ts         # API routes
│   └── index.ts          # Server entry point
├── shared/               # Shared TypeScript schemas
├── uploads/              # Product images storage
│   └── products/
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT token

### Products
- `GET /api/products` - Get all products (public)
- `POST /api/products` - Add product (admin only, with image upload)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Place new order (authenticated)
- `GET /api/orders/me` - Get user's orders (authenticated)

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ["customer", "admin"]),
  createdAt: Date
}
```

### Products Collection
```javascript
{
  name: String,
  price: Number,
  description: String,
  image: String (filename),
  category: String
}
```

### Orders Collection
```javascript
{
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: Number,
  createdAt: Date
}
```

## Image Upload

Product images are stored in the filesystem at `/uploads/products/` and served statically. The database stores only the filename. Maximum file size is 5MB. Accepted formats: jpeg, jpg, png, gif, webp.

## Security

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 7 days
- Protected routes require valid JWT token
- Admin routes require admin role
- File uploads are validated for type and size

## Design Philosophy

QuickCart follows a minimalistic design inspired by:
- **Apple**: Clean, spacious layouts with generous whitespace
- **Netflix**: Content-first approach, simple navigation
- **Uber**: Functional clarity, easy-to-use interface

Key design principles:
- Generous spacing between elements
- Inter font for clean typography
- Minimal color palette with green primary accent
- Simple, uncluttered layouts
- Responsive design for all screen sizes

## Development

The app uses Vite for fast development and hot module replacement.

**Key npm scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### MongoDB Connection Issues

If you see connection errors:

1. **Check your IP whitelist** in MongoDB Atlas - ensure your current IP is allowed
2. **Verify the connection string** - special characters in password must be URL-encoded
3. **Check network** - ensure you can reach MongoDB Atlas from your network

### Image Upload Issues

If images aren't appearing:

1. Check that the `/uploads` directory exists and is writable
2. Verify the image was uploaded successfully (check `/uploads/products/`)
3. Ensure the static file serving is working (`app.use("/uploads", express.static("uploads"))`)

## License

MIT

## Contact

For issues or questions, please open an issue on GitHub.
