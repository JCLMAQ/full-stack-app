export interface Organization {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean | null;
  isPublic: boolean | null;
  isDeleted: number | null;
  isDeletedDT: Date | null;
  name: string;
  description: string | null;
  address: any | null;
  emailITAdmin: string;
  webSite: string | null;
  mainOrgId: string | null;
}

export interface OrgEmail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  email: string;
  description: string | null;
  orgId: string;
}

export interface OrgDomain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  domainName: string;
  extension: string;
  orgId: string;
}

export interface User {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean | null;
  isPublic: boolean | null;
  isDeleted: number | null;
  isDeletedDT: Date | null;
  email: string;
  lastName: string | null;
  firstName: string | null;
  title: Title | null;
  nickName: string | null;
  Gender: Gender | null;
  social: any | null;
  Language: Language | null;
  dob: Date | null;
  address: any | null;
  isValidated: Date | null;
  isSuspended: Date | null;
  managerId: string | null;
  Roles: Role[];
  Permissions: PermissionClaim[];
  isTfaEnable: boolean;
  tfaSecret: string | null;
  passWordFaker: string | null;
}

export interface UserSecret {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  pwdHash: string | null;
  salt: string | null;
  isAdmin: boolean | null;
}

export interface Profile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  orderProfile: number;
  bio: string;
}

export interface Group {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  orderGroup: number;
  name: string;
  description: string | null;
  isActiv: Date | null;
  orgId: string;
}

export interface Todo {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  orderTodo: number;
  title: string;
  content: string | null;
  todoState: TodoState;
  mainTodoId: string | null;
}

export interface UserTodoLink {
  userId: string;
  todoId: string;
  isAuthor: boolean;
  isAssigned: boolean;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
}

export interface Task {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  orderTask: number;
  title: string;
  content: string | null;
  taskState: TaskState;
  mainTaskId: string | null;
  todoId: string | null;
}

export interface UserTaskLink {
  userId: string;
  taskId: string;
  isAuthor: boolean;
  isAssigned: boolean;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
}

export interface Post {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  orderPost: number | null;
  title: string;
  content: string | null;
}

export interface Category {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean | null;
  isPublic: boolean | null;
  isDeleted: number | null;
  isDeletedDT: Date | null;
  orderCategory: number;
  name: string;
}

export interface Comment {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean | null;
  isPublic: boolean | null;
  isDeleted: number | null;
  isDeletedDT: Date | null;
  orderComment: number;
  content: string | null;
  postId: string;
  authorId: string;
}

export interface File {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  name: string;
  storageName: string;
  type: string | null;
  data: string | null;
  size: number | null;
  isArchived: Date | null;
}

export interface UserFollower {
  user_id: string;
  follower_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostLike {
  user_id: string;
  post_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Story {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean | null;
  isPublic: boolean | null;
  isDeleted: number | null;
  isDeletedDT: Date | null;
  caption: string;
  user_id: string;
}

export interface Image {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  type: string;
  url: string;
  associated_id: string;
  sequence: number;
}

export interface ConfigParam {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  name: string;
  value: string;
  utility: string;
}

export interface OrgEmailUseTo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  useTo: string;
  isActiv: boolean;
  emailOrgId: number;
}

export interface AppEmailDomain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  domain: string;
  allowed: boolean;
}

export interface RefreshToken {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  userId: string;
  tokenId: string;
}

export interface ApiKey {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  key: string;
  uuid: string;
  userId: string;
}

export interface Scope {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  scope: string;
}

export interface Token {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  tokenId: string | null;
  type: TokenType;
  emailToken: string | null;
  valid: boolean;
  expiration: Date;
  userId: string;
}

export interface ChangesTracking {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date | null;
  doneAt: Date;
  modifiedById: string;
  modelName: string;
  recordId: string;
  operation: string;
  newData: any;
  oldData: any;
}

export interface AccountValidation {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean | null;
  isPublic: boolean | null;
  isDeleted: number | null;
  isDeletedDT: Date | null;
  isValidated: boolean;
  emailToken: string;
  timeStamp: Date;
}

export const TaskState = {
  CREATION: "CREATION",
  STANDBY: "STANDBY",
  RUNNING: "RUNNING",
  DONE: "DONE",
} as const;
export type TaskState = (typeof TaskState)[keyof typeof TaskState];

export const TodoState = {
  CREATION: "CREATION",
  STANDBY: "STANDBY",
  RUNNING: "RUNNING",
  DONE: "DONE",
} as const;
export type TodoState = (typeof TodoState)[keyof typeof TodoState];

export const Gender = {
  MALE: "MALE",
  FEMELE: "FEMELE",
  UNKNOWN: "UNKNOWN",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const Title = { Mr: "Mr", Mme: "Mme", Dct: "Dct" } as const;
export type Title = (typeof Title)[keyof typeof Title];

export const Position = {
  Manager: "Manager",
  Member: "Member",
  Secretary: "Secretary",
} as const;
export type Position = (typeof Position)[keyof typeof Position];

export const Language = { en: "en", fr: "fr" } as const;
export type Language = (typeof Language)[keyof typeof Language];

export const Role = {
  GUEST: "GUEST",
  USER: "USER",
  ADMIN: "ADMIN",
  SUPERADMIN: "SUPERADMIN",
  REGULAR: "REGULAR",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const PermissionClaim = {
  CreateCoffee: "CreateCoffee",
  UpdateCoffee: "UpdateCoffee",
  DeleteCoffee: "DeleteCoffee",
} as const;
export type PermissionClaim =
  (typeof PermissionClaim)[keyof typeof PermissionClaim];

export const TokenType = {
  EMAIL: "EMAIL",
  API: "API",
  FORGOT: "FORGOT",
  ACCOUNT: "ACCOUNT",
  REFREZH: "REFREZH",
} as const;
export type TokenType = (typeof TokenType)[keyof typeof TokenType];
