// types/Admin.ts

export interface AdminOverview {
  totalUsers: number;
  totalGroups: number;
  usersPerGroup: {
    groupId: string;
    count: number;
  }[];
  groupPresidents: {
    groupId: string;
    name: string;
    contact: string;
  }[];
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
