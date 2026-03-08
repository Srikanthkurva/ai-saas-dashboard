import OpenAI from 'openai';
import { getMockResponse } from '../utils/mockResponses';

const openrouter = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    baseURL: 'https://openrouter.ai/api/v1',
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:5173", // Optional, for OpenRouter rankings
        "X-Title": "AI SaaS Dashboard", // Optional
    }
});

export const getAIResponse = async (prompt: string, isImage: boolean = false): Promise<{ content: string; imageUrl?: string }> => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    // Fallback if no API key is provided
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

    try {
        if (isImage) {
            // Note: OpenRouter supports some image models, but for this demo 
            // and free key use case, we'll keep a polished placeholder or fallback.
            return {
                content: `I've analyzed your request for an image of: "${prompt}". While my current free-tier configuration is optimized for text, I've visualized a conceptual representation for you.`,
                imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=1200'
            };
        } else {
            const response = await openrouter.chat.completions.create({
                model: "stepfun/step-3.5-flash:free",
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
        return {
            content: `Error: ${error.message || 'Failed to fetch response from OpenAI'}. Falling back to mock output.\n\n${getMockResponse(prompt)}`
        };
    }
};
