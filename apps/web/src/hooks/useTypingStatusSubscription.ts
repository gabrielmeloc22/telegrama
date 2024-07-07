import { useMemo, useState } from "react";
import { graphql, useSubscription } from "react-relay";
import type { GraphQLSubscriptionConfig } from "relay-runtime";
import type {
	useTypingStatusSubscription as typingStatusSubscription,
	useTypingStatusSubscription$data,
} from "../../__generated__/useTypingStatusSubscription.graphql";
import { useUser } from "./useUser";

export const TypingStatusSubscription = graphql`
	subscription useTypingStatusSubscription($input: onTypeInput!){
		onType(input: $input) {
			typing
			user {
				id
				username
			}
		}
	}

`;

type TypingStatusArgs = {
	chatId: string;
};

type User = NonNullable<
	NonNullable<useTypingStatusSubscription$data["onType"]>["user"]
>;

export const useTypingStatusSubscription = ({ chatId }: TypingStatusArgs) => {
	const currUser = useUser();
	const [userTyping, setUserTyping] = useState<User | null>();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const config = useMemo<GraphQLSubscriptionConfig<typingStatusSubscription>>(
		() => ({
			subscription: TypingStatusSubscription,
			onNext: (res) => {
				if (res?.onType && res.onType.user?.id !== currUser?.id) {
					setUserTyping(res.onType?.typing ? res.onType.user : null);
				}
			},
			variables: {
				input: { chatId },
			},
		}),
		[chatId, currUser, TypingStatusSubscription],
	);

	useSubscription(config);

	return userTyping;
};
