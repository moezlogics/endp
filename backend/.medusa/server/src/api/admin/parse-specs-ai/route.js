"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
async function POST(req, res) {
    const body = (req.body || {});
    const { text, fields } = body;
    if (!text || typeof text !== "string" || !text.trim()) {
        return res.status(400).json({ error: "text is required" });
    }
    if (!fields || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ error: "fields schema array is required" });
    }
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || process.env.OPENAI_ALT_MODEL || "gpt-4o-mini";
    if (!apiKey) {
        return res.status(500).json({ error: "OPENAI_API_KEY is not configured in backend environment." });
    }
    // Construct a description of each field for the model to parse.
    // We include keys, labels, types, options, and units.
    const fieldsDesc = fields.map(f => ({
        key: f.key,
        label: f.label,
        type: f.type,
        options: f.options || undefined,
        unit: f.unit || undefined
    }));
    const systemPrompt = `You are a structured technical specifications parser. Your job is to extract technical specs from the raw text provided by the user and map them to the requested keys.
Here is the schema of allowed fields to parse:
${JSON.stringify(fieldsDesc, null, 2)}

Instructions:
1. Return a JSON object whose keys EXACTLY match the field keys in the schema.
2. **Smart Select Matching for Dropdowns (type: 'select')**:
   - If the raw text mentions multiple values for a select field (e.g., multiple RAM variants like '8GB or 12GB', storage variants like '256GB / 512GB', or multiple colors/sensors), you MUST look at the allowed 'options' array in the schema.
   - Match each separate value to its exact option in the schema and join them with a comma and space. For example, if options is ["8GB RAM", "12GB RAM", "16GB RAM"] and text says "8GB/12GB RAM", output "8GB RAM, 12GB RAM". Do NOT output a single custom combined string like "8GB/12GB RAM" or "8GB, 12GB RAM" (where RAM is missing from one part), as that creates duplicate or polluted options in the template.
   - If a value is mentioned in the specs but is not in the options list, clean it up to match the format/style of existing options and output it.
3. **Boolean Parsing**: For 'boolean' type fields, return true if the feature is explicitly or implicitly present/supported (e.g. 5G bands listed implies 5G Support is true; "PTA approved" or local certification listed implies PTA Approved is true), false if explicitly absent/unsupported, or do not include the key if there is no mention or inference possible.
4. **Number & Text Parsing**: For 'number' type fields, extract the numeric value as a number. For 'text' type fields, extract the clean value.
5. **Date Parsing**: Format date values into clean readable strings (e.g. "October 2026").
6. **PUBG FPS Estimation Guide (pubg_fps field)**:
   Raw specs sheets rarely explicitly mention PUBG performance. You must estimate the PUBG FPS dropdown value ("30FPS", "40FPS", "50FPS", "60FPS", "90FPS", "120FPS") based on the device's chipset or GPU:
   - Flagships (Snapdragon 8 Elite Gen 5, Snapdragon 8 Gen 3, Apple A20 Pro, Apple A18 Pro, Google Tensor G5, Dimensity 9300/9400) -> Output "120FPS" or "90FPS".
   - Premium Mid-range (Dimensity 8500 Ultra, Dimensity 8300 Ultra, Snapdragon 8 Gen 2, Snapdragon 8 Gen 1, Snapdragon 7+ Gen 3) -> Output "90FPS".
   - Mid-range (Helio G100 Ultimate, Helio G200, Dimensity 7200, Snapdragon 7 Gen 3, Exynos 1480, Unisoc T7250) -> Output "60FPS".
   - Budget/Entry (Helio G99, Unisoc T616, lower-end Snapdragon/Helio) -> Output "40FPS" or "30FPS".
7. **Exhaustive Completion**: Fill out 100% of all fields in the schema. Do not leave fields blank or omit keys if they can be found or inferred from the text.
8. Do not invent any keys not listed in the schema. Only extract/deduce details matching facts in the raw specifications.
9. Output ONLY a valid JSON object matching this structure. No explanation, no markdown backticks, no wrap.`;
    try {
        const isGpt5 = /^gpt-5/i.test(model) || /^o[0-9]/i.test(model);
        const requestBody = {
            model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: text }
            ],
            response_format: { type: "json_object" }
        };
        if (!isGpt5) {
            requestBody.temperature = 0.1;
        }
        else {
            requestBody.max_completion_tokens = 2000;
        }
        const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        if (!apiRes.ok) {
            const errorText = await apiRes.text();
            let cleanError = errorText;
            try {
                const parsed = JSON.parse(errorText);
                if (parsed.error && parsed.error.message) {
                    cleanError = parsed.error.message;
                }
            }
            catch (e) { }
            return res.status(400).json({ error: `OpenAI API returned error: ${apiRes.status} ${apiRes.statusText} - ${cleanError}` });
        }
        const result = await apiRes.json();
        const content = result.choices?.[0]?.message?.content;
        if (!content) {
            return res.status(400).json({ error: "Empty response from OpenAI Chat Completion" });
        }
        const specs = JSON.parse(content);
        return res.json({ specs });
    }
    catch (err) {
        return res.status(400).json({ error: `Failed to parse specifications: ${err.message}` });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3BhcnNlLXNwZWNzLWFpL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsb0JBc0dDO0FBdEdNLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUNoRSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFzQyxDQUFBO0lBQ2xFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFBO0lBRTdCLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7UUFDdEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDN0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxpQ0FBaUMsRUFBRSxDQUFDLENBQUE7SUFDM0UsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFBO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksYUFBYSxDQUFBO0lBRXZGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDLE1B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