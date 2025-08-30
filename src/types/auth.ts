import type { Profile, User } from "@prisma/client.js";
import type { Prettify } from "./utility.js";

export type SignupInput = Prettify<Pick<User, "name" | "email" | "password"> & Partial<Pick<Profile, "bio">>>;

export type SigninInput = Prettify<Pick<User, "email" | "password">>;
