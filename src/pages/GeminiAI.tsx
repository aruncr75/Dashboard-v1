import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { sendMessageToGemini } from "@/lib/gemini-api";

const GeminiAI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm Gemini AI. How can I help you with your tasks today?", isUser: false },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    const userMessage = message;
    setMessage("");

    try {
      // Show loading state
      setMessages(prev => [...prev, { 
        text: "Thinking...", 
        isUser: false, 
        isLoading: true 
      }]);

      // Get response from Gemini
      const response = await sendMessageToGemini(userMessage);

      // Replace loading message with actual response
      setMessages(prev => prev.slice(0, -1).concat({
        text: response,
        isUser: false
      }));
    } catch (error) {
      // Handle error
      setMessages(prev => prev.slice(0, -1).concat({
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false
      }));
    }
  };

  const clearChat = () => {
    setMessages([
      { text: "Hello! I'm Gemini AI. How can I help you with your tasks today?", isUser: false }
    ]);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Gemini AI Assistant</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="text-muted-foreground hover:text-destructive"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>

        <Card className="p-4 h-[calc(100vh-200px)] flex flex-col bg-gradient-to-br from-background to-card border-none shadow-lg">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-border">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default GeminiAI;
