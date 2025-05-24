import { useState, ReactNode, useEffect } from "react";
import Popup from "@/app/components/shared/Popup";
import ThemeSelector from "./ThemeSelector";

interface SettingsRowProps {
  label: string;
  children: ReactNode;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ label, children }) => {
  return (
    <div className="flex items-center py-4 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
      <span className="w-32 shrink-0">{label}</span>
      <div className="ml-4 flex-grow">{children}</div>
    </div>
  );
};

const MASK_VISIBLE_CHARS = 4;

const maskApiKey = (key: string) => {
  if (!key) return "";
  if (key.length <= MASK_VISIBLE_CHARS) return key;
  return (
    key.substring(0, MASK_VISIBLE_CHARS) +
    "*".repeat(key.length - MASK_VISIBLE_CHARS)
  );
};

const copyApiKey = (key: string) => {
  navigator.clipboard.writeText(key);
  alert("API key copied to clipboard");
};

export default function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [rememberApiKey, setRememberApiKey] = useState(false);

  useEffect(() => {
    const storedRememberApiKey = localStorage.getItem("rememberApiKey");
    if (storedRememberApiKey) {
      setRememberApiKey(storedRememberApiKey === "true");
    }
  }, []);

  useEffect(() => {
    if (rememberApiKey) {
      localStorage.setItem("rememberApiKey", "true");
    } else {
      localStorage.removeItem("rememberApiKey");
    }
  }, [rememberApiKey]);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("geminiApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("geminiApiKey", apiKey);
    } else {
      localStorage.removeItem("geminiApiKey");
    }
  }, [apiKey]);

  const displayedApiKey = isKeyVisible ? apiKey : maskApiKey(apiKey);

  return (
    <>
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-4 w-full p-4">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>

          <div className="flex flex-col">
            {/* Theme Section */}
            <SettingsRow label="Theme">
              <div className="flex flex-row gap-2">
                <ThemeSelector />
              </div>
            </SettingsRow>

            {/* Gemini API Key Section */}
            <SettingsRow label="Gemini API Key">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 border border-neutral-500 rounded-md p-2">
                  <input
                    type="text"
                    value={displayedApiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full outline-none"
                    placeholder="Enter your API key"
                  />

                  <div className="flex flex-row gap-2 backdrop-blur-lg">
                    <button
                      className="material-symbols-outlined text-base!"
                      onClick={() => copyApiKey(apiKey)}
                    >
                      content_copy
                    </button>

                    <button
                      className="material-symbols-outlined text-base!"
                      onClick={() => setIsKeyVisible(!isKeyVisible)}
                    >
                      {isKeyVisible ? "visibility_off" : "visibility"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <input type="checkbox" id="rememberApiKey" checked={rememberApiKey} onChange={(e) => setRememberApiKey(e.target.checked)} />
                  <label htmlFor="rememberApiKey">Remember API key</label>
                </div>
              </div>
            </SettingsRow>
          </div>
        </div>
      </Popup>

      <div className="flex items-center justify-center">
        <button onClick={() => setIsOpen(true)}>
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </>
  );
}
