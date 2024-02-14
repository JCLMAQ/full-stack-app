import { PermissionClaim } from '@prisma/client';

export const Permission = {
    ...PermissionClaim,
  };
  
export type PermissionType = PermissionClaim; // | ...other permission enums
