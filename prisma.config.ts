import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("zmodel/prisma", "schema.prisma"),
  migrations: {
    path: path.join("zmodel/prisma", "migrations"),
  },
  // views: {
  //   path: path.join("zmodel/views", "views"),
  // },
  // typedSql: {
  //   path: path.join("zmodelqueries", "queries"),
  // }
});
