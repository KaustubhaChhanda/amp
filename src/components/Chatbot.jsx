import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Trash2, 
  Bot, 
  User, 
  Loader2
} from 'lucide-react';

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_NAME = 'llama-3.1-8b-instant'; // Llama 3.1 8B model on Groq

const SYSTEM_PROMPT = `You are the AMP Assistant, an AI representative of Anand Motor Products (AMP).
AMP is India's leading designer, manufacturer, and exporter of high-performance anti-vibration rubber-to-metal components and Microcellular Polyurethane (MCU) components.

Key Corporate Details to guide your answers:
1. Business Profile:
   - Established: 1949 (over 75 years of manufacturing excellence).
   - Staff: 700+ highly trained technical professionals.
   - Facilities: 3 advanced manufacturing plants in Gurugram, India.
   - Compliance: IATF 16949 compliant testing lab, Toyota Production System (TPS) lean workflow certification.
   - Engineering Speed: CAD tooling design & CNC pattern-making completed in-house in 14 days.

2. Product Categories:
   - Rubber & Rubber-to-Metal Bonded Mounts: Engine mounts, cabin mounts, heavy suspension bushings, trailer bushings.
   - Microcellular Polyurethane (MCU): Jounce bumpers, spring pads, custom bump stops.
   - Sheet Metal Stampings & Assemblies: Custom heavy brackets, structural parts.
   - Direct Catalog URL: Direct users to check products online at [/products](/products).

3. Contact Info:
   - RFQ Page: Direct users to fill specifications at [/contact](/contact).
   - Phone: +91 87429 55535
   - Email: marketing@amp-india.com
   - Address: 38, Km Stone, NH-8, Khandsa Rd, Gurugram, Haryana 122004, India.
   - Direct Google Maps Location: [View on Google Maps](https://www.google.com/maps/place/Anand+Motor+Products+Pvt.+Ltd./@28.4266363,77.0009861,15z)

Response Guidelines:
- Respond in a professional, technical, helpful, and concise manner.
- Always guide buyers looking for catalog specifications or custom quotes to [/products](/products) or [/contact](/contact).
- Provide the location or map links whenever asked about the head office, factory, or how to visit.
- Format all lists and key details cleanly using bullet points.

STRICT GUARDRAILS (Out-of-Domain Policy):
- You must ONLY answer questions that are directly related to Anand Motor Products (AMP), our automotive components, manufacturing services, and corporate/contact information.
- If a query is unrelated to AMP (such as general knowledge, programming, history, weather, other industries, personal queries, general conversation, etc.), you MUST politely decline to answer.
- Under no circumstances should you generate answers about topics not mentioned in this prompt. Use this reply for unrelated queries:
  "I'm sorry, but as the AMP AI Assistant, I am only configured to answer queries regarding Anand Motor Products (AMP), our automotive manufacturing capabilities, products, and contact details. How can I help you with our B2B component manufacturing services today?"`;

const SUGGESTIONS = [
  { text: '📍 Factory Location & Map', query: 'Where is your factory located and can I get a Google Maps link?' },
  { text: '⚡ Tooling Lead Time', query: 'What is your custom tooling lead time and TPS engineering capability?' },
  { text: '📦 View Product Catalog', query: 'What products do you manufacture and where can I view the catalog?' },
  { text: '✉️ Request B2B Quote', query: 'How can I submit an RFQ or get in touch for custom OEM requirements?' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Welcome to **Anand Motor Products (AMP)**! I am your B2B Assistant. Ask me about our anti-vibration components, factory location, or custom tooling capabilities.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const clearChat = () => {
    setMessages([
      { 
        role: 'assistant', 
        content: 'Conversation history cleared. How can I assist you with AMP capabilities today?' 
      }
    ]);
  };

  const handleSend = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;

    const userQuery = textToSend.trim();
    setInput('');
    
    // Append user message
    const updatedMessages = [...messages, { role: 'user', content: userQuery }];
    setMessages(updatedMessages);
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '⚠️ **Groq API Key Missing!** Please define `VITE_GROQ_API_KEY` inside the `.env` file at the root of the project to activate the AI assistant.'
        }]);
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...updatedMessages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ];

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: apiMessages,
          temperature: 0.1,
          max_tokens: 750
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;
      
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ **Connection Error**: ${err.message}. Please verify your API key and network status.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple Markdown Parser (Bold & Links)
  const renderMessageContent = (text) => {
    if (!text) return '';
    
    // Bold Regex **text**
    let formatted = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>');
    
    // Link Regex [text](url)
    formatted = formatted.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 underline font-extrabold inline-flex items-center gap-0.5">$1</a>'
    );

    // Newlines to breaks
    formatted = formatted.split('\n').join('<br />');

    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <>
      {/* Floating Toggle Button (Vibrant Blue, Overlaying Footer) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed sm:bottom-6 sm:right-6 bottom-4 right-4 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-blue-500/20 cursor-pointer"
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Responsive Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.2 }}
            className="fixed sm:bottom-24 sm:right-6 bottom-20 right-4 sm:w-96 w-[calc(100vw-2rem)] sm:h-[550px] h-[65vh] flex flex-col bg-white border border-slate-200/90 shadow-2xl rounded-3xl overflow-hidden z-50 font-sans"
          >
            {/* Header */}
            <div className="bg-slate-900 px-5 py-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide text-white">AMP AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear conversation history"
                  className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 ${!isAssistant ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${
                      isAssistant ? 'bg-slate-800' : 'bg-blue-600'
                    }`}>
                      {isAssistant ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs md:text-sm font-semibold max-w-[80%] leading-relaxed shadow-sm border ${
                      isAssistant 
                        ? 'bg-white text-slate-800 border-slate-200/60 rounded-tl-none' 
                        : 'bg-blue-600 text-white border-blue-500 rounded-tr-none'
                    }`}>
                      {renderMessageContent(msg.content)}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-white">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 shadow-sm">
                    <Loader2 size={13} className="animate-spin text-slate-400" />
                    <span>Analyzing RFQ parameters...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            {messages.length === 1 && !isLoading && (
              <div className="p-3 border-t border-slate-100 bg-white space-y-2">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest px-1">Quick Inquiries:</div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item.text}
                      onClick={() => handleSend(item.query)}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/80 rounded-full transition-all text-left cursor-pointer"
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Box */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your OEM inquiry..."
                disabled={isLoading}
                className="w-full px-4 py-2 border border-slate-200 bg-slate-50 focus:bg-white text-xs md:text-sm font-semibold focus:outline-none focus:border-blue-500 rounded-xl transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
