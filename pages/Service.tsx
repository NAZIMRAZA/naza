import React, { useState, useEffect } from 'react';
import { TemplateType } from '../types';
import { generateWebsiteCode } from '../services/geminiService';
import { Wand2, Download, Eye, Loader2, X, AlertCircle, Settings, Key, Check } from 'lucide-react';

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
  
  // API Key Management
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [hasStoredKey, setHasStoredKey] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('NAZCRAFT_USER_API_KEY');
    if (saved) {
      setHasStoredKey(true);
      setTempApiKey(saved);
    }
  }, []);

  const saveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('NAZCRAFT_USER_API_KEY', tempApiKey.trim());
      setHasStoredKey(true);
      setShowKeyInput(false);
      setError(null);
    } else {
      localStorage.removeItem('NAZCRAFT_USER_API_KEY');
      setHasStoredKey(false);
    }
  };

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to access the AI generator.');
      return;
    }
    if (!selectedTemplate) {
      setError('Please select a template blueprint first.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please describe the website you want to build.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Pass the manually entered key if it exists
      const code = await generateWebsiteCode(selectedTemplate, prompt, tempApiKey);
      setGeneratedCode(code);
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes('Missing API Key')) {
        setShowKeyInput(true);
      }
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
    URL.revokeObjectURL(url);
  };

  const templates = [
    { id: TemplateType.BUSINESS, name: 'Business Website', desc: 'Corporate & professional.', icon: '🏢' },
    { id: TemplateType.MINIMALIST, name: 'Minimalist Design', desc: 'Clean personal sites.', icon: '🎨' },
    { id: TemplateType.CRYPTO, name: 'Crypto & Finance', desc: 'Calculators & AML info.', icon: '🪙' },
    { id: TemplateType.ECOMMERCE, name: 'E-commerce Store', desc: 'Product grids & cart.', icon: '🛍️' },
    { id: TemplateType.CHAT, name: 'Social & Chat', desc: 'Messaging interface.', icon: '💬' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Website Generator</h1>
          <p className="text-gray-500">Describe your vision and watch Nazcraft AI build it instantly.</p>
        </div>
        <button 
          onClick={() => setShowKeyInput(!showKeyInput)}
          className={`p-3 rounded-full transition-all ${showKeyInput ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400 hover:text-indigo-600 border border-gray-100 shadow-sm'}`}
        >
          <Settings size={24} />
        </button>
      </div>

      {/* API Key Configuration Panel */}
      {showKeyInput && (
        <div className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-3xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-2 mb-4">
            <Key className="text-indigo-600" size={20} />
            <h3 className="font-bold text-indigo-900">API Configuration</h3>
          </div>
          <p className="text-sm text-indigo-700 mb-4">
            If you are getting an 'API Key' error, please paste your Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline font-bold">Google AI Studio</a> below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="password"
              placeholder="Paste your Gemini API Key here..."
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="flex-grow p-4 bg-white border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
            <button 
              onClick={saveApiKey}
              className="px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all"
            >
              <Check size={20} />
              <span>Save Key</span>
            </button>
          </div>
          {hasStoredKey && (
            <p className="mt-3 text-xs text-green-600 font-medium flex items-center">
              <Check size={12} className="mr-1" /> API Key is stored in your browser.
            </p>
          )}
        </div>
      )}

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
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Website Details & Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'A modern bakery website with a menu section, a golden theme, and a contact form...'"
          className="w-full h-32 p-4 bg-gray-50 border-gray-200 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-6"
        />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
            <span>{isLoading ? 'Crafting Your Site...' : 'Build Website Now'}</span>
          </button>

          {generatedCode && (
            <div className="flex gap-2">
              <button onClick={() => setShowPreview(true)} className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center space-x-2 hover:bg-gray-200 transition-colors">
                <Eye size={20} /> <span>Preview</span>
              </button>
              <button onClick={handleDownload} className="px-6 py-4 bg-green-600 text-white rounded-xl font-bold flex items-center space-x-2 hover:bg-green-700 transition-colors">
                <Download size={20} /> <span>Save Source</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start space-x-3 border border-red-100 shadow-sm animate-in fade-in duration-300">
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-bold mb-1">Error Occurred</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {showPreview && generatedCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full h-full max-w-6xl rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="ml-4 font-bold text-gray-600 text-sm">Nazcraft Live Preview</span>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <iframe srcDoc={generatedCode} className="flex-grow w-full border-none" title="Nazcraft Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;