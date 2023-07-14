export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type TokenResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
};

export type TokenSave = {
  access_token: string;
  refresh_token: string;
};
