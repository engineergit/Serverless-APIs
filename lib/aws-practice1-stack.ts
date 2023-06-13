import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsPractice1Stack extends cdk.Stack {
  /**
   * stack k props optional hoty hen but construct k depend karta ha knsa construct bana rahy hen 
   **/
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // creating lambda function with L2 constructs
    const lambdaFnRestApi = new cdk.aws_lambda.Function(this, "sohailRestApi", {
      functionName: 'sohailRestApi',
      runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
      // code ka batana pary ga kis file men para hua ha to 
      code: cdk.aws_lambda.Code.fromAsset("lambda"),
      // us folder ki kis file men para hua ha with .handler extesnion
      handler: 'index.handler'
    })

    /**
     * creating rest api with lambda function in
     * stack will be its scope as stack is also constrct itself
     */
    const api = new cdk.aws_apigateway.LambdaRestApi(this, "RestApi", {
      handler: lambdaFnRestApi,
      /**
       * Proxy
       * if it is false then we have to defined its access method otherwise it don't work with 
       * lambda function, so it shows error on wrong route name and don't call lambda.
       * in this way we can limited our resource and save money.
       * 
       */
      proxy: false // default: true, if false, then need to explicitly define the API model using addResource and addMethod
    })

    const  items = api.root.addResource('items');
    items.addMethod('GET')
    items.addMethod('POST')

    const item = items.addResource(`{item}`);
    item.addMethod('GET');


    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsPractice1Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
