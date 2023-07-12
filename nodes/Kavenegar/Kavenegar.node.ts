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
							},
						},
					},
				],
				default: 'send',
			},
			{
				displayName: 'Receptor',
				description: 'Receptor',
				required: true,
				name: 'receptor',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sendSimpleSms'],
					},
				},
				routing: {
					request: {
						url: '=/v1/{{$credentials.apiKey}}/sms/send.json',
						// You've already set up the URL. qs appends the value of the field as a query string
						qs: {
							receptor: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Message',
				description: 'Message',
				required: true,
				name: 'message',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['sendSimpleSms'],
					},
				},
				routing: {
					request: {
						// You've already set up the URL. qs appends the value of the field as a query string
						qs: {
							message: '={{$value}}',
						},
					},
				},
			},

			// Optional/additional fields will go here
			// {
			// 	displayName: 'Additional Fields',
			// 	name: 'additionalFields',
			// 	type: 'collection',
			// 	default: {},
			// 	placeholder: 'Add Field',
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['sendSimpleSms'],
			// 			operation: ['send'],
			// 		},
			// 	},
			// 	options: [
			// 		{
			// 			displayName: 'Receptor',
			// 			name: 'receptor',
			// 			type: 'string',
			// 			default: '',
			// 			routing: {
			// 				request: {
			// 					// You've already set up the URL. qs appends the value of the field as a query string
			// 					qs: {
			// 						receptor: '={{$value}}',
			// 					},
			// 				},
			// 			},
			// 		},
			// 		{
			// 			displayName: 'Message',
			// 			name: 'message',
			// 			type: 'string',
			// 			default: '',
			// 			routing: {
			// 				request: {
			// 					// You've already set up the URL. qs appends the value of the field as a query string
			// 					qs: {
			// 						message: '={{$value}}',
			// 					},
			// 				},
			// 			},
			// 		},
			// 	],
			// },
		],
	};
}

