import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../services/dashboardService';

export const useDashboard = () => {
    return useQuery({
        queryKey: ['dashboardData'],
        queryFn: fetchDashboardData,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
