import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Sparkles, Trash2, Maximize2, Minimize2, Paperclip, Mic, Globe, Image as ImageIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useStore } from '../../store/useStore'
import { cn } from '../../utils/utils'
import { useChat } from '../../hooks/useChat'
import { MarkdownRenderer } from '../../components/chat/MarkdownRenderer'

export const ChatLayout = () => {
    const { chatHistory, clearChat } = useStore()
    const { sendMessage, isLoading } = useChat()
    const [input, setInput] = useState('')
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isImageMode, setIsImageMode] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [chatHistory])

    const handleSend = () => {
        if (!input.trim() || isLoading) return

        const isGeneratingImage = isImageMode || input.toLowerCase().includes('generate') || input.toLowerCase().includes('image')
        sendMessage(input, isGeneratingImage)

        setInput('')
        setIsImageMode(false)
    }

    return (
        <div className={cn(
            "flex flex-col h-full rounded-2xl md:rounded-3xl border border-border bg-card/50 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-500",
            isFullscreen ? "fixed inset-0 md:inset-4 z-50 h-screen md:h-[calc(100vh-32px)] ml-0 rounded-none md:rounded-3xl" : "relative"
        )}>
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border p-4 bg-muted/40 px-6 h-16 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-base md:text-lg leading-none">AI Copilot</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10" onClick={clearChat}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary/20 scroll-smooth"
            >
                {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-20 px-4 space-y-6 animate-fade-in">
                        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">How can I help you today?</h3>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Ask me anything from code snippets and architectural advice to generating full project plans. I'm here to superpower your development.
                        </p>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            {['Explain React Query', 'Analyze My Code', 'Optimize UI', 'Generate AI Art'].map(t => (
                                <Button key={t} variant="outline" className="h-14 rounded-xl border-dashed hover:border-solid hover:bg-primary/5 hover:text-primary transition-all font-semibold" onClick={() => {
                                    setInput(t)
                                    if (t === 'Generate AI Art') setIsImageMode(true)
                                }}>
                                    {t}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {chatHistory.map((msg) => (
                    <div key={msg.id} className={cn(
                        "flex w-full gap-4 items-start group",
                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}>
                        <div className={cn(
                            "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105",
                            msg.role === 'user' ? "bg-indigo-600 text-white" : "bg-card border border-border text-primary"
                        )}>
                            {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                        </div>
                        <div className={cn(
                            "flex flex-col gap-2 max-w-[80%]",
                            msg.role === 'user' ? "items-end text-right" : "items-start text-left"
                        )}>
                            <div className={cn(
                                "px-5 py-3 rounded-2xl shadow-sm text-sm lg:text-base leading-relaxed break-words transition-all duration-300",
                                msg.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-tr-none hover:shadow-primary/20"
                                    : "bg-white dark:bg-slate-900 border border-border rounded-tl-none group-hover:shadow-xl group-hover:border-primary/30"
                            )}>
                                <MarkdownRenderer content={msg.content} />
                                {msg.imageUrl && (
                                    <div className="mt-4 rounded-xl overflow-hidden border border-border shadow-2xl">
                                        <img src={msg.imageUrl} alt="AI Generated Content" className="w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700" loading="lazy" />
                                    </div>
                                )}
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex w-full gap-4 items-start animate-pulse">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-muted flex items-center justify-center">
                            <Bot className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-2 max-w-[80%]">
                            <div className="h-10 w-48 bg-muted rounded-2xl rounded-tl-none"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 h-auto shrink-0">
                <div className="relative group max-w-4xl mx-auto border border-border bg-background rounded-3xl shadow-xl hover:shadow-primary/5 transition-all overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
                    <div className="flex items-end gap-2 p-3 pb-4">
                        <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hidden sm:flex">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <div className="flex-1 min-h-[44px] flex flex-col justify-end py-1">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isImageMode ? "Describe the image you want to generate..." : "Type your message here..."}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSend()
                                    }
                                }}
                                className="w-full bg-transparent border-none text-sm lg:text-base focus:ring-0 placeholder:text-muted-foreground/60 resize-none max-h-48 overflow-y-auto px-2"
                                rows={1}
                                style={{ height: 'auto' }}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement
                                    target.style.height = 'auto'
                                    target.style.height = `${target.scrollHeight} px`
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hidden lg:flex group-hover:text-primary transition-colors">
                                <Mic className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className={cn(
                                    "h-10 w-10 rounded-xl shadow-lg transition-all scale-100 active:scale-90",
                                    input.trim() ? "bg-primary text-white" : "bg-muted text-muted-foreground opacity-50"
                                )}
                            >
                                {isLoading ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-2 bg-muted/20 border-t border-border/10">
                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors">
                            <Globe size={12} className="text-muted-foreground" />
                            <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/80">Search Web</span>
                        </div>
                        <div
                            onClick={() => setIsImageMode(!isImageMode)}
                            className={cn(
                                "flex items-center gap-1.5 cursor-pointer transition-colors",
                                isImageMode ? "text-primary" : "hover:text-primary"
                            )}
                        >
                            <ImageIcon size={12} className={isImageMode ? "text-primary" : "text-muted-foreground"} />
                            <span className="text-[10px] font-bold uppercase tracking-tight">Generate Image</span>
                        </div>
                        <div className="ml-auto text-[10px] font-bold uppercase tracking-tight text-muted-foreground/40 hidden sm:block">
                            Press Enter to send
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
