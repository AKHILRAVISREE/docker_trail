# ==========================================
# Stage 1: Build & Dependencies
# ==========================================
FROM node:24-alpine AS dependencies

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev || npm install --omit=dev

# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy pre-installed node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy package manifests and application source files
COPY package*.json ./
COPY app.js ./

# Explicitly copy frontend template views (EJS)
COPY views ./views

# Run as non-root user for security
USER node

# Expose frontend application port
EXPOSE 3000

# Start Express server
CMD ["node", "app.js"]
