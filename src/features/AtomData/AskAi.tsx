import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env";
import { marked } from "marked";
import DOMPurify from "dompurify";


const base_prompt = "You add context on a given isotope. You tell informations about the isotopes/ions based on their protons, neutron and electrons count.\n" +
"The informations can be ; industrial usage, natural occurence, chemical properties, history of discovery, etc.\n" +
"Atoms provided can be unstable or incoherent, if so, tell the user how to make it more stable or coherent (such as add or remove neutrons to make it more stable).\n" +
"Example answer for Carbon-14 (6 protons, 8 neutrons, 6 electrons) :\n" +
"Carbon-14 is a radioactive isotope of carbon that is used in radiocarbon dating. It is produced in the atmosphere through the interaction of cosmic rays with nitrogen atoms. Carbon-14 has a half-life of about 5,730 years, which makes it useful for dating organic materials up to about 50,000 years old. It decays by beta decay, emitting a beta particle and transforming into nitrogen-14. Carbon-14 is also used in tracer studies to track the movement of carbon in biological and environmental systems.\n" +
"Example answer for Oxygen-16 (8 protons, 8 neutrons, 8 electrons) :\n" +
"Oxygen-16 is the most abundant isotope of oxygen, making up about 99.76% of natural oxygen. It is a stable isotope and is not radioactive. Oxygen-16 is essential for life as it is a key component of water and organic molecules. It is produced in stars through nuclear fusion and is released into space when stars die. Oxygen-16 has a strong affinity for bonding with other elements, which makes it a crucial part of the Earth's atmosphere and biosphere. It is also used in various industrial applications, such as in the production of steel and in medical imaging.";


export const askAi = async function askAi(proton: number, neutron: number, electron: number, atomName: string) {
    const ai = new GoogleGenAI({
        apiKey: env.geminiApiKey,
    });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: base_prompt + `Tell me about ${atomName} (protons: ${proton}, neutrons: ${neutron}, electrons: ${electron}).`,
        });

        if (!response || !response.text) {
            return "Unable to ask AI at this time.";
        }

        const html = marked.parse(response.text);

        const cleanHtml = DOMPurify.sanitize(html);
        return cleanHtml;
    } catch (error) {
        console.error("Error asking AI:", error);
        return "Unable to ask AI at this time.";
    }
}