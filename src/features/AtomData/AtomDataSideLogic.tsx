import { handleBadResponse } from "../../utils/http";
import { env } from "../../config/env";

const stabilityColors = [
    ["unknown", "#9e9e9e"],
    ["milisecond", "#ec3325"],
    ["second", "#ff5722"],
    ["minute", "#ff9800"],
    ["hour", "#ffc107"],
    ["day", "#ffeb3b"],
    ["year", "#cddc39"],
    ["Stable", "#4caf50"],
];

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

export const getStabilityColor = (stability: string): string => {
   for (const [key, color] of stabilityColors) {
        if (stability.includes(key)) {
            return color;
        }
    }

    return "white"; 
}