interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
}

interface ChatResponseProps {
  messages: Message[];
}

const ChatResponse = ({ messages }: ChatResponseProps) => {
  if (messages.length === 0) {
    return (
      <div className="mt-8 p-6 text-center text-muted-foreground">
        <p>Ask a question to explore your data...</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="space-y-1">
          {message.type === "user" ? (
            <div>
              <span className="font-semibold text-foreground">User Query: </span>
              <span className="text-foreground">{message.content}</span>
            </div>
          ) : (
            <p className="text-response-text leading-relaxed">
              {message.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatResponse;
