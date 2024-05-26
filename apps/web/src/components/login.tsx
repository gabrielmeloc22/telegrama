import { useZodForm } from "@/hooks/useZodForm";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@repo/ui";
import cookies from "nookies";
import { graphql, useMutation } from "react-relay";
import { z } from "zod";
import type { loginMutation } from "../../__generated__/loginMutation.graphql";

const LoginFormSchema = z.object({
  credential: z.union([
    z
      .string()
      .regex(
        /^[a-zA-Z0-9_-]{3,16}$/,
        "Please enter a valid username or e-mail"
      ), // checks if username is 3-16 char long and alphanumeric
    z.string().email("Please enter a valid username or e-mail"),
  ]),
  password: z.string().min(1, "Please enter a password"),
});

const LoginMutation = graphql`
  mutation loginMutation($input: LoginMutationInput!) {
    login(input: $input) {
      token
      user {
        ...authFragment
      }
    }
  }
`;

export function Login() {
  const [mutate, loading] = useMutation<loginMutation>(LoginMutation);
  const form = useZodForm<z.infer<typeof LoginFormSchema>>(LoginFormSchema, {
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
          cookies.set(null, "token", data.login.token);
          location.reload();
        }
        if (errors) {
          // TODO: improve error handling with server codes
          const message = errors[0]?.message;
          form.setError(
            message?.includes("password") ? "password" : "credential",
            { message }
          );
        }
      },
    });
  });

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-20">
      <header className="w-full max-w-xs text-center">
        <h1 className="font-bold text-3xl text-primary">telegrama</h1>
        <p className="text-muted-foreground text-sm">
          yet another messaging app...
        </p>
      </header>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-xs flex-col gap-2 items-center"
        >
          <FormField
            name="credential"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username or mail address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="username or mail address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-10 flex flex-col gap-2">
            <Button type="submit" isLoading={loading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
