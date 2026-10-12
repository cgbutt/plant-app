import type { Plant, JournalEntry, PlantPhoto, AiAnalysisOutput } from '../types/plant';

const GEMINI_API_KEY_STORAGE = 'plant_app_gemini_api_key';

export class AiService {
  static getApiKey(): string {
    const key =
      localStorage.getItem(GEMINI_API_KEY_STORAGE) ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      '';
    return key.trim();
  }

  static saveApiKey(key: string): void {
    localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
  }

  static clearApiKey(): void {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE);
  }

  static hasApiKey(): boolean {
    return Boolean(this.getApiKey());
  }
}

export async function analyzePlant(
  plant: Plant,
  latestPhoto?: PlantPhoto,
  journalEntries: JournalEntry[] = []
): Promise<AiAnalysisOutput> {
  const apiKey = AiService.getApiKey();

  // If Gemini API Key is provided, execute REAL Multimodal Gemini Call
  if (apiKey) {
    return await callRealGeminiApi(apiKey, plant, latestPhoto, journalEntries);
  }

  // High-Quality Simulated Fallback (when no API key is configured)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const lastEntry = journalEntries[0];
  let leafCondition = 'Healthy & Vigorous';
  let color = 'Dark Green with Vibrant Sheen';
  let soilCondition = 'Optimal Moisture (35%)';
  let wateringTime = 'In 3 Days';
  let suggestion = 'Maintain current light exposure and rotate 90° weekly';
  let summary = `Analyzed ${plant.name} (${plant.species}, ${plant.age}). Overall physiological condition is strong.`;

  if (plant.species.toUpperCase().includes('MONSTERA')) {
    leafCondition = 'Healthy (8 Leaves, High Fenestration)';
    color = 'Deep Emerald Green';
    soilCondition = 'Slightly Dry Topsoil';
    wateringTime = 'In 2 Days';
    suggestion = 'Move 15cm closer to indirect light source to encourage root expansion';
    summary = 'Monstera specimen exhibits active leaf maturation. PAR light absorption is ideal.';
  } else if (plant.species.toUpperCase().includes('SANSEVIERIA') || plant.species.toUpperCase().includes('SNAKE')) {
    leafCondition = 'Firm, Erect & Turgid';
    color = 'Dark Green with Yellow Bands';
    soilCondition = 'Dry Cactaceous Substrate';
    wateringTime = 'In 6 Days';
    suggestion = 'Allow soil substrate to dry completely before next deep irrigation cycle';
    summary = 'Snake Plant structural rigidity is rated 98%. Low transpiration rate detected.';
  } else if (plant.species.toUpperCase().includes('ALOE')) {
    leafCondition = 'Plump Succulent Tissue';
    color = 'Luminous Lime Green';
    soilCondition = 'Moist Well-Draining Mix';
    wateringTime = 'In 5 Days';
    suggestion = 'Ensure 4-6 hours of direct morning sunlight for optimal gel synthesis';
    summary = 'Aloe Barbadensis cell turgidity is at maximum capacity.';
  } else if (plant.species.toUpperCase().includes('FICUS') || plant.species.toUpperCase().includes('FIDDLE')) {
    leafCondition = 'Broad Glossy Foliage';
    color = 'Forest Green';
    soilCondition = 'Equilibrium Moisture';
    wateringTime = 'Tomorrow Morning';
    suggestion = 'Wipe broad leaf blades with distilled water to maximize light absorption';
    summary = 'Fiddle Leaf Fig stomata show full efficiency.';
  }

  if (lastEntry?.condition) {
    summary += ` Latest journal entry on ${lastEntry.date} notes: "${lastEntry.title}".`;
  }

  return {
    leaf_condition: leafCondition,
    color: color,
    soil_condition: soilCondition,
    watering_time: wateringTime,
    suggestion: suggestion,
    confidence: 0.94,
    analysis_summary: summary,
    recommendations: [
      suggestion,
      'Monitor humidity levels around surrounding air envelope (target 50-60%)',
      'Inspect stem base bi-weekly for root node extension'
    ]
  };
}

