"use client";

import { ChatLayout } from "@/components/chat/chat-layout";
import base64url from "base64-url";
import { useParams } from "next/navigation";

export default function Chat() {
	const { id } = useParams();

	if (typeof id !== "string") return null;

	return <ChatLayout chatId={base64url.unescape(id)} />;
}
