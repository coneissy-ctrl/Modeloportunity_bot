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
        content: '❌ Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black flex flex-col">
      {/* PREMIUM HEADER */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white p-6 shadow-2xl border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="animate-pulse">
              <h1 className="text-5xl font-black tracking-wider">🌹 MODELOPORTUNITY ELITE 🌹</h1>
              <p className="text-lg text-yellow-200 font-bold mt-2">✨ Premium Modeling Platform • Exclusive Opportunities • Elite Network</p>
            </div>
            <div className="text-6xl animate-bounce">👑</div>
          </div>
        </div>
      </div>
      
      {/* QUICK START BANNER */}
      {messages.length === 0 && (
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 shadow-lg">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-black text-lg">💡 Ask about joining as a model or becoming an affiliate! 🚀</p>
          </div>
        </div>
      )}
      
      {/* CHAT CONTAINER */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-7xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="text-white">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                💎 Welcome to Your Modeling Future 💎
              </h2>
              <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text mb-8">
                Elite AI Modeling Assistant
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-gradient-to-br from-red-600 to-pink-600 p-6 rounded-2xl border-2 border-red-400 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition">
                  <p className="text-3xl mb-2">👗</p>
                  <p className="font-bold text-yellow-200">Premium Modeling</p>
                  <p className="text-sm text-gray-100">Top agencies & exclusive bookings</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-2xl border-2 border-purple-400 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition">
                  <p className="text-3xl mb-2">🎯</p>
                  <p className="font-bold text-yellow-200">Career Growth</p>
                  <p className="text-sm text-gray-100">Expert guidance & networking</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-2xl border-2 border-yellow-400 shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition">
                  <p className="text-3xl mb-2">💸</p>
                  <p className="font-bold text-white">Earn Premium Income</p>
                  <p className="text-sm text-gray-900">Multiple income streams</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg">✨ Start chatting to unlock your potential! ✨</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="space-y-3">
              {/* MESSAGE */}
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-2xl px-6 py-4 rounded-3xl font-medium text-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none shadow-2xl'
                      : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 rounded-bl-none shadow-xl border-2 border-purple-500'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
              
              {/* MODEL SIGNUP - PREMIUM BUTTONS */}
              {msg.show_model_signup && msg.model_links && (
                <div className="flex justify-start mt-4">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border-3 border-red-500 max-w-2xl shadow-2xl shadow-red-500/50">
                    <p className="font-black text-xl text-transparent bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text mb-4">
                      🎪 JOIN AS A MODEL - SELECT YOUR PLATFORM:
                    </p>
                    <div className="space-y-3">
                      {msg.model_links.whitetrafs && (
                        <a
                          href={msg.model_links.whitetrafs.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:from-red-500 hover:via-pink-500 hover:to-red-500 text-white px-6 py-4 rounded-2xl font-black text-center transition transform hover:scale-110 shadow-2xl border-2 border-red-300 hover:border-yellow-300 text-lg"
                        >
                          👑 {msg.model_links.whitetrafs.name}
                          <br />
                          <span className="text-sm font-bold text-yellow-200">{msg.model_links.whitetrafs.description}</span>
                        </a>
                      )}
                      {msg.model_links.mavrtracktor && (
                        <a
                          href={msg.model_links.mavrtracktor.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 text-white px-6 py-4 rounded-2xl font-black text-center transition transform hover:scale-110 shadow-2xl border-2 border-purple-300 hover:border-yellow-300 text-lg"
                        >
                          ⭐ {msg.model_links.mavrtracktor.name}
                          <br />
                          <span className="text-sm font-bold text-yellow-200">{msg.model_links.mavrtracktor.description}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* AFFILIATE SIGNUP - PREMIUM BUTTON */}
              {msg.show_affiliate_signup && msg.affiliate_link && (
                <div className="flex justify-start mt-4">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border-3 border-yellow-500 max-w-2xl shadow-2xl shadow-yellow-500/50">
                    <p className="font-black text-xl text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-4">
                      💼 BECOME AN ELITE AFFILIATE & EARN:
                    </p>
                    <a
                      href={msg.affiliate_link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 hover:from-yellow-400 hover:via-orange-400 hover:to-red-500 text-white px-6 py-4 rounded-2xl font-black text-center transition transform hover:scale-110 shadow-2xl border-2 border-yellow-300 hover:border-white text-lg"
                    >
                      💰 {msg.affiliate_link.name}
                      <br />
                      <span className="text-sm font-bold text-white">{msg.affiliate_link.description}</span>
                    </a>
                    <p className="text-yellow-300 font-black mt-3 text-center text-lg">🤑 HIGH COMMISSIONS WAITING 🤑</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {/* TYPING INDICATOR */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white px-6 py-4 rounded-3xl shadow-2xl">
              <div className="flex space-x-3">
                <div className="h-4 w-4 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="h-4 w-4 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="h-4 w-4 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* PREMIUM INPUT FORM */}
      <div className="bg-gradient-to-r from-black via-purple-900 to-black p-6 border-t-4 border-red-500 shadow-2xl">
        <form onSubmit={handleSendMessage} className="max-w-7xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about modeling opportunities, joining, or earning as an affiliate... ✨"
            disabled={loading}
            className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-500 disabled:opacity-50 border-2 border-purple-600 font-medium text-lg"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-8 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:from-red-500 hover:via-pink-500 hover:to-red-500 text-white rounded-2xl font-black disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-110 shadow-2xl border-2 border-yellow-400 text-lg"
          >
            🚀 SEND
          </button>
        </form>
        
        {/* FOOTER */}
        <div className="mt-6 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-black p-4 rounded-2xl border-2 border-yellow-500 text-center">
            <p className="text-yellow-300 font-black text-lg mb-2">⚡ MODELOPORTUNITY ELITE ⚡</p>
            <p className="text-gray-200">Your AI-powered gateway to premium modeling opportunities & affiliate commissions</p>
            <p className="text-gray-400 text-sm mt-2">💬 Say "join" to become a model • 💼 Say "affiliate" to earn commissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}