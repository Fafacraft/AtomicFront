import { env } from "../../config/env.js";

async function registerUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch(env.backServiceUrl + "/api/secure/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-service-token": env.backServiceToken,
    },
    body: JSON.stringify({
      User_Username: username,
      User_Role: "user",
      User_Email: email,
      User_Password: password,
    }),
  });

  if (!response.ok) {
    // Read body once as text, then try to parse as JSON.
    const bodyText = await response.text();
    let errBody: any;
    try {
      errBody = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      errBody = { message: bodyText || "Registration failed" };
    }

    const message = errBody?.message || "Registration failed";
    const err: any = new Error(message);
    err.status = response.status;
    err.body = errBody;

    throw err;
  }

  const data = await response.json();

  // API returns { user: {...}, accessToken: "..." }
  // Store token and user info in sessionStorage for future requests
  if (data?.accessToken) {
    sessionStorage.setItem("authToken", data.accessToken);
  }
  if (data?.user) {
    try {
      sessionStorage.setItem("user", JSON.stringify(data.user));
    } catch {
      // ignore serialization errors
    }
  }

  return data;
}

async function loginUser({
  User_Email,
  User_Password,
}: {
  User_Email: string;
  User_Password: string;
}) {
  const response = await fetch(env.backServiceUrl + "/api/secure/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-service-token": env.backServiceToken,
    },
    body: JSON.stringify({ User_Email, User_Password }),
  });

  if (!response.ok) {
    const bodyText = await response.text();
    let errBody: any;
    try {
      errBody = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      errBody = { message: bodyText || "Login failed" };
    }

    const message = errBody?.message || `Login failed (status ${response.status})`;
    const err: any = new Error(message);
    err.status = response.status;
    err.body = errBody;
    throw err;
  }

  const data = await response.json();

  // API returns { user: {...}, accessToken: "..." }
  if (data?.accessToken) {
    sessionStorage.setItem("authToken", data.accessToken);
  }
  if (data?.user) {
    try {
      sessionStorage.setItem("user", JSON.stringify(data.user));
    } catch {
      // ignore
    }
  }

  return data;
}

export { loginUser, registerUser };
