import { Bell } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Button } from '../ui/Button'
import { cn } from '../../utils/utils'

export const Navbar = () => {
    const { user, sidebarOpen } = useStore()

    return (
        <header className={cn(
            "sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/60 backdrop-blur-xl px-4 transition-all duration-300",
            sidebarOpen ? "md:ml-64" : "md:ml-16"
        )}>
            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex-1"></div>

                <div className="flex items-center gap-3 ml-auto">
                    <Button variant="ghost" size="icon" className="relative group">
                        <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background border border-background"></span>
                    </Button>

                    <div className="h-8 w-[1px] bg-border mx-1"></div>

                    <div className="flex items-center gap-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold tracking-tight">{user?.name || 'Jane Doe'}</p>
                            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{user?.email || 'Pro Plan'}</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 p-[2px] shadow-lg shadow-primary/20">
                            <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center font-bold text-primary">
                                {user?.name?.[0] || 'J'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

