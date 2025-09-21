// types/user.ts

export type UserRole =
  | "admin"
  | "president"
  | "secretary"
  | "treasurer"
  | "member";

export interface User {
  id: string;          // unique identifier (UUID or database id)
  name: string;        // full name
  email?: string;      // optional if system uses phone only
  phone: string;       // required
  groupId?: string;    // optional if not yet in a group
  role: UserRole;      // role in the system
  approved: boolean;   // whether the user is approved or not
  createdAt: string;   // ISO date
  updatedAt: string;   // ISO date
}

// For creating a new user
export type UserCreate = Omit<User, "id" | "approved" | "createdAt" | "updatedAt">;

// For updating an existing user
export type UserUpdate = Partial<Omit<User, "id" | "createdAt" | "updatedAt">> & {
  id: string;
};
