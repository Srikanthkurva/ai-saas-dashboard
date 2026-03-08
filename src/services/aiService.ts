import OpenAI from 'openai';
import { getMockResponse } from '../utils/mockResponses';

export const getAIResponse = async (
    prompt: string, 
    isImage: boolean = false
): Promise<{ content: string; imageUrl?: string }> => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey || apiKey.includes('your_api_key')) {
        const warning = "⚠️ [System: OpenRouter API Key not configured. Using Mock Data]";
        if (isImage) {
            return {
                content: `${warning}\n\nI've generated a conceptual image based on: "${prompt}". To get real generation, please add your API key to the .env file.`,
                imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
            };
        }
        return { content: `${warning}\n\n${getMockResponse(prompt)}` };
    }

    // Initialize client inside to ensure it uses latest env values
    const openrouter = new OpenAI({
        apiKey: apiKey.trim(),
        baseURL: 'https://openrouter.ai/api/v1',
        dangerouslyAllowBrowser: true,
        defaultHeaders: {
            "HTTP-Referer": window.location.origin,
            "X-Title": "AI SaaS Dashboard",
        }
    });

    try {
        if (isImage) {
            // Clean the prompt to remove conversational filler for better generation
            const cleanPrompt = prompt.toLowerCase()
                .replace(/can you (create|generate|draw|show) (me )?(a |an |one )?/g, '')
                .replace(/(please )?(generate|create|draw|show) (me )?(a |an |one )?image of /g, '')
                .replace(/\?$/, '')
                .trim();

            const encodedPrompt = encodeURIComponent(cleanPrompt || prompt);
            const seed = Math.floor(Math.random() * 1000000);
            
            return {
                content: `🖼️ **Visualizing your request...** \n\nI've generated a conceptual representation of: "${cleanPrompt || prompt}". \n\n*Using the SANA-1024 latent diffusion model for high-fidelity rendering.*`,
                imageUrl: `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=sana`
            };
        } else {
            const response = await openrouter.chat.completions.create({
                model: "nvidia/nemotron-3-nano-30b-a3b:free",
                messages: [
                    { role: "system", content: "You are a helpful AI assistant for a SaaS dashboard. You help with code, architecture, and general questions." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
            });
            return {
                content: response.choices[0].message.content || "I'm sorry, I couldn't generate a response."
            };
        }
    } catch (error: any) {
        console.error('AI Service Error:', error);

        // Specific handling for 401 errors (Invalid API Key)
        if (error.status === 401 || (error.message && error.message.includes('401'))) {
            return {
                content: `❌ **API Key Error**: OpenRouter returned a 401 (Unauthorized) error. This usually means the API key in your .env file is invalid, expired, or hasn't been recognized yet. \n\n**Current Key Prefix:** \`${apiKey.substring(0, 10)}...\` \n\nPlease ensure you have restarted your dev server after updating the key.`
            };
        }

        return {
            content: `Error: ${error.message || 'Failed to fetch response from OpenAI'}. Falling back to mock output.\n\n${getMockResponse(prompt)}`
        };
    }
};
