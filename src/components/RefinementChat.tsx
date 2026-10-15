import React, { useState } from 'react';
import { SproutResult, UserProfile } from '../types';
import { Send, Sparkles, MessageSquare, Bot, User, Loader2 } from 'lucide-react';

interface RefinementChatProps {
  sprout: SproutResult;
  currentUser?: UserProfile;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const RefinementChat: React.FC<RefinementChatProps> = ({ sprout, currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    '💡 Đề xuất 3 mô hình kiếm tiền (Monetization Models)',
    '🎯 Chiến lược tiếp cận 100 khách hàng đầu tiên (GTM)',
    '⚔️ Phân tích lợi thế cạnh tranh cốt lõi (Moat / UVP)',
    '📱 Viết kịch bản Landing Page Hero & Call-To-Action',
  ];

  const handleSend = async (messageText: string) => {
    const textToSend = messageText.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/sprout/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sprout,
          prompt: textToSend,
          messageHistory: messages,
          user: currentUser,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to refine');

      const botMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errMsg: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        sender: 'assistant',
        text: '🌱 IdeaSprout AI encountered a temporary issue while nurturing this idea: ' + (err.message || 'Please try again.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              IdeaSprout AI Consultation
            </h4>
            <p className="text-xs text-stone-500">
              Ask follow-up questions to iterate and expand on {sprout.productName}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-sm">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h5 className="text-stone-700 font-bold text-sm mb-1">
              Want to take {sprout.productName} further?
            </h5>
            <p className="text-xs text-stone-500 max-w-sm mb-5">
              Ask about market size, pricing models, pitch deck talking points, or tech architecture.
            </p>

            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="text-xs px-3 py-1.5 rounded-full bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-stone-700 font-medium transition-all text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  🌱
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-xs'
                    : 'bg-stone-50 text-stone-850 border border-stone-200/80 rounded-tl-xs whitespace-pre-wrap'
                }`}
              >
                <div className="text-xs sm:text-sm">{m.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    m.sender === 'user' ? 'text-emerald-200' : 'text-stone-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-stone-400 text-xs py-2">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>IdeaSprout AI is nurturing your follow-up...</span>
          </div>
        )}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="mt-4 pt-3 border-t border-stone-100 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask IdeaSprout AI to elaborate or refine...`}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-stone-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-stone-50/50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </form>
    </div>
  );
};
