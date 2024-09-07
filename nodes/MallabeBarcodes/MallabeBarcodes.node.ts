import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { mallabeBarcodesCdnRequest, mallabeBarcodesRequest } from './GenericFunctions';
import { generateBarcodeFields } from './GenerateBarcodeOperation';
import { generateQrCodeFields } from './GenerateQrCodeOperation';
import { scanBarcodeFields } from './ScanBarcodeOperation';

export class MallabeBarcodes implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mallabe Barcodes',
		name: 'mallabeBarcodes',
		icon: 'file:mallabe.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description:
			'Mallabe Barcodes is a utility tool that allows the generation & scanning of different barcodes, such as the popular QR code, UPC, EAN & others.',
		defaults: {
			name: 'Mallabe Barcodes',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'mallabeBarcodesApi',
				required: true,
			},
		],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Barcode',
						value: 'barcode',
					},
				],
				default: 'barcode',
				required: true,
			},

			// barcodes
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['barcode'],
					},
				},
				options: [
					{
						name: 'Generate Barcode',
						value: 'generateBarcode',
						description: 'Generate a barcode of different types such as UPC, EAN, and more',
						action: 'Generate Barcode',
					},
					{
						name: 'Generate QR Code',
						value: 'generateQrCode',
						description: 'Generate a QR code',
						action: 'Generate A QR Code',
					},
					{
						name: 'Scan Barcode',
						value: 'scanBarcode',
						description: 'Scan a QR code or barcode',
						action: 'Scan Barcode',
					}
				],
				default: 'generateQrCode',
			},

			...generateBarcodeFields,
			...generateQrCodeFields,
			...scanBarcodeFields
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length;
		const qs: IDataObject = {};
		let response;
		let responseData;
		let download;
		for (let i = 0; i < length; i++) {
			try {
				const resource = this.getNodeParameter('resource', 0);
				const operation = this.getNodeParameter('operation', 0);

				if (resource === 'barcode') {
					if (operation === 'generateBarcode') {
						const type = this.getNodeParameter('type', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string | undefined;
						download = this.getNodeParameter('download', i);

						const body = {
							type,
							message,
							webhookUrl
						};

						response = await mallabeBarcodesRequest.call(this, 'POST', '/v1/barcodes/generate', body, qs);
					}
					else if (operation === 'generateQrCode') {
						const message = this.getNodeParameter('message', i) as string;
						const size = this.getNodeParameter('size', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string | undefined;
						download = this.getNodeParameter('download', i);

						const body = {
							type: 'qrcode',
							message,
							size,
							webhookUrl
						};

						response = await mallabeBarcodesRequest.call(this, 'POST', '/v1/barcodes/generate', body, qs);
					}
					else if (operation === 'scanBarcode') {
						const type = this.getNodeParameter('type', i) as string;
						const url = this.getNodeParameter('url', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string | undefined;

						const body = {
							type,
							url,
							webhookUrl
						};

						response = await mallabeBarcodesRequest.call(this, 'POST', '/v1/barcodes/scan', body, qs);
					}

					if (download) {
						const output = this.getNodeParameter('output', i) as string;
						const buffer = (await mallabeBarcodesCdnRequest.call(
							this,
							response.data.url as string
						)) as Buffer;
						responseData = {
							json: response,
							binary: {
								[output]: await this.helpers.prepareBinaryData(buffer),
							},
						};
					} else {
						responseData = response;
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		if (download) {
			return [returnData as unknown as INodeExecutionData[]];
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
