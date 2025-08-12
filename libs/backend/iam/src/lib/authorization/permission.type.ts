import { PermissionClaim } from '@prisma/prisma-client-new';

export const Permission = {
    ...PermissionClaim,
  };

export type PermissionType = PermissionClaim; // | ...other permission enums
