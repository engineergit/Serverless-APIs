import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
/**
 * these two methods are used in every lambda function
 * @param event 
 * jab b api gateway apka lambda run karta ha specific tarah ka event 
 * sendk karta ha, it depends on service we are using
 * current we are using service apigateway so i have imported type 
 * ApiGateway accoridnly
 * e.g Appsync will send event differently
 * @param context 
 * zyada use nahi karty but is men sari details aati ha kitna chaln ha 
 * kitna lambda chal gya ha , function name , function version, log etc
 * mostly event hi use hota h 
 *  
 */
export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  console.log("request", event);
  console.log("context", context);

  return {
    statusCode: 200,
    body: `Hello CDK, Sohail has hit ${event.path} his first cdk \n`,
    headers: { "content-type": "text/plain" }

  }
}
