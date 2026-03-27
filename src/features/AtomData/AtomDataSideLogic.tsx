import { handleBadResponse } from "../../utils/http";
import { env } from "../../config/env";

export const getStability = async (proton: number, neutron: number): Promise<string> => {
    const response = await fetch(env.backServiceUrl + "/api/atom/stability?proton=" + proton + "&neutron=" + neutron, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-service-token": env.backServiceToken,
      },
    });
    await handleBadResponse(response, "Failed to fetch stability data");

    const data = await response.json();
    return data.stability; // API returns { stability: "Stable" } or similar
  }