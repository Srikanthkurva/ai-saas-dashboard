import { useMutation } from '@tanstack/react-query';
import { getAIResponse } from '../services/aiService';
import { useStore } from '../store/useStore';

export const useChat = () => {
    const { addMessage } = useStore();

    const chatMutation = useMutation({
        mutationFn: async ({ content, isImage }: { content: string; isImage: boolean }) => {
            // Add user message to store immediately (Optimistic UI)
            const userMsg = {
                id: Date.now().toString(),
                role: 'user' as const,
                content,
                timestamp: Date.now()
            };
            addMessage(userMsg);

            // Fetch AI response
            return getAIResponse(content, isImage);
        },
        onSuccess: (response) => {
            // "Normalize" and add the assistant message
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant' as const,
                content: response.content,
                imageUrl: response.imageUrl,
                timestamp: Date.now()
            };
            addMessage(aiMsg);
        },
        onError: (error: any) => {
            console.error("Chat Mutation Error:", error);
            const errorMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant' as const,
                content: `Sorry, I encountered an error: ${error.message || 'Unknown error'}. Please try again.`,
                timestamp: Date.now()
            };
            addMessage(errorMsg);
        }
    });

    return {
        sendMessage: (content: string, isImage: boolean) => chatMutation.mutate({ content, isImage }),
        isLoading: chatMutation.isPending,
        error: chatMutation.error,
    };
};
