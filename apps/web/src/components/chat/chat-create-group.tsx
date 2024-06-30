import { useUser } from "@/hooks/useUser";
import { CameraPlus } from "@phosphor-icons/react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	FormInputPlaceholder,
	Input,
	Label,
	NavigationStack,
	NavigationStackItem,
	NavigationStackTrigger,
	Spinner,
} from "@ui/components";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Suspense, useDeferredValue, useState } from "react";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import type { chatCreateGroupMutation } from "../../../__generated__/chatCreateGroupMutation.graphql";
import type { chatCreateGroupQuery } from "../../../__generated__/chatCreateGroupQuery.graphql";
import type { userItemFragment$key } from "../../../__generated__/userItemFragment.graphql";
import type { userListFragment$data } from "../../../__generated__/userListFragment.graphql";
import { SearchField } from "../search-field";
import { UserAvatar } from "../user/user-avatar";
import { UserItem, UserItemFragment } from "../user/user-item";
import { UserList } from "../user/user-list";

type ChatCreateGroupProps = {
	goBack: () => void;
};

const ChatCreateGroupQuery = graphql`
 query chatCreateGroupQuery($filter: UserFilter){
	...userListFragment @arguments(filter:$filter)
 }
`;

type SelectedUser = userListFragment$data["users"]["edges"][number];

export function ChatCreateGroup({ goBack }: ChatCreateGroupProps) {
	const [selected, setSelected] = useState<SelectedUser[]>([]);

	return (
		<NavigationStack>
			<NavigationStackItem
				value={0}
				className="flex h-full flex-col gap-4 dark:bg-neutral-900"
			>
				<Suspense
					fallback={
						<div className="flex w-full items-center justify-center">
							<Spinner />
						</div>
					}
				>
					<GroupMembersStep
						goBack={goBack}
						selected={selected}
						setSelected={setSelected}
					/>
				</Suspense>
			</NavigationStackItem>

			<NavigationStackItem
				value={1}
				className="flex h-full flex-col gap-4 dark:bg-neutral-900"
			>
				<GroupInfoStep selected={selected} goBack={goBack} />
			</NavigationStackItem>
		</NavigationStack>
	);
}

type MemberItemProps = {
	onSelect: () => void;
	user: userItemFragment$key;
};

function MemberItem({ onSelect, user }: MemberItemProps) {
	const data = useFragment<userItemFragment$key>(UserItemFragment, user);

	return (
		<motion.div
			layout
			className="group relative flex cursor-pointer items-center gap-2 rounded-full bg-neutral-700/80 pr-3 text-sm duration-200 hover:bg-red-400/10"
			variants={{
				hidden: {
					scale: 0,
					opacity: 0,
					transformOrigin: "left",
				},
				visible: {
					scale: 1,
					opacity: 1,
				},
			}}
			initial="hidden"
			animate="visible"
			exit="hidden"
			transition={{
				duration: 0.2,
				ease: "circInOut",
			}}
			onClick={onSelect}
		>
			<span className="absolute left-0 z-10 flex size-8 rotate-[60deg] items-center justify-center rounded-full bg-red-500 opacity-0 duration-200 group-hover:rotate-0 group-hover:opacity-100">
				<X className="size-5" />
			</span>
			<UserAvatar
				name={data.username}
				imageUrl={data.avatar}
				className="size-8 text-xs"
			/>
			<p>{data.username}</p>
		</motion.div>
	);
}

type GroupStepProps = {
	goBack: () => void;
	selected: SelectedUser[];
	setSelected: React.Dispatch<React.SetStateAction<SelectedUser[]>>;
};

