"use client";

import { ChatLayout } from "@/components/chat/chat-layout";
import { useParams } from "next/navigation";

export default function Chat() {
	const { id } = useParams();

	if (typeof id !== "string") return null;

	return <ChatLayout chatId={id} />;
}
