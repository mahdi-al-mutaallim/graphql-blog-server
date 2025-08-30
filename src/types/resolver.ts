import type { GraphQLResolveInfo } from "graphql";
import type { Context } from "@/types/context.js";

/**
 * Generic Resolver type
 *
 * P = Parent (root/parent value)
 * A = Args object type
 * R = Return type (what the resolver returns)
 *
 * IMPORTANT: Prefer to explicitly supply the generics when declaring resolvers,
 * e.g. Resolver<unknown, { id: string }, Payload<User>>.
 */
export type Resolver<P = unknown, A = Record<string, unknown>, R = unknown> = (
	parent: P,
	args: A,
	context: Context,
	info?: GraphQLResolveInfo,
) => Promise<R> | R;
