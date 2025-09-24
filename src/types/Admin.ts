// types/admin.ts

export interface AdminOverview {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalGroups: number;
  totalLoans: number;
  totalContributions: number;
  totalDividends: number;
  // Add more fields if needed
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
