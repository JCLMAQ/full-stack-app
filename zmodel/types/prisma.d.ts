export interface Organization {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean| null;
  isPublic: boolean| null;
  isDeleted: number| null;
  isDeletedDT: Date| null;
  name: string;
  description: string| null;
  address: Record<string, unknown>| null;
  emailITAdmin: string;
  webSite: string| null;
  mainOrgId: string| null;
}

export interface OrgEmail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date| null;
  email: string;
  description: string| null;
  orgId: string;
}

export interface OrgDomain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date| null;
  domainName: string;
  extension: string;
  orgId: string;
}

export interface User {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean| null;
  isPublic: boolean| null;
  isDeleted: number| null;
  isDeletedDT: Date| null;
  email: string;
  lastName: string| null;
  firstName: string| null;
  title: Title| null;
  nickName: string| null;
  Gender: Gender| null;
  social: Record<string, unknown>| null;
  Language: Language| null;
  dob: Date| null;
  address: Record<string, unknown>| null;
  isValidated: Date| null;
  isSuspended: Date| null;
  managerId: string| null;
  Roles: Role[];
  Permissions: PermissionClaim[];
  isTfaEnable: boolean;
  tfaSecret: string| null;
  passWordFaker: string| null;
}

export interface UserSecret {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  pwdHash: string| null;
  salt: string| null;
  isAdmin: boolean| null;
}

export interface Profile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
  orderGroup: number;
  name: string;
  description: string| null;
  isActiv: Date| null;
  orgId: string;
}

export interface Todo {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isDeleted: number;
  isDeletedDT: Date| null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  orderTodo: number;
  title: string;
  content: string| null;
  todoState: TodoState;
  mainTodoId: string| null;
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
  isDeletedDT: Date| null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  orderTask: number;
  title: string;
  content: string| null;
  taskState: TaskState;
  mainTaskId: string| null;
  todoId: string| null;
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
  isDeletedDT: Date| null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  orderPost: number| null;
  title: string;
  content: string| null;
}

export interface Category {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean| null;
  isPublic: boolean| null;
  isDeleted: number| null;
  isDeletedDT: Date| null;
  orderCategory: number;
  name: string;
}

export interface Comment {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean| null;
  isPublic: boolean| null;
  isDeleted: number| null;
  isDeletedDT: Date| null;
  orderComment: number;
  content: string| null;
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
  isDeletedDT: Date| null;
  isPublic: boolean;
  ownerId: string;
  orgId: string;
  name: string;
  storageName: string;
  type: string| null;
  data: string| null;
  size: number| null;
  isArchived: Date| null;
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
  published: boolean| null;
  isPublic: boolean| null;
  isDeleted: number| null;
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
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
  isDeletedDT: Date| null;
  scope: string;
}

export interface Token {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  isPublic: boolean;
  isDeleted: number;
  isDeletedDT: Date| null;
  tokenId: string| null;
  type: TokenType;
  emailToken: string| null;
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
  isDeletedDT: Date| null;
  doneAt: Date;
  modifiedById: string;
  modelName: string;
  recordId: string;
  operation: string;
  newData: Record<string, unknown>;
  oldData: Record<string, unknown>;
}

export interface AccountValidation {
  id: string;
  numSeq: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean| null;
  isPublic: boolean| null;
  isDeleted: number| null;
  isDeletedDT: Date| null;
  isValidated: boolean;
  emailToken: string;
  timeStamp: Date;
}

export type TaskState = "CREATION" | "STANDBY" | "RUNNING" | "DONE";

export declare const TaskState: {
  readonly CREATION: "CREATION";
  readonly STANDBY: "STANDBY";
  readonly RUNNING: "RUNNING";
  readonly DONE: "DONE";
};

export type TodoState = "CREATION" | "STANDBY" | "RUNNING" | "DONE";

export declare const TodoState: {
  readonly CREATION: "CREATION";
  readonly STANDBY: "STANDBY";
  readonly RUNNING: "RUNNING";
  readonly DONE: "DONE";
};

export type Gender = "MALE" | "FEMELE" | "UNKNOWN";

export declare const Gender: {
  readonly MALE: "MALE";
  readonly FEMELE: "FEMELE";
  readonly UNKNOWN: "UNKNOWN";
};

export type Title = "Mr" | "Mme" | "Dct";

export declare const Title: {
  readonly Mr: "Mr";
  readonly Mme: "Mme";
  readonly Dct: "Dct";
};

export type Position = "Manager" | "Member" | "Secretary";

export declare const Position: {
  readonly Manager: "Manager";
  readonly Member: "Member";
  readonly Secretary: "Secretary";
};

export type Language = "en" | "fr";

export declare const Language: {
  readonly en: "en";
  readonly fr: "fr";
};

export type Role = "GUEST" | "USER" | "ADMIN" | "SUPERADMIN" | "REGULAR";

export declare const Role: {
  readonly GUEST: "GUEST";
  readonly USER: "USER";
  readonly ADMIN: "ADMIN";
  readonly SUPERADMIN: "SUPERADMIN";
  readonly REGULAR: "REGULAR";
};

export type PermissionClaim = "CreateCoffee" | "UpdateCoffee" | "DeleteCoffee";

export declare const PermissionClaim: {
  readonly CreateCoffee: "CreateCoffee";
  readonly UpdateCoffee: "UpdateCoffee";
  readonly DeleteCoffee: "DeleteCoffee";
};

export type TokenType = "EMAIL" | "API" | "FORGOT" | "ACCOUNT" | "REFREZH";

export declare const TokenType: {
  readonly EMAIL: "EMAIL";
  readonly API: "API";
  readonly FORGOT: "FORGOT";
  readonly ACCOUNT: "ACCOUNT";
  readonly REFREZH: "REFREZH";
};

declare global {
  export type TOrganization = Organization;
  export type TOrgEmail = OrgEmail;
  export type TOrgDomain = OrgDomain;
  export type TUser = User;
  export type TUserSecret = UserSecret;
  export type TProfile = Profile;
  export type TGroup = Group;
  export type TTodo = Todo;
  export type TUserTodoLink = UserTodoLink;
  export type TTask = Task;
  export type TUserTaskLink = UserTaskLink;
  export type TPost = Post;
  export type TCategory = Category;
  export type TComment = Comment;
  export type TFile = File;
  export type TUserFollower = UserFollower;
  export type TPostLike = PostLike;
  export type TStory = Story;
  export type TImage = Image;
  export type TConfigParam = ConfigParam;
  export type TOrgEmailUseTo = OrgEmailUseTo;
  export type TAppEmailDomain = AppEmailDomain;
  export type TRefreshToken = RefreshToken;
  export type TApiKey = ApiKey;
  export type TScope = Scope;
  export type TToken = Token;
  export type TChangesTracking = ChangesTracking;
  export type TAccountValidation = AccountValidation;
  export type TTaskState = TaskState;
  export type TTodoState = TodoState;
  export type TGender = Gender;
  export type TTitle = Title;
  export type TPosition = Position;
  export type TLanguage = Language;
  export type TRole = Role;
  export type TPermissionClaim = PermissionClaim;
  export type TTokenType = TokenType;
}

