interface config {
	uri: string;
	apiKey: string;
	secretKey: string;
}

interface apiOptions {
	retrieve(
		request: any,
	): { path: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };
	create(
		request: any,
	): { path: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };
	update(
		request: any,
	): { path: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };
	delete(
		request: any,
	): { path: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };
	retrieve(
		request: any,
	): { path: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };
	retrieveList(
		request: any,
	): { path: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };
}

// * Add new resources to here
interface initResult {
	_config: config;
	apiTest: apiTest;
}

// * Resources Types
interface apiTest extends apiOptions {
	_config: config;
}

declare module 'iyzipay' {
	function Iyzipay(config: config): initResult;
	export = Iyzipay;
}