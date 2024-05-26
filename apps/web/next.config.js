/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	transpilePackages: ["@repo/ui"],
	compiler: {
		relay: require("./relay.config"),
	},
};
