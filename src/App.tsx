import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { ChatLayout } from './features/chat/ChatLayout'
import { AnalyticsDashboard } from './features/analytics/AnalyticsDashboard'
import { FileUploader } from './features/upload/FileUploader'
import { Login } from './pages/Login'
import { useStore } from './store/useStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  const { isAuthenticated } = useStore()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />

          <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatLayout />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/upload" element={<FileUploader />} />
            <Route path="/settings" element={<div className="p-8 text-center text-2xl font-bold bg-muted/20 rounded-3xl border border-dashed border-border border-spacing-4 py-32 opacity-50 underline decoration-primary decoration-double animate-fade-in transition-all hover:opacity-100 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/5 select-none cursor-default group"><span className="text-primary italic animate-pulse">Settings Page Coming Soon</span> <br /><span className="text-sm font-medium text-muted-foreground uppercase tracking-[0.3em] mt-4 block">Beta Feature System v4.5 Active</span></div>} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
