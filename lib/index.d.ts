interface config {
	uri: string;
	apiKey: string;
	secretKey: string;
}

interface apiOptions {
	retrieve(request: any): { path: string; method: 'GET' };
	create(request: any): { path: string; method: 'POST' };
	update(request: any): { path: string; method: 'PUT' };
	delete(request: any): { path: string; method: 'DELETE' };
	retrieve(request: any): { path: string; method: 'GET' };
	retrieveList(request: any): { path: string; method: 'GET' };
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
