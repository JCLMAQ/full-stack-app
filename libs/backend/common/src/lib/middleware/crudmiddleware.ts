// crud.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma';
import { enhance } from '@zenstackhq/runtime';
import RESTHandler from '@zenstackhq/server/api/rest';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import { Request, Response } from 'express';

@Injectable()
export class CrudMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  use(req: Request, _res: Response, next: (error?: any) => void) {
    // base url for RESTful resource linkage
    const baseUrl = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

    // get the current user from request
    // !! Should be replace by token and user validation result ???
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'] ?? 'USER';
    const user = userId ? { id: String(userId), role: userRole } : undefined;
    console.log("from zen:", user)

    // construct an Express middleware and forward the request/response
    const inner = ZenStackMiddleware({
      // get an enhanced PrismaClient for the current user
      getPrisma: () => enhance(this.prismaService, { user }),
      // use RESTful style API
      handler: RESTHandler({ endpoint: baseUrl })
    });
    inner(req, _res, next);
  }}
