// types/user.ts

export type UserRole =
  | "admin"
  | "president"
  | "secretary"
  | "treasurer"
  | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; 
  phoneNumber: string; 
  location: string;
  role: string;
  groupId?: string | null;
  isApproved: boolean; // add thi
  createdAt: string; // add this
  updatedAt: string; // add this
  profilePicture?: string | null; // optional if your backend sends it
 
}

// For creating a new user
export type UserCreate = Omit<
  User,
  "id" | "approved" | "createdAt" | "updatedAt"
>;

// For updating an existing user
export type UserUpdate = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt">
> & {
  id: string;
};
