// Forces TypeScript to flatten intersections and mapped types
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

// Makes all properties (including nested ones) optional:
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Enforces that at least one property is required:
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
	}[Keys];

// Enforces that exactly one property is required:
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
	}[Keys];
