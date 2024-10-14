# Kameleoon Netlify Edge Starter Kit (Draft)

Kameleoon Netlify Edge Starter Kit uses [Kameleoon NodeJS SDK][sdk] to provide out out-of-the-box experimentation and feature flagging on the edge.

## Contents

- [Pre-requisites](#pre-requisites)
- [Getting started](#getting-started)
- [Commands](#commands)
- [Technical details](#technical-details)
- [Additional resources](#additional-resources)

## Pre-requisites

- [Kameleoon Account][kameleoon]
- [Netlify Account][netlify]

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/Kameleoon/netlify-edge-starter-kit
```

2. Install node modules:

```bash
npm install
```

3. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

4. Update the variables in `src/handler.ts`:

- `SITE_CODE` - Site code that can be found on the [Kameleoon Platform][kameleoon].
- `CLIENT_ID` and `CLIENT_SECRET` - Client ID and Client Secret that can be found in your [Kameleoon Profile][kameleoon-users].
- `FEATURE_KEY` - Feature key that can be found on the [Kameleoon Feature Flag Dashboard][kameleoon-ff].

5. Test and debug the edge function locally

```bash
npm run dev
```

6. Deploy the edge function to Netlify

```bash
npm run deploy
```

## Commands

- `npm run clean` - Remove the `dist` folder.
- `npm run deploy` - Deploy the edge function to Netlify.
- `npm run build` - Build the edge function.
- `npm run dev` - Run the edge function locally using Netlify cli.

## Technical details

The core integration logic is located in `src/handler.ts` file. The edge handler function uses the [Kameleoon NodeJS SDK][sdk] to fetch the feature flags and experiments from the [Kameleoon platform][kameleoon] initialize the SDK and evaluate the flags and experiments.

There are also several additional files which implement external SDK dependency to make it compatible with Netlify Edge Functions and grant some additional features:

- `src/eventSource.ts` - `EventSource` implementation for Netlify Edge. Unfortunately, Netlify Edge Functions do not support `EventSource` out of the box, so the implementation will just give out a warning message in the console if you try to use the unsupported [Real Time Update][kameleoon-sse] feature.
- `src/requester.ts` - `Requester` implementation uses `fetch` API provided within Netlify Edge Functions to perform any request.
- `src/visitorCodeManager.ts` - `VisitorCodeManager` implementation for Netlify Edge allows for smooth `getVisitorCode` operations, it reads `kameleoonVisitorCode` from request cookie and if it wasn't found it generates a new one and sets it in the response cookie.

Error handling is omitted in the code for the sake of simplicity, however it's always a good idea to handle potential SDK errors gracefully, read more - [SDK Error Handling][sdk-error].

## Additional resources

- [Kameleoon NodeJS SDK Documentation][sdk]
- [Kameleoon Platform][kameleoon]
- [Netlify Edge Functions][netlify-edge]

[sdk]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk/
[sdk-error]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk/#error-handlinghttps://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/nodejs-sdk/#error-handling
[kameleoon]: https://app.kameleoon.com
[kameleoon-sse]: https://developers.kameleoon.com/feature-management-and-experimentation/technical-considerations#streaming-premium-option
[netlify]: https://www.netlify.com/
[netlify-edge]: https://docs.netlify.com/edge-functions/overview/
[kameleoon-users]: https://app.kameleoon.com/users/dashboard
[kameleoon-ff]: https://app.kameleoon.com/featureFlags/dashboard
