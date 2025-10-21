import { useEffect, useRef, useState } from 'react';
import { Bot, BotMessageSquare, Send, User, X } from 'lucide-react';
import type { Message } from '@/schema/message';
import { createChatSession, sendMessage } from '@/api/chat';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionID, setSessionID] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: 'Hello, how can I help you today?',
          sender: 'assistant',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      id: (messages.length + 1).toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    } as Message;

    setMessages((prevMessages) => [...prevMessages, message]);
    setInputValue('');

    const response = sessionID
      ? await sendMessage(sessionID, message.text)
      : await createChatSession(message.text);

    if (!sessionID) {
      setSessionID(response.sessionID);
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: (messages.length + 1).toString(),
        text: response.response,
        sender: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40'
      >
        {isOpen ? (
          <X className='h-6 w-6' />
        ) : (
          <BotMessageSquare className='h-6 w-6' />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className='fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-40'>
          {/* Chat Header */}
          <div className='bg-blue-600 text-white p-4 rounded-t-xl'>
            <div className='flex items-center space-x-2'>
              <Bot className='h-5 w-5' />
              <div>
                <h3 className='font-semibold'>Furniture Assistant</h3>
                <p className='text-xs text-blue-100'>
                  Online now{' '}
                  <span className='inline-block bg-green-500 text-white rounded-full h-2 w-2 text-xs' />
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className='flex items-start space-x-2'>
                    {message.sender === 'assistant' && (
                      <Bot className='h-4 w-4 mt-0.5 text-blue-600' />
                    )}
                    {message.sender === 'user' && (
                      <User className='h-4 w-4 mt-0.5 text-blue-100' />
                    )}
                    <div>
                      <p className='text-sm'>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className='p-4 border-t border-gray-200'>
            <form className='flex space-x-2' onSubmit={handleSendMessage}>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Ask about furniture...'
                className='flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
              />
              <button
                type='submit'
                disabled={!inputValue.trim()}
                className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Send className='h-4 w-4' />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
