ARG NODE_VERSION=20.9.0
ARG PNPM_VERSION=8.15.3
ARG NX_VERSION=18.0.5
# Stage 01: base
FROM node:${NODE_VERSION}-alpine AS base

# Install pnpm.

RUN npm install -g pnpm@${PNPM_VERSION}
# RUN pnpm setup
# RUN npm install -g @angular/cli@latest
RUN npm install -g nx@${NX_VERSION}
RUN npm install -g @nestjs/cli@latest

WORKDIR /app

# Stage 02: dependencies
FROM base AS dependencies

WORKDIR /app

COPY . .

# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.json,target=pnpm-lock.json

# Copy the package.json and pnpm-lock.yaml into the image.
# COPY package.json pnpm-lock.yaml ./
# COPY ../package.json ../pnpm-lock.yaml ./
RUN pnpm install --force
# RUN pnpm install --force --no-frozen-lockfile

# Stage 03: dependencies
# FROM base AS build

# WORKDIR /app

# # Copy the rest of the source files into the image.
# COPY . .
# COPY --chown=node:node . .

# Copy dependencies stage 01
# COPY --from=dependencies /app/node_modules ./node_modules
# RUN pnpm build
# RUN pnpm prune --prod


# Stage 04: deploy
# FROM base AS deploy

# WORKDIR /app
# Copy the built application into the image.
# COPY --from=build /app/dist/ ./dist/
# Copy the production dependencies
# COPY --from=build /app/node_modules ./node_modules

# CMD [ "node", "dist/main.js" ]


# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
#     --mount=type=cache,target=/root/.local/share/pnpm/store \
#     pnpm install --prod --frozen-lockfile


# Run the application as a non-root user.
# RUN  chown -R node /app
# USER node

# Generate build artifacts
# RUN pnpm run build

#Expose port and begin application
# EXPOSE 3300

# CMD ["node", "dist/apps/backend/main.js"]
CMD [ "pnpm", "run", "start", "backend"]