function GroupMembersStep({ goBack, selected, setSelected }: GroupStepProps) {
	const [search, setSearch] = useState("");

	const deferredSearch = useDeferredValue(search);

	const userList = useLazyLoadQuery<chatCreateGroupQuery>(
		ChatCreateGroupQuery,
		{ filter: { username: deferredSearch } },
	);

	return (
		<>
			<div className="flex flex-col gap-4 p-4 dark:bg-neutral-800">
				<div className="flex items-center gap-8">
					<Button design="unstyled" onClick={goBack}>
						<ArrowLeft className="size-5" />
					</Button>
					<h1 className="font-medium text-lg">Add members</h1>
				</div>
				<div className="flex flex-wrap gap-2">
					<LayoutGroup>
						<AnimatePresence presenceAffectsLayout>
							{selected.map(
								(m) =>
									m?.node && (
										<MemberItem
											key={m?.node?.id}
											user={m?.node}
											onSelect={() =>
												setSelected((prev) =>
													prev.filter((id) => m?.node?.id !== id),
												)
											}
										/>
									),
							)}
						</AnimatePresence>

						<motion.div layout>
							<SearchField
								placeholder="Search for a user..."
								className="h-fit w-fit border-none p-1.5 dark:bg-transparent"
								onSearch={setSearch}
							/>
						</motion.div>
					</LayoutGroup>
				</div>
			</div>
			<div className="h-full dark:bg-neutral-800">
				<Suspense
					fallback={
						<div className="flex w-full items-center justify-center">
							<Spinner />
						</div>
					}
				>
					<UserList
						multiple
						userList={userList}
						selected={selected.map((e) => e?.node?.id ?? "")}
						onSelect={(selected) => {
							setSelected((prev) =>
								prev.find((e) => e?.node?.id === selected?.node?.id)
									? prev.filter((e) => e?.node?.id !== selected?.node?.id)
									: [...prev, selected],
							);
						}}
					/>
				</Suspense>
			</div>
			<NavigationStackTrigger navigate="forwards" asChild>
				<Button size="icon" className="absolute right-6 bottom-8 size-14">
					<ArrowRight className="size-5" />
				</Button>
			</NavigationStackTrigger>
		</>
	);
}

const ChatCreateGroupMutation = graphql`
 mutation chatCreateGroupMutation($input: CreateGroupChatInput!){
	createGroupChat(input: $input) {
		clientMutationId
	}
 }
`;

function GroupInfoStep({
	selected,
	goBack,
}: Pick<GroupStepProps, "selected" | "goBack">) {
	const [groupNameValue, setGroupNameValue] = useState<string | null>(null);

	const currUser = useUser();

	const generatedGroupName = `${currUser?.username} & ${selected
		.map((e) => e?.node?.username)
		.join(", ")}`;

	const groupName =
		groupNameValue === null && selected.length > 0
			? generatedGroupName
			: groupNameValue ?? "";

	const [createChat] = useMutation<chatCreateGroupMutation>(
		ChatCreateGroupMutation,
	);

	return (
		<>
			<div className="flex flex-col items-center gap-6 bg-neutral-800">
				<div className="flex items-center gap-8 self-start p-4">
					<NavigationStackTrigger navigate="backwards" asChild>
						<Button design="unstyled">
							<ArrowLeft className="size-5" />
						</Button>
					</NavigationStackTrigger>
					<h1 className="font-medium text-lg">New group</h1>
				</div>
				<Button className="group" design="unstyled">
					<Avatar className="group size-32">
						<AvatarImage />
						<AvatarFallback className="rounded-full bg-primary">
							<CameraPlus className="size-12 transition-transform duration-200 group-hover:scale-[1.2]" />
						</AvatarFallback>
					</Avatar>
				</Button>
				<div className="w-full px-4 pb-5">
					<Label className="relative w-full">
						<Input
							className="peer"
							value={groupName}
							onChange={(e) => setGroupNameValue(e.target.value)}
						/>
						<FormInputPlaceholder className="bg-neutral-800">
							Group Name
						</FormInputPlaceholder>
					</Label>
				</div>
			</div>
			{selected.length > 0 && (
				<div className="flex flex-col gap-1 bg-neutral-800 p-2">
					<p className="px-4 py-2 font-medium text-violet-500">
						{selected.length} member{selected.length > 1 ? "s" : ""}
					</p>
					<div className="flex flex-col">
						{selected.map(
							(u) => u?.node && <UserItem key={u?.node?.id} user={u.node} />,
						)}
					</div>
				</div>
			)}

			<AnimatePresence>
				{!!groupName && (
					<motion.div
						variants={{ visible: { y: 0 }, hidden: { y: 100 } }}
						initial="hidden"
						animate="visible"
						exit="hidden"
						className="absolute right-6 bottom-8"
					>
						<Button
							className="size-14"
							size="icon"
							onClick={() => {
								createChat({
									variables: {
										input: {
											members: selected.map((e) => e?.node?.id),
											name: groupName,
										},
									},
								});
								goBack();
							}}
						>
							<ArrowRight className="size-5" />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
