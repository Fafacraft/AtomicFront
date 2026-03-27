export async function handleBadResponse(response: Response, errorMessage: string = "") {
    if (!response.ok) {
      const bodyText = await response.text();
      let errBody: any;
      try {
        errBody = bodyText ? JSON.parse(bodyText) : null;
      } catch {
        errBody = { message: bodyText || errorMessage || "An error occurred" };
      }

      const message = errBody?.message || errorMessage + ` (status ${response.status})`;
      const err: any = new Error(message);
      err.status = response.status;
      err.body = errBody;
      throw err;
    }
}
