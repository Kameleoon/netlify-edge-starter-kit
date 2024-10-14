import { KameleoonClient } from "@kameleoon/nodejs-sdk";
import { Context } from "@netlify/edge-functions";
import { EdgeEventSource } from "./eventSource";
import { EdgeVisitorCodeManager } from "./visitorCodeManager";
import { EdgeRequester } from "./requester";

// -- Define constant values
const SITE_CODE = "my_site_code";
const CLIENT_ID = "my_client_id";
const CLIENT_SECRET = "my_client_secret";
const FEATURE_KEY = "my_feature_key";

// -- Cache the Kameleoon client between requests
let client: KameleoonClient;

export default async function handler(_: Request, { cookies }: Context) {
  if (!client) {
    client = new KameleoonClient({
      siteCode: SITE_CODE,
      credentials: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      },
      externals: {
        requester: new EdgeRequester(),
        eventSource: new EdgeEventSource(),
        visitorCodeManager: new EdgeVisitorCodeManager(),
      },
    });
  }

  if (!client.isInitialized()) {
    await client.initialize();
  }

  // -- Get the visitor code using the custom visitor code manager
  //    which will read Kameleoon visitor code from request cookies or generate a new one
  //    and set it to the response cookies
  const visitorCode = client.getVisitorCode({
    input: cookies,
    output: cookies,
  });

  const variation = client.getFeatureFlagVariationKey(visitorCode, FEATURE_KEY);

  return new Response(
    `Hello, Netlify! Your visitor code is "${visitorCode}", your variation is "${variation}"`
  );
}
