import type { INodeProperties } from 'n8n-workflow';

export const generateBarcodeFields: INodeProperties[] = [
	{
		displayName: 'Barcode Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['generateBarcode'],
				resource: ['barcode'],
			},
		},
		required: true,
		default: 'upca',
		description: 'Type of barcode to generate',
		options: [
			{ name: 'Code 128', value: 'code128' },
			{ name: 'Code 39', value: 'code39' },
			{ name: 'EAN-13', value: 'ean13' },
			{ name: 'EAN-8', value: 'ean8' },
			{ name: 'Interleaved 2 of 5', value: 'interleaved2of5' },
			{ name: 'UPC-A', value: 'upca' },
			{ name: 'UPC-E', value: 'upce' },
		],
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['generateBarcode'],
				resource: ['barcode'],
			},
		},
		default: '',
		required: true,
		description: 'Message or content of the barcode',
	},
	{
		displayName: 'Download Image?',
		name: 'download',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: ['generateBarcode'],
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
				operation: ['generateBarcode'],
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
				operation: ['generateBarcode'],
				resource: ['barcode'],
			},
		},
		default: '',
		description: 'Webhook URL to receive the data after generating the barcode',
	}
];
