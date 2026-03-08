import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, BarChart2, FileUp, Settings, LogOut, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Button, cn } from '../ui/Button'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: FileUp, label: 'File Upload', path: '/upload' },
    { icon: Settings, label: 'Settings', path: '/settings' },
]

export const Sidebar = () => {
    const { sidebarOpen, toggleSidebar, theme, toggleTheme, logout } = useStore()
    const location = useLocation()

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-border bg-card/80 backdrop-blur-xl",
                "hidden md:block", // Hide on mobile by default
                sidebarOpen ? "w-64" : "w-16"
            )}
        >
            <div className="flex h-full flex-col px-3 py-4">
                <div className="mb-10 flex items-center justify-between px-2">
                    <Link to="/" className={cn("flex items-center gap-2", !sidebarOpen && "hidden")}>
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                            AI
                        </div>
                        <span className="text-xl font-bold tracking-tight">Cortex</span>
                    </Link>
                    {!sidebarOpen && (
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg mx-auto">
                            AI
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className={cn("absolute -right-3 top-8 h-6 w-6 rounded-full border border-border bg-background shadow-sm hover:scale-110 px-0")}
                    >
                        {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" : "text-background-foreground/60",
                                    !sidebarOpen && "justify-center"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : "text-primary")} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto space-y-1 pt-4 border-t border-border/50">
                    <Button
                        variant="ghost"
                        onClick={toggleTheme}
                        className={cn("w-full justify-start gap-3 rounded-lg px-3 py-2 hover:bg-accent", !sidebarOpen && "justify-center")}
                    >
                        {theme === 'light' ? <Moon className="h-5 w-5 text-indigo-500" /> : <Sun className="h-5 w-5 text-yellow-400" />}
                        {sidebarOpen && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={logout}
                        className={cn("w-full justify-start gap-3 rounded-lg px-3 py-2 hover:bg-red-500/10 hover:text-red-500", !sidebarOpen && "justify-center")}
                    >
                        <LogOut className="h-5 w-5" />
                        {sidebarOpen && <span>Logout</span>}
                    </Button>
                </div>
            </div>
        </aside>
    )
}
