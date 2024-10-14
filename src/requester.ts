import {
  IExternalRequester,
  KameleoonResponseType,
  SendRequestParametersType,
  RequestType,
} from "@kameleoon/nodejs-sdk";

// -- Custom Implementation of Kameleoon Requester
//    for Netlify Edge Function
export class EdgeRequester implements IExternalRequester {
  public async sendRequest<T extends RequestType>({
    url,
    parameters,
  }: SendRequestParametersType<T>): Promise<KameleoonResponseType> {
    return await fetch(url, parameters);
  }
}
