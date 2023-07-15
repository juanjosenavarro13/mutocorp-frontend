export interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  refreshToken: string;
  role: string;
}

export interface UpdatedProfile {
  email: string;
  name: string;
}
