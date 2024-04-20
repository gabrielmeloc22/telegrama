import { useMemo } from "react";
import { createEnvironment } from "./environment";
import { RelayEnvironmentProvider } from "react-relay";

type RelayEnvironmentProps = {
	children: React.ReactNode;
};

export default function RelayEnvironment(props: RelayEnvironmentProps) {
	const environment = useMemo(() => {
		return createEnvironment();
	}, []);

	return <RelayEnvironmentProvider environment={environment} {...props} />;
}
