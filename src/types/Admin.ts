// types/Admin.ts

export interface AdminOverview {
  totalUsers: number;
  totalGroups: number;
  groupStats: GroupStat[];
  usersPerGroup: UsersPerGroup[];
}

export interface GroupStat {
  groupId: string;
  groupName: string;
  userCount: number;
  president: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  } | null;
 
}

export interface UsersPerGroup {
  groupId: string;
  count: number;
}


export interface User {
  id: string;
  name: string;
  email: string;
  lastActiveDate: string; // ISO string
  status: "active" | "inactive";
}

export interface GroupDistribution {
  groupId: string;
  groupName: string;
  memberCount: number;
  totalContributions: number;
  totalLoans: number;
  // Add more fields if needed
}
export interface SystemTrendData {
  date: string;
  users: number;
  transactions: number;
}
