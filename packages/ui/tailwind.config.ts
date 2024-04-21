import type { Config } from "tailwindcss";

const config = {
	presets: [require("@repo/tailwind-config")],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
} satisfies Config;

export default config;
