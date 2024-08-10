declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: "development" | "production" | "test";
		PORT?: string;
		WS_PORT?: string;
		DATABASE_URL: string;
		REDIS_URL: string;
		JWT_SECRET: string;
		SSL_CERTIFICATE: string;
		SSL_KEY: string;
	}
}
