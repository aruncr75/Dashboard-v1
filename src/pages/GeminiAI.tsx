import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { sendMessageToGemini } from "@/lib/gemini-api";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  isLoading?: boolean;
}

const GeminiAI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("gemini-chat");
    return saved ? JSON.parse(saved) : [{
      id: "welcome",
      text: "Hello! I'm Gemini AI. How can I help you with your tasks today?",
      isUser: false,
      timestamp: new Date().toISOString()
    }];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem("gemini-chat", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setIsSubmitting(true);

    try {
      const loadingMessage: ChatMessage = {
        id: "loading",
        text: "Thinking...",
        isUser: false,
        timestamp: new Date().toISOString(),
        isLoading: true
      };
      setMessages(prev => [...prev, loadingMessage]);

      const response = await sendMessageToGemini(message);
      
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== "loading");
        return [...filtered, {
          id: Date.now().toString(),
          text: response,
          isUser: false,
          timestamp: new Date().toISOString()
        }];
      });
    } catch (error) {
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== "loading");
        return [...filtered, {
          id: Date.now().toString(),
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
          timestamp: new Date().toISOString()
        }];
      });
    } finally {
      setIsSubmitting(false);
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: "welcome",
      text: "Hello! I'm Gemini AI. How can I help you with your tasks today?",
      isUser: false,
      timestamp: new Date().toISOString()
    }]);
    localStorage.removeItem("gemini-chat");
    setClearDialogOpen(false);
  };

  return (
    <Layout>
      <div 
        className="space-y-6 animate-fade-in pb-20 md:pb-0"
        role="main"
        aria-label="Gemini AI Chat Interface"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" aria-label="Return to dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Gemini AI Assistant</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setClearDialogOpen(true)}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Clear chat history"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>

        <Card className="p-4 h-[calc(100vh-200px)] flex flex-col bg-gradient-to-br from-background to-card border-none shadow-lg">
          <ScrollArea 
            className="flex-1 p-4"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  role="article"
                  aria-label={`${msg.isUser ? 'Your message' : 'AI response'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="break-words">{msg.text}</div>
                    <time 
                      className="text-xs opacity-50 mt-1 block"
                      dateTime={msg.timestamp}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </time>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form 
            onSubmit={handleSubmit} 
            className="flex gap-2 p-4 border-t border-border"
            role="form"
            aria-label="Message input form"
          >
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              aria-label="Message input"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={isSubmitting}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>

        <ConfirmDialog
          open={clearDialogOpen}
          onOpenChange={setClearDialogOpen}
          title="Clear Chat History"
          description="Are you sure you want to clear all messages? This action cannot be undone."
          onConfirm={handleClearChat}
        />
      </div>
    </Layout>
  );
};

export default GeminiAI;
