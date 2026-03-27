import { env } from "../../config/env.js";
import { handleBadResponse } from "../../utils/http.js";

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

  await handleBadResponse(response, "Registration failed");

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
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await fetch(env.backServiceUrl + "/api/secure/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-service-token": env.backServiceToken,
    },
    body: JSON.stringify({ User_Email: username, User_Password: password }),
    });

  await handleBadResponse(response, "Login failed");

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
