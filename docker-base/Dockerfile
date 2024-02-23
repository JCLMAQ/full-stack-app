# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.9.0
ARG PNPM_VERSION=8.15.3

# Stage 01: base
FROM node:${NODE_VERSION}-alpine AS base
# FROM docker.io/node:lts-alpine AS base

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /app

# Install pnpm.
# RUN npm i -g pnpm
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.json,target=pnpm-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm install -g pnpm@${PNPM_VERSION}

RUN npm install -g pnpm@${PNPM_VERSION}

# install nodemon for hot-reloading
# RUN pnpm install -g nodemon

# Stage 02: dependencies
FROM base AS dependencies

WORKDIR /app

# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.json,target=pnpm-lock.json

# Copy the package.json and pnpm-lock.yaml into the image.
COPY package.json pnpm-lock.yaml ./
# COPY . .
# COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

# Stage 03: dependencies
FROM base AS build

WORKDIR /app

# Copy the rest of the source files into the image.
COPY . .

# COPY --from=dependencies /app/node_modules ./node_modules
# RUN pnpm build
# RUN pnpm prune --prod

# Stage 04: deploy
FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules

# CMD [ "node", "dist/main.js" ]
CMD [ "pnpm", "start" ]


# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
#     --mount=type=cache,target=/root/.local/share/pnpm/store \
#     pnpm install --prod --frozen-lockfile


# Run the application as a non-root user.
# RUN  chown -R node /usr/src/app
# USER node
