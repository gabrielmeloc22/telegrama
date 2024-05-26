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
} from "@repo/ui";
import { graphql, useMutation } from "react-relay";
import { z } from "zod";
import type { signInMutation } from "../../__generated__/signInMutation.graphql";

const LoginFormSchema = z.object({
	credential: z.union([
		z
			.string()
			.regex(
				/^[a-zA-Z0-9_-]{3,16}$/,
				"Please enter a valid username or e-mail",
			), // checks if username is 3-16 char long and alphanumeric
		z.string().email("Please enter a valid username or e-mail"),
	]),
	password: z.string().min(1, "Please enter a password"),
});

const SignInMutation = graphql`
  mutation signInMutation($input: LoginMutationInput!) {
    login(input: $input) {
      token
    }
  }
`;

export function SignIn() {
	const [mutate, loading] = useMutation<signInMutation>(SignInMutation);
	const form = useZodForm(LoginFormSchema, {
		defaultValues: {
			credential: "",
			password: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		mutate({
			variables: {
				input: { username: data.credential, password: data.password },
			},
			onCompleted: (data, errors) => {
				if (data.login?.token) {
					login(data.login.token);
					location.reload();
				}
				if (errors) {
					// TODO: improve error handling with server codes
					const message = errors[0]?.message;
					form.setError(
						message?.includes("password") ? "password" : "credential",
						{ message },
					);
				}
			},
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
				<p className="mt-4 font-bold text-3xl">Sign in</p>
				<p className="font-medium text-primary dark:text-neutral-400">
					Welcome back! Sign in to your account below.
				</p>
				<FormField
					name="credential"
					control={form.control}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormInputPlaceholder>Username or Email</FormInputPlaceholder>
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="username or mail address"
										{...field}
									/>
								</FormControl>
								<FormInputPlaceholder>Password</FormInputPlaceholder>
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" isLoading={loading} className="w-full">
					Sign in
				</Button>
			</form>
		</Form>
	);
}
