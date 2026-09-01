import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  show_model_signup?: boolean;
  show_affiliate_signup?: boolean;
  model_links?: any;
  affiliate_link?: any;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
    fetchSignupLinks();
  }, [messages]);
  
  const fetchSignupLinks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/signup-links`);
      setSignupData(response.data);
    } catch (error) {
      console.log('Signup data not available');
    }
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${apiUrl}/chat`, {
        message: input,
        conversation_history: messages
      });
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
        show_model_signup: response.data.show_model_signup,
        show_affiliate_signup: response.data.show_affiliate_signup,
        model_links: response.data.model_links,
        affiliate_link: response.data.affiliate_link
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 flex flex-col">
      {/* Header */}
      <div className="bg-black bg-opacity-50 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold">🧑‍🤝‍🧑 Modeloportunity Bot</h1>
        <p className="text-sm text-gray-300">Your AI Modeling Business Assistant</p>
      </div>
      
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center text-white">
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome to Modeloportunity Bot!</h2>
              <p className="text-lg">Ask me anything about the modeling business</p>
              <p className="text-sm text-gray-300 mt-2">💡 Tip: Ask about joining as a model or becoming an affiliate!</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx}>
              <div
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-700 text-white rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
              
              {/* MODEL SIGNUP OPTIONS */}
              {msg.show_model_signup && msg.model_links && (
                <div className="flex justify-start mt-3">
                  <div className="bg-gradient-to-r from-purple-700 to-blue-700 text-white p-4 rounded-lg border-2 border-green-400 max-w-md">
                    <p className="font-bold mb-3 text-green-300">🎭 Join as a Model:</p>
                    <div className="space-y-2">
                      {msg.model_links.whitetrafs && (
                        <a
                          href={msg.model_links.whitetrafs.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-gradient-to-r from-green-400 to-green-300 hover:from-green-300 hover:to-green-200 text-black px-4 py-3 rounded-lg font-bold text-center transition transform hover:scale-105 shadow-lg"
                        >
                          💎 {msg.model_links.whitetrafs.name}
                          <br />
                          <span className="text-xs font-normal">{msg.model_links.whitetrafs.description}</span>
                        </a>
                      )}
                      {msg.model_links.stripcash && (
                        <a
                          href={msg.model_links.stripcash.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-gradient-to-r from-green-400 to-green-300 hover:from-green-300 hover:to-green-200 text-black px-4 py-3 rounded-lg font-bold text-center transition transform hover:scale-105 shadow-lg"
                        >
                          💰 {msg.model_links.stripcash.name}
                          <br />
                          <span className="text-xs font-normal">{msg.model_links.stripcash.description}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* AFFILIATE SIGNUP OPTIONS */}
              {msg.show_affiliate_signup && msg.affiliate_link && (
                <div className="flex justify-start mt-3">
                  <div className="bg-gradient-to-r from-yellow-700 to-orange-700 text-white p-4 rounded-lg border-2 border-yellow-400 max-w-md">
                    <p className="font-bold mb-3 text-yellow-300">💼 Become an Affiliate:</p>
                    <a
                      href={msg.affiliate_link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black px-4 py-3 rounded-lg font-bold text-center transition transform hover:scale-105 shadow-lg"
                    >
                      📊 {msg.affiliate_link.name}
                      <br />
                      <span className="text-xs font-normal">{msg.affiliate_link.description}</span>
                    </a>
                    <p className="text-xs text-yellow-200 mt-2">Earn commissions by promoting modeling opportunities!</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-white px-4 py-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Form */}
      <div className="bg-black bg-opacity-50 p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or say 'join' to sign up..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}