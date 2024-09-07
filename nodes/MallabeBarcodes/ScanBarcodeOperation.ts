import type { INodeProperties } from 'n8n-workflow';

export const scanBarcodeFields: INodeProperties[] = [
	{
		displayName: 'Barcode Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['scanBarcode'],
				resource: ['barcode'],
			},
		},
		required: true,
		default: 'qrcode',
		description: 'Type of barcode to scan',
		options: [
			{ name: 'Code 128', value: 'code128' },
			{ name: 'Code 39', value: 'code39' },
			{ name: 'EAN-13', value: 'ean13' },
			{ name: 'EAN-8', value: 'ean8' },
			{ name: 'Interleaved 2 of 5', value: 'interleaved2of5' },
			{ name: 'QR Code', value: 'qrcode' },
			{ name: 'UPC-A', value: 'upca' },
			{ name: 'UPC-E', value: 'upce' },
		],
	},
	{
		displayName: 'Barcode Image URL',
		name: 'url',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['scanBarcode'],
				resource: ['barcode'],
			},
		},
		default: '',
		required: true,
		description: 'Public URL of the image to scan',
	},
	{
		displayName: 'Webhook URL (Optional)',
		name: 'webhookUrl',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['scanBarcode'],
				resource: ['barcode'],
			},
		},
		default: '',
		description: 'Webhook URL to receive the data after scanning the barcode',
	}
];
