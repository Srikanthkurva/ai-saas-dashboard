import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
    return (
        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !className;
                        return !isInline && match ? (
                            <div className="relative group my-4">
                                <div className="absolute right-4 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50">
                                        {match[1]}
                                    </span>
                                </div>
                                <SyntaxHighlighter
                                    language={match[1]}
                                    style={vscDarkPlus}
                                    PreTag="div"
                                    className="!m-0 !rounded-2xl !bg-slate-950/50 !border !border-border/50"
                                    customStyle={{
                                        padding: '1.5rem',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.6',
                                        backgroundColor: 'transparent',
                                    }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-mono text-sm" {...props}>
                                {children}
                            </code>
                        );
                    },
                    table({ children }) {
                        return (
                            <div className="my-6 w-full overflow-x-auto rounded-2xl border border-border">
                                <table className="w-full text-sm text-left border-collapse">
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    thead({ children }) {
                        return <thead className="bg-muted/50 border-b border-border text-xs uppercase tracking-tight">{children}</thead>;
                    },
                    th({ children }) {
                        return <th className="px-6 py-3 font-bold">{children}</th>;
                    },
                    td({ children }) {
                        return <td className="px-6 py-4 border-b border-border/50">{children}</td>;
                    },
                    ul({ children }) {
                        return <ul className="my-4 space-y-2 list-disc list-inside marker:text-primary">{children}</ul>;
                    },
                    ol({ children }) {
                        return <ol className="my-4 space-y-2 list-decimal list-inside marker:text-primary">{children}</ol>;
                    },
                    li({ children }) {
                        return <li className="leading-relaxed">{children}</li>;
                    },
                    blockquote({ children }) {
                        return (
                            <blockquote className="my-4 border-l-4 border-primary/30 bg-primary/5 p-4 rounded-r-2xl italic text-muted-foreground">
                                {children}
                            </blockquote>
                        );
                    },
                    h1({ children }) { return <h1 className="text-2xl font-black tracking-tight mt-8 mb-4 border-b border-border pb-2">{children}</h1> },
                    h2({ children }) { return <h2 className="text-xl font-extrabold tracking-tight mt-6 mb-3">{children}</h2> },
                    h3({ children }) { return <h3 className="text-lg font-bold tracking-tight mt-4 mb-2">{children}</h3> },
                    a({ children, href }) {
                        return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold transition-all">{children}</a>
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
