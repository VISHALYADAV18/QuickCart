# QuickCart Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root with your actual MongoDB credentials:

```env
# Replace these with your actual values
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
JWT_SECRET=generate_a_secure_random_string_minimum_32_characters
```

**⚠️ IMPORTANT:** If your MongoDB password contains special characters like `@`, `#`, `$`, etc., they MUST be URL-encoded:
- Example: Password `Pass@123` becomes `Pass%40123`
- Example: Password `Secret#2024` becomes `Secret%232024`

### 3. Start the Application
```bash
npm run dev
```

Visit `http://localhost:5000` to see your app!

## MongoDB Atlas Setup

Your MongoDB connection string is already configured. However, ensure:

1. **IP Whitelist:** Add your IP address in MongoDB Atlas
   - Go to MongoDB Atlas Dashboard
   - Network Access → Add IP Address
   - Add your current IP or use `0.0.0.0/0` (not recommended for production)

2. **Database Access:** Verify the user `vishal_admin` has read/write permissions

## URL Encoding Special Characters

If you change the MongoDB password, encode these characters:

| Character | URL Encoded |
|-----------|-------------|
| @         | %40         |
| :         | %3A         |
| /         | %2F         |
| ?         | %3F         |
| #         | %23         |
| [         | %5B         |
| ]         | %5D         |
| $         | %24         |
| &         | %26         |
| +         | %2B         |
| ,         | %2C         |
| =         | %3D         |

## Creating an Admin User

QuickCart requires you to manually set admin privileges:

1. **Register a new account** at `http://localhost:5000/register`

2. **Connect to MongoDB Atlas**
   - Go to your cluster → Browse Collections
   - Find the `users` collection in `quickcart` database
   - Locate your user document

3. **Update the role field:**
   ```javascript
   {
     "_id": ObjectId("..."),
     "name": "Your Name",
     "email": "your@email.com",
     "password": "$2b$...",
     "role": "admin",  // Change from "customer" to "admin"
     "createdAt": ISODate("...")
   }
   ```

4. **Log out and log back in** - you now have admin access at `/admin`

## Testing the Application

### As a Customer:
1. Visit homepage → Click "Shop Groceries"
2. Browse products (no products yet if database is fresh)
3. Register/Login
4. Add products to cart (once admin adds them)
5. Checkout and place order
6. View order history

### As an Admin:
1. Login with admin account
2. Visit `/admin`
3. Add products with images
4. Manage existing products
5. Delete products

## Troubleshooting

### "MONGODB_URI environment variable is not set"
- You forgot to create the `.env` file
- Run: `touch .env` and add the MongoDB connection string

### "MongoServerError: bad auth"
- The password is not URL-encoded correctly
- Change `@` to `%40` in your connection string

### "IP not whitelisted"
- Add your IP in MongoDB Atlas → Network Access
- Or temporarily use `0.0.0.0/0` (allows all IPs - dev only!)

### "Cannot upload images"
- The `/uploads/products` folder doesn't exist
- It will be created automatically on first upload
- Ensure the app has write permissions

### Port already in use
- Another app is using port 5000
- Kill the process: `lsof -ti:5000 | xargs kill -9`
- Or change the port in `server/index.ts`

## File Structure

```
quickcart/
├── .env                    # Your credentials (DO NOT commit!)
├── .env.example            # Template for .env
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   └── lib/           # Utilities
├── server/                 # Express backend
│   ├── config/            # Database config
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # Auth & upload
│   └── routes.ts          # API endpoints
├── shared/                 # Shared TypeScript types
└── uploads/                # Product images (created on upload)
    └── products/
```

## Next Steps

1. ✅ Set up `.env` file
2. ✅ Start the application
3. ✅ Register a user account
4. ✅ Set that user as admin in MongoDB
5. ✅ Login and add products
6. ✅ Test shopping flow

## Security Reminders

- **Never commit `.env`** to Git (it's in `.gitignore`)
- **Use strong JWT secret** in production
- **Rotate MongoDB password** if exposed
- **Restrict IP whitelist** in MongoDB Atlas for production
- **Use HTTPS** in production

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review MongoDB Atlas documentation for connection issues
- Ensure Node.js version is 18 or higher
