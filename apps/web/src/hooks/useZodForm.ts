import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import type { ZodType } from "zod";

export const useZodForm = <TSchema extends object>(
	schema: ZodType,
	props?: UseFormProps<TSchema>,
) => {
	return useForm<TSchema>({
		resolver: zodResolver(schema),
		...props,
	});
};
