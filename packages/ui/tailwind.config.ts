import shared from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
	presets: [shared],
	content: ["./src/**/*.{ts,tsx}"],
	safelist: ["dark"],
};

export default config;
