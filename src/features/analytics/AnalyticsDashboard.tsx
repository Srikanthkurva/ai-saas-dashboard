import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'
import { Users, DollarSign, BrainCircuit, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '../../utils/utils'

const data = [
    { name: 'Mon', tokens: 4000, api: 2400, cost: 2400 },
    { name: 'Tue', tokens: 3000, api: 1398, cost: 2210 },
    { name: 'Wed', tokens: 2000, api: 9800, cost: 2290 },
    { name: 'Thu', tokens: 2780, api: 3908, cost: 2000 },
    { name: 'Fri', tokens: 1890, api: 4800, cost: 2181 },
    { name: 'Sat', tokens: 2390, api: 3800, cost: 2500 },
    { name: 'Sun', tokens: 3490, api: 4300, cost: 2100 },
]

const pieData = [
    { name: 'GPT-4o', value: 400, color: '#0ea5e9' },
    { name: 'GPT-3.5', value: 300, color: '#6366f1' },
    { name: 'Claude 3', value: 300, color: '#ec4899' },
    { name: 'Gemini Pro', value: 200, color: '#f59e0b' },
]

export const AnalyticsDashboard = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">System Analytics</h1>
                    <p className="text-muted-foreground mt-1 text-base sm:text-lg">Real-time performance metrics and usage tracking.</p>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-accent/30 border border-border/50 rounded-2xl w-fit">
                    {['24h', '7d', '30d', '90d'].map((p, i) => (
                        <button key={p} className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                            i === 1 ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-accent/50"
                        )}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Token Utilization', value: '4.2M', trend: '+12.5%', isUp: true, icon: BrainCircuit },
                    { label: 'API Latency (avg)', value: '342ms', trend: '-2.1%', isUp: false, icon: Activity },
                    { label: 'Active Sessions', value: '2,840', trend: '+5.4%', isUp: true, icon: Users },
                    { label: 'Estimated Cost', value: '$842.10', trend: '+8.2%', isUp: true, icon: DollarSign },
                ].map((stat, i) => (
                    <div key={i} className="group p-6 rounded-3xl border border-border bg-card/40 backdrop-blur-sm transition-all hover:bg-card hover:shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                stat.isUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                            )}>
                                {stat.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</h3>
                        <p className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">{stat.value}</p>
                        <div className="mt-4 w-full h-1 bg-accent/30 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${60 + i * 10}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 p-4 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-border bg-card shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                        <h2 className="text-lg sm:text-xl font-bold">Token Consumption Over Time</h2>
                        <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold text-muted-foreground">
                            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary"></div> Tokens</div>
                            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-indigo-500"></div> API Calls</div>
                        </div>
                    </div>
                    <div className="h-64 sm:h-80 w-full overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.1} vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                                    itemStyle={{ color: 'var(--primary)' }}
                                />
                                <Area type="monotone" dataKey="tokens" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                                <Area type="monotone" dataKey="api" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApi)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-md shadow-sm">
                    <h2 className="text-xl font-bold mb-8">Model Distribution</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px', fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-3">
                        {pieData.map(item => (
                            <div key={item.name} className="flex items-center justify-between text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="font-bold">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