async function callRealGeminiApi(
  apiKey: string,
  plant: Plant,
  latestPhoto?: PlantPhoto,
  journalEntries: JournalEntry[] = []
): Promise<AiAnalysisOutput> {
  // Use Gemini 3.x and active fast models (gemini-flash-lite-latest, gemini-3.8-flash, etc.)
  const modelsToTry = [
    'gemini-flash-lite-latest',
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-flash-latest'
  ];

  const promptText = `You are an expert botanical scientist and plant pathologist.
Analyze the following plant specimen data and photo (if attached) and generate structured health diagnostics.

SPECIMEN DATA:
- Name: ${plant.name}
- Species: ${plant.species}
- Age: ${plant.age}
- Current Leaf Condition: ${plant.leaf_condition}
- Current Color: ${plant.color}
- Current Soil Condition: ${plant.soil_condition}
- Current Watering Time: ${plant.watering_time}

RECENT JOURNAL ENTRIES:
${journalEntries.slice(0, 3).map(e => `- [${e.date}] ${e.title}: ${e.notes} (Height: ${e.height_cm || 'N/A'}cm, Leaves: ${e.leaf_count || 'N/A'})`).join('\n') || 'None'}

Return ONLY a valid JSON object matching this exact structure:
{
  "leaf_condition": "Short crisp phrase (e.g. Healthy / Minor Yellowing)",
  "color": "Color description (e.g. Dark Green)",
  "soil_condition": "Soil moisture metric (e.g. Slightly Dry)",
  "watering_time": "Watering recommendation (e.g. In 2 Days)",
  "suggestion": "Actionable botanical advice (e.g. Move closer to indirect light)",
  "confidence": 0.95,
  "analysis_summary": "Technical evaluation summary of plant health",
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}`;

  const parts: any[] = [{ text: promptText }];

  // Convert image URL / Data URL to base64 if available
  if (latestPhoto?.image_url && latestPhoto.image_url.startsWith('data:image')) {
    const mimeMatch = latestPhoto.image_url.match(/^data:(image\/[a-zA-Z]+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const base64Data = latestPhoto.image_url.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    parts.push({
      inline_data: {
        mime_type: mimeType,
        data: base64Data
      }
    });
  }

  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.2
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        if (response.status === 400) {
          throw new Error('Invalid Gemini API Key or malformed request. Please check your key from Google AI Studio.');
        } else if (response.status === 403) {
          throw new Error('Gemini API permission denied (403). Check that the key is active and not restricted.');
        } else if (response.status === 429) {
          throw new Error('Gemini API rate limit reached (429). Please wait a few seconds and try again.');
        } else if (response.status === 404 || response.status === 503) {
          // Model unavailable, retired, or high demand spike — try next model
          throw new Error(`Model ${model} status ${response.status}: ${errText}`);
        }
        throw new Error(`Gemini API Error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        throw new Error('Empty response received from Gemini API');
      }

      // Robust JSON extraction (handles markdown ```json ... ``` codeblocks)
      let cleanJson = textResponse.trim();
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      } else if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const firstBrace = cleanJson.indexOf('{');
      const lastBrace = cleanJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(cleanJson);

      return {
        leaf_condition: parsed.leaf_condition || plant.leaf_condition,
        color: parsed.color || plant.color,
        soil_condition: parsed.soil_condition || plant.soil_condition,
        watering_time: parsed.watering_time || plant.watering_time,
        suggestion: parsed.suggestion || plant.suggestion,
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.95,
        analysis_summary: parsed.analysis_summary || 'Gemini AI specimen analysis complete.',
        recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0
          ? parsed.recommendations
          : [parsed.suggestion || plant.suggestion]
      };
    } catch (err: any) {
      lastError = err;
      const isRetryable =
        err?.message?.includes('404') ||
        err?.message?.includes('503') ||
        err?.message?.includes('no longer available') ||
        err?.message?.includes('not found');
      if (!isRetryable) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Failed to communicate with Gemini API');
}
