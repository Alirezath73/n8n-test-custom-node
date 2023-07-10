import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Kavenegar implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Kavenegar',
		name: 'Kavenegar',
		icon: 'file:kavenegar.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send sms by Kavenegar API',
		defaults: {
			name: 'Kavenegar',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'kavenegarApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.kavenegar.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			// The resource object defines the API resource that the node uses
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send Simple Sms',
						value: 'sendSimpleSms',
					},
				],
				default: 'sendSimpleSms',
			},

			// Operations will go here
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sendSimpleSms'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						action: 'Send the sms',
						description: 'Send Simple Sms',
						routing: {
							request: {
								method: 'GET',
								url: '/v1/7571313234546652435734733746664F316130664C30326153704A7436384C2B/sms/send.json',
							},
						},
					},
				],
				default: 'send',
			},

			// Optional/additional fields will go here
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['sendSimpleSms'],
						operation: ['send'],
					},
				},
				options: [
					{
						displayName: 'Receptor',
						name: 'receptor',
						type: 'string',
						default: '',
						routing: {
							request: {
								// You've already set up the URL. qs appends the value of the field as a query string
								qs: {
									receptor: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Message',
						name: 'message',
						type: 'string',
						default: '',
						routing: {
							request: {
								// You've already set up the URL. qs appends the value of the field as a query string
								qs: {
									message: '={{$value}}',
								},
							},
						},
					},
				],
			},
		],
	};
}
