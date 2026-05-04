import { env } from "../../config/env";
import { handleBadResponse } from "../../utils/http";

export const GetAllAtomsForUser = async (user: any) => {
    const response = await fetch(env.backServiceUrl + "/api/atom/user/" + user.User_Id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-service-token": env.backServiceToken,
        },
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        console.log("Failed to fetch atoms:", data);
        alert("Failed to fetch atoms: " + data.message);
        await handleBadResponse(response, "Failed to fetch atoms");
    }
}

export const deleteAtom = async (atomId: number) => {
    const response = await fetch(env.backServiceUrl + "/api/atom/" + atomId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-service-token": env.backServiceToken,
        },
    });

    if (response.ok) {
        return;
    } else {
        alert("Failed to delete atom");
        await handleBadResponse(response, "Failed to delete atom");
    }
}