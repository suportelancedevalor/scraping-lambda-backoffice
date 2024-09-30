import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
const request = require('request'); // Imports the module for use

export const hello: APIGatewayProxyHandler = async (event, _context) => {    
    let address = '1301 S University Parks Dr, Waco, TX';
    let targetUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.ENGINE_API_KEY}`
    
    // request call with parameters
    const result = request(targetUrl, function (err, body) {
        console.log('error:', err); // prints the error if one occurred
        let geoLocation = JSON.parse(body);
        let mssg = `lat: ${geoLocation.results[0].geometry.location.lat} long: ${geoLocation.results[0].geometry.location.lng}`;
        console.log(mssg);
    }).await()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!' + result,
            input: event,
        }),
    };
}

export const nuvem: Handler = async (mensagem: String, context: Context) => {
    context.succeed('Mensagem da Nuvem: ' + mensagem);
}

export const novoArquivoJSON: Handler = async (event: APIGatewayProxyEvent, _context: Context) => {
  console.info(event);
}

const runner = async() => {
    try {
    const response = await firstRequest();
    // At this point you can assume that the first request is completed successfully and you can extract what you need from the response.
    const number = response.number 
    await secondRequest(number);
    } catch(error) {
        console.log(error):
    }
}