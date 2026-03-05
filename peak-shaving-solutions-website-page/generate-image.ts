import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const prompt = `Genereer een realistische, high-end, industriële studio-opname van een geavanceerd LTO (Lithium Titanate Oxide) batterijsysteem. 
  Visuele elementen:
  1. Scherpstel-punt: Een set van 5 tot 7 blauwe, cilindrische LTO-cellen.
  2. Presentatie: De cellen zijn gemonteerd in een strak, zwart, opengewerkt aluminium serverrack of modulaire behuizing.
  3. Details: De bovenkant van de cellen toont professionele connectoren en een subtiel oplichtende blauwe status-LED. Op de zijkant van de unit is een klein, elegant PSS (Peak Shaving Solutions) logo te zien, samen met "LTO TECH" en "HIGH C-RATING".
  4. Achtergrond: Een wazige (bokeh) industriële setting, zoals een moderne fabriekshal of een computerruimte, met een abstracte weergave van oranje energie-flows.
  Stijl en belichting:
  - Een professionele productfoto met een ondiepe scherptediepte (shallow depth of field).
  - Koele, technische blauwtinten en warm, veiligheidsoranje voor de details.
  - Hoge resolutie, fotorealistisch en klaar voor een zakelijke B2B website.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "4:3"
        }
      }
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const buffer = Buffer.from(base64EncodeString, 'base64');
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        fs.writeFileSync(path.join(publicDir, 'lto-battery.png'), buffer);
        console.log('Image generated successfully');
        return;
      }
    }
    console.error('No image data found in response');
    process.exit(1);
  } catch (e) {
    console.error('Error generating image:', e);
    process.exit(1);
  }
}
main();
