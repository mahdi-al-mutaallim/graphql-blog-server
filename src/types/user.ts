export type SignUpArgs = {
  name: string;
  email: string;
  password: string;
  bio?: string
}

export type SignInArgs = {
  email: string;
  password: string;
}
