'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])
  
  const { messages, status, sendMessage } = useChat({
    transport,
    messages: [
      {
        id: 'welcome',
        role: 'assistant' as 'assistant' | 'user',
        content: '',
        parts: [{ type: 'text', text: 'Xin chào! Tôi là trợ lý ảo của HELI RING. Tôi có thể giúp bạn giải đáp thông tin gì về sản phẩm này?' }],
      }
    ],
    onError: (err) => {
      console.error('Chat error:', err)
    }
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ role: 'user', content: input, parts: [{ type: 'text', text: input }] })
    setInput('')
  }

  // Auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 md:right-8 w-[350px] bg-card rounded-2xl border border-border shadow-2xl flex flex-col h-[500px] max-h-[80vh] z-50 animate-fade-in-up">
          {/* Header */}
          <div className="bg-accent text-accent-foreground p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">HELI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-black/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-accent text-accent-foreground rounded-br-sm'
                      : 'bg-secondary text-secondary-foreground rounded-bl-sm border border-border/50'
                  }`}
                >
                  <div className="text-sm leading-relaxed break-words">
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        li: ({ node, ...props }) => <li {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                        a: ({ node, ...props }) => <a className="underline underline-offset-2 hover:opacity-80 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                      }}
                    >
                      {msg.parts 
                        ? msg.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('\n')
                        : (msg.content || '')}
                    </ReactMarkdown>
                  </div>
                </div>
                
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 justify-start items-center text-foreground/50">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div className="flex gap-1 bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm">
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="border-t border-border p-3 flex gap-2 bg-card rounded-b-2xl"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl transition-all disabled:opacity-50 flex items-center justify-center min-w-[44px]"
              aria-label="Gửi"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:right-8 w-14 h-14 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:scale-105 flex items-center justify-center z-50 group"
        aria-label="Mở chat tư vấn"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
        )}
      </button>
    </>
  )
}

