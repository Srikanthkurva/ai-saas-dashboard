import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useStore } from '../../store/useStore'
import { cn } from '../../utils/utils'

export const Layout = () => {
    const { theme, sidebarOpen } = useStore()

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Sidebar />
            <div className={cn(
                "flex flex-col h-screen transition-all duration-300 overflow-hidden",
                sidebarOpen ? "md:pl-64" : "md:pl-16"
            )}>
                <main className="flex-1 p-6 pt-6 animate-fade-in overflow-hidden">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
