import { useZodForm } from "@/hooks/useZodForm";
import { login } from "@/utils/auth";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormInputPlaceholder,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@ui/components";
import { useRouter } from "next/navigation";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { z } from "zod";
import type { signUpMutation } from "../../__generated__/signUpMutation.graphql";

const UserRegisterFormSchema = z.object({
	username: z
		.string()
		.regex(/^[a-zA-Z0-9_-]{3,16}$/, "Please enter a valid username"), // checks if username is 3-16 char long and alphanumeric
	email: z.string().email("Please enter a valid e-mail"),
	password: z.string().min(1, "Please enter a password"),
});

const RegisterUserMutation = graphql`
  mutation signUpMutation($input: RegisterUserInput!) {
    register(input: $input) {
      token
    }
  }
`;

export function SignUp() {
	const router = useRouter();

	const form = useZodForm(UserRegisterFormSchema);
	const [register, loading] = useMutation<signUpMutation>(RegisterUserMutation);

	const onSubmit = form.handleSubmit((data) => {
		register({
			variables: { input: data },
			updater: (store, data) => {
				if (data?.register?.token) {
					store.invalidateStore();
				}
			},
			onCompleted: (data) => {
				if (data.register?.token) {
					login(data.register.token);
					router.push("/c");
				}
			},
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
				<p className="mt-4 font-bold text-3xl">Sign up</p>
				<p className="font-medium text-primary dark:text-neutral-400">
					New around here? Create an account!
				</p>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormInputPlaceholder>Email</FormInputPlaceholder>
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormInputPlaceholder>Username</FormInputPlaceholder>
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormInputPlaceholder>Password</FormInputPlaceholder>
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" isLoading={loading} className="w-full">
					Sign up
				</Button>
			</form>
		</Form>
	);
}
