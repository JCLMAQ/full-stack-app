#
# 🧑‍💻 Development
#



ARG NODE_VERSION=20.9.0
ARG PNPM_VERSION=8.15.3
ARG NESTJS_VERSION=latest
ARG NX_VERSION=18.0.5

# Stage 01: dev (development) - base
FROM node:${NODE_VERSION}-alpine AS base
# add the missing shared libraries from alpine base image
RUN apk add --no-cache libc6-compat

# Install global pnpm / nx / nestjs / angular
RUN npm install -g pnpm@${PNPM_VERSION}
# RUN pnpm setup

# RUN npm install -g @angular/cli@latest
RUN npm install -g nx@${NX_VERSION}
RUN npm install -g @nestjs/cli@${NESTJS_VERSION}

# Create app folder
WORKDIR /app

# Set to dev environment
ENV NODE_ENV development

# Create non-root user for Docker
# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 no

# Stage 02: dependencies
FROM base AS dependencies

WORKDIR /app
# Copy source code into app folder
COPY --chown=node:node . .
# COPY . .

# Install dependencies
RUN pnpm install --force --no-frozen-lockfile

# Try to set permissions to node user
RUN chown -R node /app/node_modules
# Install Prisma with zenstack
# RUN pnpm run zenstack:generate && pnpm run prisma:generate && pnpm run prisma-migrate

# Set Docker as a non-root user
USER node

CMD ["pnpm", "run", "start", "backend"]
