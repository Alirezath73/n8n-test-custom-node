import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class KavenegarApi implements ICredentialType {
	name = 'kavenegarApi';
	displayName = 'Kavenegar API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://kavenegar.com/rest.html';
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
			qs: {
				api_key: '={{$credentials.apiKey}}',
			},
		},
	};
}
