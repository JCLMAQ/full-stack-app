import { Todo } from "@prisma/client";

export interface TodoInterface extends Todo { Users: true, Tasks: true, SubTodos: true}

// export interface TodoInterface extends Todo { include: { Categories: true, Comments: true, LikedBys: true }}

export interface TodoInterfaceWithOutInclude extends Todo {}

export interface TodoPartialInterface extends Partial<Todo> {}

export interface TodoPartialInterfaceWithInclude extends Partial<Todo> { include: { Categories: true, Comments: true, LikedBys: true }}
