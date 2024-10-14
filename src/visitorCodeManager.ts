import {
  GetDataCustomParametersType,
  IExternalCustomVisitorCodeManager,
  SetDataCustomParametersType,
} from "@kameleoon/nodejs-sdk";
import { Context, Cookie } from "@netlify/edge-functions";

// -- Custom Implementation of Kameleoon Visitor Code Manager
//    for Netlify Edge Function
export class EdgeVisitorCodeManager
  implements IExternalCustomVisitorCodeManager
{
  // - Get the visitor code from the Netlify Context cookies
  public getData({ input, key }: GetDataCustomParametersType): string | null {
    this.validateCookie(input, "input");

    return input.get(key);
  }

  // - Set the visitor code to the Netlify Context cookies
  public setData({
    key,
    visitorCode,
    domain,
    maxAge,
    path,
    output,
  }: SetDataCustomParametersType): void {
    this.validateCookie(output, "output");

    const cookie: Cookie = {
      name: key,
      value: visitorCode,
      maxAge,
      path,
      domain: domain || undefined,
    };

    output.set(cookie);
  }

  private validateCookie(
    value: unknown,
    type: string
  ): asserts value is Context["cookies"] {
    const isValid =
      typeof value === "object" &&
      value.hasOwnProperty("get") &&
      value.hasOwnProperty("set");

    if (!isValid) {
      throw new Error(
        `Invalid argument "${type}" for "getVisitorCode". Please provide a valid "${type}" - a cookie with the type of \`Context['cookies']\` found in the handler's "context"`
      );
    }
  }
}
