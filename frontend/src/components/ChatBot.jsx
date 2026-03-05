import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Leaf, Sparkles } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      message:
        "🌱 Hi there! I'm EcoBot, your friendly green assistant! Ask me about sustainability, VerdiGo's features, or anything else!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        message: inputMessage,
        isBot: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      const currentMessage = inputMessage;
      setInputMessage("");
      setIsTyping(true);

      // Simulate thinking time
      setTimeout(
        () => {
          const botResponse = getResponse(currentMessage);
          const botMessage = {
            id: (Date.now() + 1).toString(),
            message: botResponse,
            isBot: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        },
        1000 + Math.random() * 2000,
      ); // Random delay 1-3 seconds
    }
  };

  // Generate responses based on user input
  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey") ||
      lowerMessage.includes("good morning") ||
      lowerMessage.includes("good afternoon")
    ) {
      const greetings = [
        "🌟 Hello! Welcome to VerdiGo! How can I help you live more sustainably today?",
        "👋 Hi there! Ready to explore some eco-friendly solutions?",
        "🌱 Hey! Great to see you here. What would you like to know about sustainable living?",
        "✨ Hello! I'm excited to help you on your green journey!",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // VerdiGo Features
    if (lowerMessage.includes("green lane")) {
      return "🛣️ **Green Lane** is our eco-smart navigation system! It finds the most environmentally friendly routes, tracks your carbon savings, and suggests sustainable transport options. Perfect for reducing your travel footprint while getting where you need to go!";
    }

    if (lowerMessage.includes("local harvest")) {
      return "🌾 **Local Harvest** connects you with local farmers and fresh produce! Discover seasonal fruits and vegetables near you, support your community, and enjoy farm-to-table freshness. It's good for you and the planet!";
    }

    if (lowerMessage.includes("air buddy")) {
      return "💨 **Air Buddy** monitors air quality in real-time! Get health recommendations, check pollution levels, and plan your outdoor activities safely. Breathe easy knowing you're informed about your environment!";
    }

    if (lowerMessage.includes("wasteless")) {
      return "♻️ **WasteLess** helps you manage waste smartly! Get recycling tips, learn about proper disposal, and discover ways to reduce waste. Turn your garbage into a force for good!";
    }

    if (
      lowerMessage.includes("carbon") &&
      (lowerMessage.includes("calculator") ||
        lowerMessage.includes("footprint"))
    ) {
      return "🧮 **Carbon Footprint Calculator** tracks your environmental impact! Monitor your emissions from travel, energy use, and daily activities. See your progress and get personalized tips to reduce your footprint!";
    }

    // General features question
    if (
      lowerMessage.includes("features") ||
      lowerMessage.includes("what can") ||
      lowerMessage.includes("what do")
    ) {
      return "✨ **VerdiGo's Eco-Tools:**\n\n🛣️ **Green Lane** - Smart eco-navigation\n🌾 **Local Harvest** - Connect with local farms\n💨 **Air Buddy** - Air quality monitoring\n♻️ **WasteLess** - Smart waste management\n🧮 **Carbon Calculator** - Track your impact\n\nWhich one interests you most?";
    }

    // Sustainability topics
    if (
      lowerMessage.includes("sustainability") ||
      lowerMessage.includes("sustainable") ||
      lowerMessage.includes("environment")
    ) {
      const sustainabilityTips = [
        "🌱 **Sustainability** means meeting today's needs without compromising tomorrow's! Key areas: energy efficiency, sustainable transport, waste reduction, and supporting local businesses.",
        "🌍 **Environmental tips**: Use renewable energy, choose eco-friendly products, reduce plastic use, and support sustainable brands. Every small action counts!",
        "♻️ **Sustainable living**: Start with simple changes like reusable bags, energy-efficient appliances, and buying local produce. Build from there!",
      ];
      return sustainabilityTips[
        Math.floor(Math.random() * sustainabilityTips.length)
      ];
    }

    // Climate topics
    if (
      lowerMessage.includes("climate") ||
      lowerMessage.includes("global warming") ||
      lowerMessage.includes("greenhouse")
    ) {
      return "🌍 **Climate Action Ideas:**\n\n• Use public transport or bike\n• Switch to renewable energy\n• Reduce meat consumption\n• Buy local, seasonal food\n• Minimize waste and recycle\n• Support eco-friendly businesses\n\nSmall changes make a big difference!";
    }

    // Recycling and waste
    if (
      lowerMessage.includes("recycle") ||
      lowerMessage.includes("waste") ||
      lowerMessage.includes("trash")
    ) {
      return "♻️ **Smart Waste Tips:**\n\n🔄 **Reduce**: Buy less, choose quality items\n🔄 **Reuse**: Get creative with repurposing\n🔄 **Recycle**: Know your local guidelines\n🌱 **Compost**: Turn organic waste into gold\n🚫 **Refuse**: Say no to single-use plastics";
    }

    // Energy topics
    if (
      lowerMessage.includes("energy") ||
      lowerMessage.includes("electricity") ||
      lowerMessage.includes("solar")
    ) {
      return "⚡ **Energy Saving Tips:**\n\n• Switch to LED bulbs\n• Unplug devices when not in use\n• Use programmable thermostats\n• Consider solar panels\n• Insulate your home properly\n• Choose energy-efficient appliances\n\nSave money while saving the planet!";
    }

    // Transportation
    if (
      lowerMessage.includes("transport") ||
      lowerMessage.includes("car") ||
      lowerMessage.includes("bike") ||
      lowerMessage.includes("travel")
    ) {
      return "🚗 **Eco-Friendly Transport:**\n\n🚶 **Walk or bike** for short trips\n🚌 **Public transport** for longer journeys\n🚗 **Carpool** when driving is necessary\n⚡ **Electric vehicles** for the future\n🏠 **Work from home** when possible\n\nOur Green Lane feature can help optimize your routes!";
    }

    // Food and diet
    if (
      lowerMessage.includes("food") ||
      lowerMessage.includes("diet") ||
      lowerMessage.includes("eat") ||
      lowerMessage.includes("meat")
    ) {
      return "🥗 **Sustainable Eating:**\n\n🌱 **Plant-based meals** reduce carbon footprint\n🏪 **Local & seasonal** supports farmers\n🌾 **Organic** when possible\n📦 **Minimal packaging** reduces waste\n🍽️ **Meal planning** prevents food waste\n\nTry our Local Harvest feature to find fresh, local produce!";
    }

    // Water conservation
    if (
      lowerMessage.includes("water") ||
      lowerMessage.includes("conservation") ||
      lowerMessage.includes("save water")
    ) {
      return "💧 **Water Conservation Tips:**\n\n🚿 Take shorter showers\n🔧 Fix leaks promptly\n🌧️ Collect rainwater for gardens\n🌱 Choose drought-resistant plants\n🍽️ Run full loads in dishwasher\n⏰ Use timers for watering\n\nEvery drop counts!";
    }

    // Tips and advice
    if (
      lowerMessage.includes("tip") ||
      lowerMessage.includes("advice") ||
      lowerMessage.includes("help") ||
      lowerMessage.includes("how")
    ) {
      const tips = [
        "💡 **Quick Tip**: Replace one car trip per week with walking or biking. You'll save money, get exercise, and reduce emissions!",
        "🌟 **Pro Tip**: Start a small herb garden on your windowsill. Fresh herbs, zero packaging, and they purify your air too!",
        "♻️ **Eco Hack**: Use glass jars for food storage instead of plastic containers. They last longer and are completely recyclable!",
        "🌱 **Green Tip**: Bring your own cup to coffee shops. Many offer discounts, and you'll avoid single-use cups!",
        "💚 **Simple Switch**: Use a bamboo toothbrush instead of plastic. Small change, big impact over time!",
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    }

    // Thanks and goodbye
    if (
      lowerMessage.includes("thank") ||
      lowerMessage.includes("thanks") ||
      lowerMessage.includes("appreciate")
    ) {
      const thanks = [
        "🌟 You're so welcome! Together we can make a real difference for our planet!",
        "💚 Happy to help! Keep up the great work on your sustainability journey!",
        "🌱 My pleasure! Every eco-friendly choice you make matters!",
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }

    if (
      lowerMessage.includes("bye") ||
      lowerMessage.includes("goodbye") ||
      lowerMessage.includes("see you")
    ) {
      const goodbyes = [
        "👋 Goodbye! Keep making those green choices - the planet thanks you!",
        "🌍 See you later! Remember, every day is a chance to live more sustainably!",
        "✨ Take care! Thanks for being an eco-warrior!",
      ];
      return goodbyes[Math.floor(Math.random() * goodbyes.length)];
    }

    // Questions about the bot
    if (
      lowerMessage.includes("who are you") ||
      lowerMessage.includes("what are you") ||
      lowerMessage.includes("about you")
    ) {
      return "🤖 I'm EcoBot, your friendly sustainability assistant! I'm here to help you learn about eco-friendly living, VerdiGo's features, and how to make a positive impact on our planet. I love talking about all things green! 🌱";
    }

    // Random conversation
    if (
      lowerMessage.includes("how are you") ||
      lowerMessage.includes("how's it going")
    ) {
      const responses = [
        "🌟 I'm doing great! Always excited to help people live more sustainably!",
        "💚 Fantastic! Every conversation about sustainability makes my day!",
        "🌱 Wonderful! I love helping people discover eco-friendly solutions!",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default responses for unrecognized input
    const defaultResponses = [
      "🤔 That's interesting! While I'm still learning, I'd love to help you with sustainability questions or tell you about VerdiGo's eco-features!",
      "🌱 I'm not sure about that specific topic, but I can help with environmental tips, VerdiGo features, or sustainable living advice!",
      "💡 Hmm, let me think... How about asking me about Green Lane, Local Harvest, Air Buddy, or any sustainability topics?",
      "🌟 That's a great question! I specialize in sustainability and VerdiGo's eco-tools. What would you like to know about living green?",
      "♻️ I'd love to help! Try asking me about recycling tips, sustainable living, or any of VerdiGo's amazing features!",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isTyping) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-8 right-8 z-[11001] bg-green shadow-2xl rounded-xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 group relative"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-yellow-300 animate-pulse opacity-75" />
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[600px] bg-card rounded-2xl shadow-2xl border border-border z-40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 text-white p-6 flex items-center">
            <div className="bg-card/20 p-2 rounded-lg mr-3">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">EcoBot</h3>
              <p className="text-emerald-100 text-sm">Your Green Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-emerald-50/30 to-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs p-4 rounded-2xl shadow-sm ${
                    msg.isBot
                      ? "bg-card text-foreground border border-border"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </p>
                  <p className="text-xs mt-2 opacity-60">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card p-4 rounded-2xl shadow-sm border border-border">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-emerald-600">
                      🤖 EcoBot is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about sustainability or VerdiGo..."
                className="flex-1 p-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-emerald-50/50"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Helpful prompts */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Green Lane",
                "Sustainability tips",
                "Energy saving",
                "Recycling help",
              ].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(prompt)}
                  disabled={isTyping}
                  className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
