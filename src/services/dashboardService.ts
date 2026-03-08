export interface DashboardStats {
    label: string;
    value: string;
    trend: string;
    isUp: boolean;
    icon: 'brain' | 'zap' | 'activity' | 'cpu';
    color: string;
    bg: string;
}

export interface RecentActivity {
    id: string;
    title: string;
    time: string;
    type: 'ai' | 'user' | 'system';
}

export interface DashboardData {
    stats: DashboardStats[];
    recentActivity: RecentActivity[];
    userName: string;
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
        userName: "Antigravity User",
        stats: [
            { label: 'Total Tokens Used', value: '1.4M', trend: '+14%', isUp: true, icon: 'brain', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'API Requests', value: '52.1k', trend: '+8%', isUp: true, icon: 'zap', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
            { label: 'Avg. Response Time', value: '382ms', trend: '-12%', isUp: false, icon: 'activity', color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'System Uptime', value: '99.99%', trend: '+0.1%', isUp: true, icon: 'cpu', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ],
        recentActivity: [
            { id: '1', title: 'Market analysis generated', time: '2 mins ago', type: 'ai' },
            { id: '2', title: 'New data source connected', time: '45 mins ago', type: 'system' },
            { id: '3', title: 'Project proposal drafted', time: '2 hours ago', type: 'ai' },
            { id: '4', title: 'Document uploaded: Q1_Report.pdf', time: '5 hours ago', type: 'user' },
        ]
    };
};
