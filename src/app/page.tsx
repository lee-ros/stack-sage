"use client";

import SettingsPopup from "@/app/components/settings/SettingsPopup";
import ChatInput from "@/app/components/chat/ChatInput";

export default function Home() {
  const sendMessage = async (message: string) => {  
    let response;
    try {
      response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  
    if (!response) {
      console.error("Failed to send message: No response from server");
      throw new Error("No response from server");
    }

    if (!response.ok) {
      console.error(`Failed to send message: ${response.status} ${response.statusText}`);
      throw new Error(`Server error: ${response.status}`);
    }
  
    try {
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to parse response JSON:", error);
      throw error;
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="flex items-center justify-between p-4 bg-surface-secondary">
        <h1 className="text-2xl font-bold">New Chat</h1>
        
        <SettingsPopup />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Stack Sage</h1>
          <p className="text-lg">Your AI-powered coding assistant</p>
        </div>

        <ChatInput
          // loading prop removed
          onSend={sendMessage}
        />
      </main>
    </div>
  );
}
