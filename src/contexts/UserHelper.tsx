
import { env } from "../config/env.js";

// Verify authToken with backend
  const verifyAuth = async (token: string | null) => {
    if (!token) {
      return;
    }

    try {
      const base = env.backServiceUrl || "";
      const url = base + "/api/secure/verify";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-service-token": env.backServiceToken,
        },
      });

      if (!res.ok) {
        // invalid token
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.error("verifyAuth error", e);
    }
  };

export { verifyAuth };