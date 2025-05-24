import { useRef, useState } from "react";

interface ChatInputProps {
  onSend?: (message: string) => Promise<void>;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputRef.current || isLoading) return;

    const message = inputRef.current.innerText.trim();
    if (message) {
      setIsLoading(true);
      try {
        await onSend?.(message);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsLoading(false);
        if (inputRef.current) {
          inputRef.current.innerHTML = ""; 
        }
      }
    } else {
      if (inputRef.current) {
        inputRef.current.innerHTML = "";
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInput = (_event: React.FormEvent<HTMLDivElement>) => {
    if (inputRef.current && inputRef.current.innerText.trim() === "" && inputRef.current.innerHTML !== "") {
      inputRef.current.innerHTML = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 w-2/3 max-w-2xl bg-surface-secondary rounded-2xl">
      <div className="relative w-full max-h-40 overflow-y-auto">
        <div
          ref={inputRef}
          id="message-input"
          contentEditable={!isLoading}
          role="textbox"
          className={`w-full h-full p-4 outline-none
            empty:before:content-[attr(data-placeholder)] empty:before:absolute
            empty:before:left-4 empty:before:top-4
            empty:before:text-gray-500 empty:before:pointer-events-none
            ${isLoading ? "cursor-not-allowed" : ""}`}
          data-placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        ></div>
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center cursor-not-allowed">
          </div>
        )}
      </div>

      <div className="flex items-center justify-end p-2">
        <button
          className="material-symbols-outlined text-accent hover:cursor-pointer"
          style={{
            fontVariationSettings: isLoading
              ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
              : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            fontSize: "24px",
          }}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "stop_circle" : "send"}
        </button>
      </div>
    </div>
  );
}
