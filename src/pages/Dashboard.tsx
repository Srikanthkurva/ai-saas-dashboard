import { useNavigate } from 'react-router-dom'
import { Brain, Cpu, Zap, Activity, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/utils'
import { useDashboard } from '../hooks/useDashboard'

const IconMap = {
    brain: Brain,
    zap: Zap,
    activity: Activity,
    cpu: Cpu,
}

export const Dashboard = () => {
    const navigate = useNavigate()
    const { data: dashboardData, isLoading } = useDashboard()

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-12 w-64 bg-muted rounded-2xl"></div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-muted rounded-2xl border border-border"></div>
                    ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-7">
                    <div className="lg:col-span-4 h-96 bg-muted rounded-3xl"></div>
                    <div className="lg:col-span-3 h-96 bg-muted rounded-3xl"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full overflow-y-auto pr-2 space-y-8 animate-fade-in scrollbar-thin">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                    Welcome back, {dashboardData?.userName.split(' ')[0] || 'Jane'}
                </h1>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg font-medium">
                    Here's what's happening with your AI models today.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {dashboardData?.stats.map((stat, i) => {
                    const Icon = IconMap[stat.icon]
                    return (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between">
                                <div className={cn("p-2 rounded-xl", stat.bg)}>
                                    <Icon className={cn("h-6 w-6", stat.color)} />
                                </div>
                                <span className={cn(
                                    "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
                                    stat.isUp ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
                                )}>
                                    {stat.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {stat.trend}
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest text-[10px]">{stat.label}</h3>
                                <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
                            </div>
                            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                <div className="lg:col-span-4 rounded-3xl border border-border bg-card/40 backdrop-blur-md p-8 flex flex-col justify-center min-h-[400px] overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative z-10">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Brain size={32} />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight leading-tight">Start a new AI conversation</h2>
                        <p className="text-muted-foreground mb-10 max-w-md text-lg leading-relaxed">
                            Experience the power of our next-gen AI. Analyze data, or just chat. Our models are ready to assist you.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => navigate('/chat')}
                            className="rounded-2xl px-10 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group/btn"
                        >
                            Get Started <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-1000"></div>
                </div>

                <div className="lg:col-span-3 rounded-3xl border border-border bg-card p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
                        <Button variant="ghost" size="sm" className="text-muted-foreground text-xs font-bold uppercase tracking-widest hover:text-primary">View All</Button>
                    </div>
                    <div className="space-y-8">
                        {dashboardData?.recentActivity.map((activity) => (
                            <div key={activity.id} className="flex gap-5 items-start group cursor-pointer">
                                <div className={cn(
                                    "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all shadow-sm group-hover:scale-110",
                                    activity.type === 'ai' ? "bg-primary/10 text-primary" :
                                        activity.type === 'user' ? "bg-indigo-500/10 text-indigo-500" : "bg-muted text-muted-foreground"
                                )}>
                                    {activity.type === 'ai' ? <Brain size={18} /> :
                                        activity.type === 'user' ? <Zap size={18} /> : <Activity size={18} />}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-bold group-hover:text-primary transition-colors leading-none">{activity.title}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{activity.time} • {activity.type.toUpperCase()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

