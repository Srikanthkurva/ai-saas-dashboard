import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    name: string
    email: string
}

interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    imageUrl?: string
    timestamp: number
}

interface AppState {
    user: User | null
    isAuthenticated: boolean
    theme: 'light' | 'dark'
    sidebarOpen: boolean
    chatHistory: ChatMessage[]
    login: (user: User) => void
    logout: () => void
    toggleTheme: () => void
    toggleSidebar: () => void
    addMessage: (message: ChatMessage) => void
    clearChat: () => void
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            theme: 'dark',
            sidebarOpen: true,
            chatHistory: [],
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
            toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            addMessage: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
            clearChat: () => set({ chatHistory: [] }),
        }),
        {
            name: 'ai-saas-storage',
            partialize: (state) => ({ theme: state.theme, user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
)
