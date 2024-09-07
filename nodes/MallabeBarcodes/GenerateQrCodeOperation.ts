import type { INodeProperties } from 'n8n-workflow';

export const generateQrCodeFields: INodeProperties[] = [
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['generateQrCode'],
				resource: ['barcode'],
			},
		},
		default: '',
		required: true,
		description: 'Message to encode into the QR code',
	},
	{
		displayName: 'Size',
		name: 'size',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['generateQrCode'],
				resource: ['barcode'],
			},
		},
		required: true,
		default: 'large',
		description: 'Size of the QR code to generate',
		options: [
			{ name: 'Large', value: 'large' },
			{ name: 'Medium', value: 'medium' },
			{ name: 'Small', value: 'small' },
		],
	},
	{
		displayName: 'Download Image?',
		name: 'download',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: ['generateQrCode'],
				resource: ['barcode'],
			},
		},
		default: false,
		description: 'Whether to download the Image or return a link to it',
	},
	{
		displayName: 'Put Output File In Field',
		name: 'output',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['generateQrCode'],
				resource: ['barcode'],
				download: [true],
			},
		},
		default: 'data',
		description: 'The name of the output field to put the binary file data in',
	},
	{
		displayName: 'Webhook URL (Optional)',
		name: 'webhookUrl',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['generateQrCode'],
				resource: ['barcode'],
			},
		},
		default: '',
		description: 'Webhook URL to receive the data after generating the QR code',
	}
];
