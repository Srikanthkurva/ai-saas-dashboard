import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Mail, Lock, CheckCircle2, Github, Chrome } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useStore } from '../store/useStore'

export const Login = () => {
    const { login } = useStore()
    const navigate = useNavigate()
    const [email, setEmail] = useState('demo@example.com')
    const [password, setPassword] = useState('password123')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Simple mock auth delay
        setTimeout(() => {
            if (email === 'demo@example.com' && password === 'password123') {
                login({ id: '1', name: 'Jane Doe', email: 'jane@example.com' })
                navigate('/')
            } else {
                setError('Invalid credentials. Use demo@example.com / password123')
            }
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="relative min-h-screen grid lg:grid-cols-2 bg-background z-[100] animate-fade-in overflow-y-auto">
            {/* Left Side: Gradient Design */}
            <div className="relative hidden lg:flex flex-col items-center justify-center p-20 overflow-hidden bg-[#020617]">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-100 z-0"></div>

                <div className="relative z-10 w-full max-w-lg space-y-8">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-primary/40 group-hover:scale-105 transition-transform duration-500">AI</div>
                        <span className="text-4xl font-extrabold tracking-tighter text-white">Cortex</span>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-6xl font-black tracking-tight text-white leading-[1.1]">The future of <span className="text-primary italic">intelligence</span> is here.</h2>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md">Join over 250,000 developers building the next generation of AI-powered applications with Cortex.</p>
                    </div>

                    <div className="space-y-6 pt-6">
                        {[
                            'Enterprise-grade security built-in',
                            'Real-time collaborative AI',
                            'Universal model integration'
                        ].map(f => (
                            <div key={f} className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                    <CheckCircle2 size={20} />
                                </div>
                                <span className="text-slate-300 font-bold text-lg tracking-tight">{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex flex-col items-center justify-center p-8 lg:p-12 xl:p-20 relative bg-background overflow-y-auto">
                {/* Background shapes for mobile */}
                <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl lg:hidden"></div>

                <div className="w-full max-w-md space-y-6 sm:space-y-8 animate-slide-in-up">
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter">Sign into account</h1>
                        <p className="text-muted-foreground font-medium text-base sm:text-lg leading-relaxed">Enter your credentials to access the AI dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2 group">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors group-focus-within:text-primary pl-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        className="pl-12 h-14 rounded-2xl bg-accent/20 border-border border-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base sm:text-lg font-medium"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Password</label>
                                    <span className="text-xs font-bold text-primary hover:underline cursor-pointer">Forgot?</span>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        className="pl-12 h-14 rounded-2xl bg-accent/20 border-border border-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base sm:text-lg"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex gap-3 items-center">
                                <Lock className="h-4 w-4" /> {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-15 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 transition-all active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-3">
                                    <div className="h-5 w-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    Authenticating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-3 justify-center">
                                    Get Started <ArrowRight className="h-5 w-5" />
                                </span>
                            )}
                        </Button>

                        <div className="relative flex items-center justify-center text-xs font-bold uppercase tracking-widest text-muted-foreground/60 py-2 sm:py-4">
                            <div className="absolute left-0 w-full h-[1px] bg-border"></div>
                            <span className="relative px-4 bg-background">Or continue with</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-14 rounded-2xl border-2 hover:bg-black hover:text-white transition-all">
                                <Github className="h-5 w-5 mr-3" /> GitHub
                            </Button>
                            <Button variant="outline" className="h-14 rounded-2xl border-2 hover:border-primary/50 transition-all">
                                <Chrome className="h-5 w-5 mr-3 text-primary" /> Google
                            </Button>
                        </div>

                        <p className="text-center text-sm font-medium text-muted-foreground pt-4">
                            Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up for free</Link>
                        </p>
                    </form>
                </div>

                <div className="mt-8 mb-4 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 max-w-xs leading-loose">
                    By signing in you agree to our Terms of Service and Privacy Policy. Built with Cortex AI v4.2.
                </div>
            </div>
        </div>
    )
}
