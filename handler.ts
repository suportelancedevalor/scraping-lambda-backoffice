import axios from 'axios';
import { DynamoDB } from 'aws-sdk';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

interface GeocodeResponse {
    results: Array<{
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
    }>;
    status: string;
}

interface DynamoDBItem {
    street_address: string;
    number_address: string;
    neighborhood_address: string;
    city_address: string;
}

// Configuração do DynamoDB
const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = 'scraping-auction-items';

// Chave de API do Google Maps
const GOOGLE_MAPS_API_KEY = process.env.ENGINE_API_KEY;

// Função Lambda
export const gm_location = async (event: APIGatewayEvent, _context: Context, _callback: Callback) => {
    try {
        const uuid = event.queryStringParameters?.uuid;
        if (!uuid) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'UUID is required'
                })
            };
        }

        // Consulta ao DynamoDB usando o UUID
        const dynamoDbResult = await getAddressFromDynamoDB(uuid);
        if (!dynamoDbResult || !dynamoDbResult.street_address) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: `No item found for UUID: ${uuid}`
                })
            };
        }

        const address = `${dynamoDbResult.street_address}, 
                            ${dynamoDbResult.number_address},
                            ${dynamoDbResult.neighborhood_address},
                            ${dynamoDbResult.city_address}`

        // Consulta à API do Google Geocode usando o endereço retornado do DynamoDB
        const geocodeData = await getGeocodeFromGoogle(address);

        if (!geocodeData) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'No results found for the address.'
                })
            };
        }

        // Retorna apenas as coordenadas de latitude e longitude
        return {
            statusCode: 200,
            body: JSON.stringify({
                lat: geocodeData.lat,
                lng: geocodeData.lng
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal server error',
                error: error.message
            })
        };
    }
};

// Função auxiliar para buscar o endereço no DynamoDB usando o UUID
const getAddressFromDynamoDB = async (uuid: string): Promise<DynamoDBItem | null> => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: uuid
        }
    };

    try {
        const result = await dynamoDb.get(params).promise();
        console.error('result from DynamoDB:', result);
        return result.Item as DynamoDBItem;
    } catch (error) {
        console.error('Error fetching item from DynamoDB:', error);
        throw new Error('DynamoDB query failed');
    }
};

// Função auxiliar para fazer a consulta à API do Google Geocode
const getGeocodeFromGoogle = async (address: string): Promise<{ lat: number, lng: number } | null> => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await axios.get<GeocodeResponse>(url);

        if (response.data.status !== 'OK' || response.data.results.length === 0) {
            return null;
        }

        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
    } catch (error) {
        console.error('Error fetching geocode data from Google Maps API:', error);
        throw new Error('Google Geocode API query failed');
    }
};