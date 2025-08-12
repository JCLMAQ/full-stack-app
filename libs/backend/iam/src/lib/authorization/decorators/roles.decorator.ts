import { SetMetadata } from '@nestjs/common';
// import { Role } from '../../../users/enums/role.enum';
import { Role } from '@prisma/prisma-client-new';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
