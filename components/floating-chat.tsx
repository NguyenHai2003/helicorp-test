'use client'

import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([
    {
      role: 'bot',
      text: 'Xin chào! Tôi có thể giúp bạn về HELI RING. Bạn cần tư vấn về cái gì?',
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: input },
        {
          role: 'bot',
          text: 'Cảm ơn câu hỏi của bạn! Vui lòng liên hệ với team hỗ trợ để có thêm thông tin chi tiết.',
        },
      ])
      setInput('')
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 md:right-8 w-80 bg-card rounded-2xl border border-border shadow-2xl flex flex-col max-h-96 z-40 animate-fade-in-up">
          {/* Header */}
          <div className="bg-accent text-accent-foreground p-4 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="font-semibold">HELI Support</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent/80 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:right-8 w-14 h-14 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
        aria-label="Open chat support"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  )
}
