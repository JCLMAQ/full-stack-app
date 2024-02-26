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

RUN pnpm install --force --no-frozen-lockfile
RUN pnpm run zenstack:generate && pnpm run prisma:generate && pnpm run prisma-migrate
# CMD ["pnpm", "run", "start", "app-1"]
CMD [ "pnpm", "run", "start", "backend"]
