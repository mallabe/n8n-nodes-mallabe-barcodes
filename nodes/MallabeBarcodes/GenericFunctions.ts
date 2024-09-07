import type {
	IHookFunctions,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	JsonObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function mallabeBarcodesRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	url?: string,
	option: IDataObject = {},
) {
	const { apiKey } = await this.getCredentials('mallabeBarcodesApi');
	const n8nApiKey = 'xPHYKn7ar42idNoYrbyuc1xTk6LDWpPoIGvCRLK2';
	const productionUrl = 'https://api.mallabe.com';

	const options: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'n8n',
			'x-api-key': n8nApiKey,
			'x-account-api-key': apiKey,
		},
		method,
		body,
		qs,
		url: url || `${productionUrl}${resource}`,
		json: true,
	};

	try {
		const responseData = await this.helpers.httpRequest(options);
		return responseData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function mallabeBarcodesCdnRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	url: string,
) {
	const options: IHttpRequestOptions = {
		headers: {
			'User-Agent': 'n8n'
		},
		method: 'GET',
		url,
		json: false,
		encoding: 'arraybuffer'
	};

	try {
		const responseData = await this.helpers.httpRequest(options);
		return responseData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
