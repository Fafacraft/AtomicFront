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