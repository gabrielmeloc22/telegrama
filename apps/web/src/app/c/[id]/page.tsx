"use client";

import { ChatLayout } from "@/components/chat/chat-layout";
import { useParams } from "next/navigation";

export default function Chat() {
	const { id } = useParams();

	return <ChatLayout userId={id as string} />;
}
