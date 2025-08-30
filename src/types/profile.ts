import type { Profile } from "@prisma/client.js";
import type { Prettify } from "./utility.js";

export type ProfileInput = Prettify<Pick<Profile, "userId">>;
export type UpdateProfileInput = Prettify<Pick<Profile, "bio">>;
