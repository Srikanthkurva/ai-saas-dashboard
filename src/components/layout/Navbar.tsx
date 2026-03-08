import { useStore } from '../../store/useStore'
import { cn } from '../../utils/utils'

export const Navbar = () => {
    const { sidebarOpen } = useStore()

    return (
        <header className={cn(
            "sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/60 backdrop-blur-xl px-4 transition-all duration-300",
            sidebarOpen ? "md:ml-64" : "md:ml-16"
        )}>
            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex-1"></div>
            </div>
        </header>
    )
}

