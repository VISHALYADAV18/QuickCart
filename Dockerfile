# ------------------------
# STAGE 1: Build
# ------------------------
FROM node:24 AS build

WORKDIR /app

# copy package files and install all deps (dev + prod) for build
COPY package*.json ./
RUN npm install

# copy source and build
COPY . .
RUN npm run build

# ------------------------
# STAGE 2: Production
# ------------------------
FROM node:24-slim AS runtime

WORKDIR /app

# copy only the server build output
COPY --from=build /app/dist ./dist

# copy package files so we can install only production deps
COPY package*.json ./

# create uploads dir and ensure it exists (will be overridden by bind mount if used)
RUN mkdir -p /app/uploads \
    && chown -R node:node /app/uploads \
    && chmod -R 775 /app/uploads

# install only production dependencies (smaller)
RUN npm install

# MONGODB_URI and JWT_SECRET intentionally not set here (pass at runtime)
EXPOSE 5000

# run the production entry
USER node
CMD ["node", "dist/index.js"]
