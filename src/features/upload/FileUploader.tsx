import { useState, useRef } from 'react'
import { Upload, FileText, Trash2, FileCode, FilePlus, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { cn } from '../../utils/utils'

interface MockFile {
    id: string
    name: string
    type: string
    size: string
    status: 'uploading' | 'completed' | 'error' | 'analyzing'
    progress: number
}

export const FileUploader = () => {
    const [files, setFiles] = useState<MockFile[]>([
        { id: '1', name: 'financial_report_2025.pdf', type: 'PDF', size: '2.4 MB', status: 'completed', progress: 100 },
        { id: '2', name: 'marketing_strategy.txt', type: 'TXT', size: '156 KB', status: 'completed', progress: 100 },
    ])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFiles = Array.from(e.dataTransfer.files)
        handleFileUpload(droppedFiles)
    }

    const handleFileUpload = (newFiles: File[]) => {
        newFiles.forEach(file => {
            const id = Math.random().toString(36).substring(7)
            const newMockFile: MockFile = {
                id,
                name: file.name,
                type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                status: 'uploading',
                progress: 0
            }
            setFiles(prev => [newMockFile, ...prev])

            // Simulate upload progress
            let progress = 0
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 30)
                if (progress >= 100) {
                    progress = 100
                    setFiles(prev => prev.map(f => f.id === id ? { ...f, progress, status: 'analyzing' } : f))
                    clearInterval(interval)

                    // Simulate analysis
                    setTimeout(() => {
                        setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'completed' } : f))
                    }, 2000)
                } else {
                    setFiles(prev => prev.map(f => f.id === id ? { ...f, progress } : f))
                }
            }, 300)
        })
    }

    return (
        <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-tr from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent pb-1">AI Knowledge Base</h1>
                    <p className="text-muted-foreground mt-2 text-base sm:text-lg">Upload documents to feed your AI model with custom context.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button className="rounded-2xl px-6 sm:px-8 shadow-xl shadow-primary/30 text-sm" onClick={() => fileInputRef.current?.click()}>
                        <FilePlus className="h-4 w-4 mr-2" /> Upload
                    </Button>
                    <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => handleFileUpload(Array.from(e.target.files || []))} />
                </div>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative group flex flex-col items-center justify-center p-12 lg:p-20 rounded-[3rem] border-3 border-dashed transition-all duration-500 overflow-hidden",
                    isDragging ? "border-primary bg-primary/5 scale-[0.98] shadow-2xl" : "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
                )}
            >
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
                <div className="relative z-10 text-center space-y-6">
                    <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto shadow-inner border border-primary/20 animate-bounce transition-all group-hover:bg-primary group-hover:text-white">
                        <Upload size={48} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold">Drag and drop documents here</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto text-base sm:text-lg">Support for PDF, TXT, DOCX and JSON files up to 50MB each.</p>
                    </div>
                    <Button size="lg" className="rounded-2xl px-10 h-14 font-bold shadow-xl shadow-primary/10" onClick={() => fileInputRef.current?.click()}>
                        Select Files From Computer
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Recent Uploads
                        <span className="text-xs font-bold text-primary bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center">{files.length}</span>
                    </h2>
                    <Button variant="link" className="text-muted-foreground hover:text-primary font-bold">Clear All Activity</Button>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {files.map((file) => (
                        <div key={file.id} className="group p-5 rounded-3xl border border-border bg-card/60 backdrop-blur-sm transition-all hover:bg-card hover:shadow-2xl hover:border-primary/20 relative overflow-hidden">
                            <div className="flex gap-5 items-center relative z-10">
                                <div className={cn(
                                    "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110",
                                    file.type === 'PDF' ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                )}>
                                    {file.type === 'PDF' ? <FileText size={28} /> : <FileCode size={28} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold truncate text-lg pr-4">{file.name}</h4>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        <span>{file.size}</span>
                                        <div className="h-1 w-1 rounded-full bg-muted-foreground/30"></div>
                                        <span className={cn(
                                            file.status === 'completed' ? "text-green-500" : "text-primary animate-pulse"
                                        )}>
                                            {file.status === 'analyzing' ? '🧠 Analyzing Context' : file.status === 'uploading' ? `🚀 Uploading ${file.progress}%` : '✅ Ready to Chat'}
                                        </span>
                                    </div>

                                    {(file.status === 'uploading' || file.status === 'analyzing') && (
                                        <div className="mt-4 h-1.5 w-full bg-accent/30 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full bg-primary transition-all duration-300",
                                                    file.status === 'analyzing' ? "w-full opacity-50" : ""
                                                )}
                                                style={{ width: file.status === 'uploading' ? `${file.progress}%` : undefined }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                                <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
