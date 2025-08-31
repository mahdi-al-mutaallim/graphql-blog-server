import type { Post } from "@prisma/client.js";
import type { Prettify } from "./utility.js";

export type Posts = Array<Post>;

export type PostInput = Prettify<Pick<Post, "title" | "content" | "published">>;
