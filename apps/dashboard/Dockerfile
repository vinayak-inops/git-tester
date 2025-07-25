# Stage 1: Dependencies
FROM node:20.17.0-alpine3.19 AS deps

# Add metadata labels
LABEL dashboardtainer="vinayak@inops.tech"
LABEL description="INops dashboard Application"
LABEL version="1.0"

# Set working directory
WORKDIR /app

# Add build arguments for resource control
ARG NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_OPTIONS=${NODE_OPTIONS}

# Install specific npm version and turbo
RUN npm install -g npm@11.1.0 turbo

# Copy root package files
COPY package.json package-lock.json ./
COPY turbo.json ./

# Copy all workspace package files
COPY apps/dashboard/package.json ./apps/dashboard/
COPY packages/ui/package.json ./packages/ui/
COPY packages/store/package.json ./packages/store/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/eslint-config/package.json ./packages/eslint-config/

# Install dependencies
RUN npm install --prefer-offline --no-audit

# Stage 2: Builder
FROM node:20.17.0-alpine3.19 AS builder

# Set working directory
WORKDIR /app

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Set build arguments for resource control
ARG NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_OPTIONS=${NODE_OPTIONS}

# Install specific npm version and turbo
RUN npm install -g npm@11.1.0 turbo

# Copy dependencies and workspace configuration
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/turbo.json ./

# Copy source code more efficiently
COPY apps/dashboard ./apps/dashboard
COPY packages ./packages

# Build the application using turbo with proper dependency order
RUN turbo run build --filter=dashboard...

# Stage 3: Runner
FROM node:20.17.0-alpine3.19 AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3004

# Install wget for healthcheck
RUN apk add --no-cache wget

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/turbo.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/.next ./apps/dashboard/.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/public ./apps/dashboard/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/package.json ./apps/dashboard/package.json
COPY --from=builder --chown=nextjs:nodejs /app/packages ./packages

# Create directory for secrets (Docker secrets are mounted here)
RUN mkdir -p /run/secrets && chown nextjs:nodejs /run/secrets

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3004

# Add healthcheck (matching docker-compose)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3004/dashboard/api/health || exit 1

# Start the application
CMD ["npm", "run", "start", "--prefix", "apps/dashboard"] 