export interface Profile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
  role: string;
}

export interface UpdatedProfile {
  email: string;
  name: string;
}
