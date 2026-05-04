import { handleBadResponse } from "../../utils/http";
import { env } from "../../config/env";

export const SaveAtom = async (user: any, proton: number, neutron: number, electron: number, atomName: string) => {
    const response = await fetch(env.backServiceUrl + "/api/atom/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-service-token": env.backServiceToken,
          },
          body: JSON.stringify({ User_Id: user.User_Id, Atom_proton: proton, Atom_neutron: neutron, Atom_electron: electron, Atom_name: atomName}),
        });

        const data = await response.json();

    if (response.ok) {
        alert(`${atomName} saved successfully!`);
    } else {
        console.log("Failed to save atom:", data);
        alert("Failed to save atom: " + data.message);
        await handleBadResponse(response, "Failed to save atom");
    }
}
