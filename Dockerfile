# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.9.0
ARG PNPM_VERSION=8.15.4

# Stage 01: base

FROM node:${NODE_VERSION}-alpine AS base

# Install pnpm.
WORKDIR /app

RUN npm install -g pnpm@${PNPM_VERSION}

# RUN npm install -g @angular/cli@latest

RUN npm install -g @nestjs/cli@latest
# Install nx globally
RUN npm install -g nx@latest

# Set NX_DAEMON environment variable to false to prevent nx from running in daemon mode
ENV NX_DAEMON=false

WORKDIR /app

# Stage 02: dependencies
FROM base AS dependencies

WORKDIR /app

COPY . .

RUN npm install --force nx@latest
# RUN pnpm install --force --no-frozen-lockfile
RUN pnpm install --force

# Stage 03: build
FROM dependencies AS build

WORKDIR /app

RUN pnpm run zenstack:generate && pnpm run prisma:generate && pnpm run prisma-migrate
# Build the application
RUN nx run backend:build

CMD [ "pnpm", "run", "start", "backend"]
