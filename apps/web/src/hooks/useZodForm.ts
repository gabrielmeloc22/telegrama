import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import type { ZodType, z } from "zod";

export const useZodForm = <T extends ZodType>(
  schema: T,
  props?: UseFormProps<z.infer<typeof schema>>
) => {
  return useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    ...props,
  });
};
