import { IExternalEventSource } from "@kameleoon/nodejs-sdk";

// -- Custom Implementation of Kameleoon Event Source
//    for Netlify Edge Function
export class EdgeEventSource implements IExternalEventSource {
  // - Netlify Edge Functions do not support Server Sent Events (SSE)
  //   If you see this error - make sure that your project (siteCode) doesn't have Real Time Updates
  //   option enabled on the Kameleoon Platform
  public open() {
    throw new Error(
      "Real Time Updates are not supported in Netlify Edge Worker"
    );
  }

  public close() {}
}
