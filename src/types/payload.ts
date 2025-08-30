// reuseable payload
export type Payload<T> = {
	success: boolean;
	message: string;
	data: T | null;
};
