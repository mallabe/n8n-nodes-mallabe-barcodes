import type { ICredentialType, INodeProperties, IAuthenticateGeneric, ICredentialTestRequest } from 'n8n-workflow';

const N8N_API_KEY = 'xPHYKn7ar42idNoYrbyuc1xTk6LDWpPoIGvCRLK2';

export class MallabeBarcodesApi implements ICredentialType {
	name = 'mallabeBarcodesApi';

	displayName = 'Mallabe Barcodes API';

	documentationUrl = 'https://www.mallabe.com';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': N8N_API_KEY,
				'x-account-api-key': '={{$credentials.apiKey}}'
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.mallabe.com',
			url: '/v1/accounts/me',
			method: 'POST'
		},
	};
}
