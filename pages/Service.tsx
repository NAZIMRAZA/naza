
import React, { useState, useEffect } from 'react';
import { TemplateType } from '../types';
import { generateWebsiteCode } from '../services/geminiService';
import { Wand2, Layout, Download, Eye, Loader2, X, AlertCircle, Key, CheckCircle } from 'lucide-react';

interface ServiceProps {
  isAuthenticated: boolean;
}

const Service: React.FC<ServiceProps> = ({ isAuthenticated }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    const checkKeyStatus = async () => {
      // @ts-ignore
      if (window.aistudio?.hasSelectedApiKey) {
        try {
          // @ts-ignore
          const connected = await window.aistudio.hasSelectedApiKey();
          setHasKey(connected);
        } catch (e) {
          console.debug("Bridge check failed", e);
        }
      } else if (process.env.API_KEY) {
        setHasKey(true);
      }
    };
    checkKeyStatus();
  }, []);

  const handleConnectKey = async () => {
    // @ts-ignore
    if (window.aistudio?.openSelectKey) {
      try {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        setHasKey(true); // Assume success per system instructions
      } catch (e) {
        console.error("Key selection failed", e);
      }
    } else {
      alert("API Key selection is not available in this environment. Please ensure API_KEY is set in your environment variables.");
    }
  };

  const templates = [
    { id: TemplateType.BUSINESS, name: 'Business Website', desc: 'Corporate & professional.', icon: '🏢' },
    { id: TemplateType.MINIMALIST, name: 'Minimalist Design', desc: 'Clean personal sites.', icon: '🎨' },
    { id: TemplateType.CRYPTO, name: 'Crypto & Finance', desc: 'Calculators & AML info.', icon: '🪙' },
    { id: TemplateType.ECOMMERCE, name: 'E-commerce Store', desc: 'Product grids & cart.', icon: '🛍️' },
    { id: TemplateType.CHAT, name: 'Social & Chat', desc: 'Messaging interface.', icon: '💬' },
  ];

  const handleGenerate = async () => {
    if (!isAuthenticated) return alert('Please sign in first.');
    if (!selectedTemplate) return alert('Please select a template.');
    if (!prompt.trim()) return alert('Please describe your website.');
    if (!hasKey && !process.env.API_KEY) return alert('Please connect your Gemini API Key first.');

    setIsLoading(true);
    setError(null);
    try {
      const code = await generateWebsiteCode(selectedTemplate, prompt);
      setGeneratedCode(code);
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("Key")) setHasKey(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nazcraft-${selectedTemplate}.html`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Website Generator</h1>
        <p className="text-gray-500">Transform your ideas into reality with AI.</p>

        {/* API Connection Button */}
        <div className="mt-6">
          <button
            onClick={handleConnectKey}
            disabled={hasKey}
            className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-full font-bold transition-all border shadow-sm ${
              hasKey 
                ? 'bg-green-50 text-green-700 border-green-200 cursor-default' 
                : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 active:scale-95'
            }`}
          >
            {hasKey ? <CheckCircle size={18} /> : <Key size={18} />}
            <span>{hasKey ? 'Gemini AI Connected' : 'Connect Gemini API Key'}</span>
          </button>
          {!hasKey && (
            <p className="text-xs text-red-500 mt-2 font-medium">
              Note: You must connect your key before generating.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`p-5 rounded-2xl border-2 transition-all text-left ${
              selectedTemplate === t.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 bg-white hover:border-indigo-200'
            }`}
          >
            <div className="text-3xl mb-2">{t.icon}</div>
            <h3 className="font-bold text-sm">{t.name}</h3>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your dream website here..."
          className="w-full h-32 p-4 bg-gray-50 border-gray-200 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-6"
        />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !isAuthenticated}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
            <span>{isLoading ? 'Building...' : 'Generate Website'}</span>
          </button>

          {generatedCode && (
            <div className="flex gap-2">
              <button onClick={() => setShowPreview(true)} className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center space-x-2 hover:bg-gray-200">
                <Eye size={20} /> <span>View</span>
              </button>
              <button onClick={handleDownload} className="px-6 py-4 bg-green-600 text-white rounded-xl font-bold flex items-center space-x-2 hover:bg-green-700">
                <Download size={20} /> <span>Save</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center space-x-2 border border-red-100">
          <AlertCircle size={20} />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {showPreview && generatedCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full h-full max-w-6xl rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <span className="font-bold">Website Preview</span>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <X size={24} />
              </button>
            </div>
            <iframe srcDoc={generatedCode} className="flex-grow w-full border-none" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
