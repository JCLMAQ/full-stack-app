# Copilot Instructions pour FullStackApp

## Architecture générale

Cette application est un **monorepo Nx** avec une architecture full-stack Angular/NestJS utilisant **ZenStack** comme layer d'accès aux données et **Prisma** comme ORM.

### Structure clé
- `apps/frontend/` - Application Angular standalone avec routage
- `apps/backend/` - API NestJS avec validation globale et Swagger
- `libs/backend/` - Libraries partagées backend (auths, users, tasks, todos, posts, etc.)
- `libs/frontend/` - Libraries partagées frontend (auth, material, shared, ui, etc.)
- `libs/prisma/` - Configuration Prisma et utilitaires DB
- `zmodel/` - Schémas ZenStack (.zmodel) qui génèrent les schémas Prisma

## Workflows de développement essentiels

### Base de données et schéma
```bash
# Générer le schéma Prisma depuis ZenStack
pnpm run zenstack:generate

# Générer le client Prisma et migrer
pnpm run start:zenstack-prisma

# Réinitialiser la DB (dev seulement)
pnpm run db-reset

# Studio Prisma pour voir les données
pnpm run prisma:studio
```

### Développement local
```bash
# Démarrer la DB Postgres
pnpm run db:docker:up

# Backend (avec proxy config automatique)
pnpm run start:backend:dev

# Frontend (avec proxy et environnement)
pnpm run start:frontend:dev
```

### Docker (environnement complet)
```bash
# Démarrer tous les services
pnpm run docker:app:up

# Arrêter
pnpm run docker:app:down
```

## Patterns et conventions spécifiques

### Modèles ZenStack
- **Base abstraite** : `organizationBaseEntity` dans `zmodel/base.zmodel` pour toutes les entités organisationnelles
- **Multi-tenant** : Chaque entité liée à `orgId` et `ownerId`
- **Soft delete** : Utilise `isDeleted` (Int) et `isDeletedDT` (DateTime?)
- **Access control** : ZenStack gère les permissions via `@@allow()` et `@@deny()`

### Architecture backend (NestJS)
- **Validation globale** : `ValidationPipe` configuré dans `main.ts` avec `whitelist: true`
- **Services d'auth** : Pattern modulaire dans `libs/backend/auths/` avec `TokenService` et `UserAuthUtilityService`
- **DB config** : Service centralisé `DbConfigService` dans `libs/backend/utilities/db-config/`
- **I18n** : Support multilingue avec `nestjs-i18n`

### Architecture frontend (Angular)
- **Standalone components** : Pattern recommandé, pas de modules NgModule
- **NgRx** : Store global avec `@ngrx/signals` et `@ngrx/store`
- **Material Design** : Thème sombre/clair dans `libs/frontend/material/`
- **Auth guards** : Intercepteur dans `libs/frontend/auth/src/lib/auth.interceptor.ts`

### Configuration et environnement
- **Scripts de config** : `scripts/setenv.ts` et `scripts/setproxyconfig.ts` configurent automatiquement l'environnement
- **Proxy config** : Généré dynamiquement depuis `.env` vers `proxy.config.json`
- **Docker vs Local** : Fichiers env séparés (`.env` vs `.env-docker`)

## Points d'intégration critiques

### ZenStack → Prisma
- Schéma source : `zmodel/schema.zmodel` (importe `base.zmodel` et `configapp.zmodel`)
- Client généré : `zmodel/generated/prisma_client/`
- Migrations : `zmodel/prisma/migrations/`

### Frontend → Backend
- Proxy auto-configuré via `pnpm run configproxy`
- Auth : JWT stocké dans `localStorage.authJwtToken`
- Services partagés via barrel exports dans `libs/`

### Base de données
- PostgreSQL avec PgAdmin (Docker)
- Seeds : Multiple stratégies (`seed.ts`, `seedfaker.ts`, `seedOrg.ts`)
- Factory pattern : `zmodel/factories/` pour les données de test

## Commandes Nx importantes

```bash
# Graph des dépendances
nx graph

# Lister les projets et tâches
nx list

# Build spécifique
nx build frontend

# Tests
nx test <project>

# Lint
nx lint <project>
```

## Debugging et maintenance

- **Circular dependencies** : `pnpm run circular-dependency`
- **DB reset** : Toujours utiliser `pnpm run db-reset` (pas `prisma migrate reset` directement)
- **Hot reload** : Backend et frontend supportent le HMR
- **Logs** : Backend configuré avec niveau debug, I18n errors localisées

Privilégier les patterns existants : barrel exports, services injectables, validation via DTO, et la structure modulaire des libs Nx.
