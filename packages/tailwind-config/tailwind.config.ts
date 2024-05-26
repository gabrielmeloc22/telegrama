import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Omit<Config, ""> = {
	darkMode: ["class"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border:
					"color-mix(in srgb, var(--border) calc(100% * <alpha-value>), transparent)",
				input:
					"color-mix(in srgb, var(--input) calc(100% * <alpha-value>), transparent)",
				ring: "color-mix(in srgb, var(--ring) calc(100% * <alpha-value>), transparent)",
				background:
					"color-mix(in srgb, var(--background) calc(100% * <alpha-value>), transparent)",
				foreground:
					"color-mix(in srgb, var(--foreground) calc(100% * <alpha-value>), transparent)",
				primary: {
					DEFAULT:
						"color-mix(in srgb, var(--primary) calc(100% * <alpha-value>), transparent)",
					foreground:
						"color-mix(in srgb, var(--primary-foreground) calc(100% * <alpha-value>), transparent)",
				},
				secondary: {
					DEFAULT:
						"color-mix(in srgb, var(--secondary) calc(100% * <alpha-value>), transparent)",
					foreground:
						"color-mix(in srgb, var(--secondary-foreground) calc(100% * <alpha-value>), transparent)",
				},
				destructive: {
					DEFAULT:
						"color-mix(in srgb, var(--destructive) calc(100% * <alpha-value>), transparent)",
					foreground:
						"color-mix(in srgb, var(--destructive-foreground) calc(100% * <alpha-value>), transparent)",
				},
				muted: {
					DEFAULT:
						"color-mix(in srgb, var(--muted) calc(100% * <alpha-value>), transparent)",
					foreground:
						"color-mix(in srgb, var(--muted-foreground) calc(100% * <alpha-value>), transparent)",
				},
				accent: {
					DEFAULT:
						"color-mix(in srgb, var(--accent) calc(100% * <alpha-value>), transparent)",
					foreground:
						"color-mix(in srgb, var(--accent-foreground) calc(100% * <alpha-value>), transparent)",
				},
				popover: {
					DEFAULT:
						"color-mix(in srgb, var(--popover) calc(100% * <alpha-value>), transparent)",
					foreground:
						"color-mix(in srgb, var(--popover-foreground) calc(100% * <alpha-value>), transparent)",
				},
				card: {
					DEFAULT:
						"color-mix(in srgb, var(--card) calc(100% * <alpha-value>), transparent)",
					foreground:
						"color-mix(in srgb, var(--card-foreground) calc(100% * <alpha-value>), transparent)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [tailwindAnimate],
};

export default config;
