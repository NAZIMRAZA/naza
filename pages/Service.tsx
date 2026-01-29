import React, { useState } from 'react';
import { TemplateType } from '../types';
import { generateWebsiteCode } from '../services/geminiService';
import { Wand2, Layout, Download, Eye, Loader2, X, AlertCircle, Sparkles } from 'lucide-react';

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

  const templates = [
    { id: TemplateType.BUSINESS, name: 'Business Website', desc: 'Corporate & professional.', icon: '🏢' },
    { id: TemplateType.MINIMALIST, name: 'Minimalist Design', desc: 'Clean personal sites.', icon: '🎨' },
    { id: TemplateType.CRYPTO, name: 'Crypto & Finance', desc: 'Calculators & AML info.', icon: '🪙' },
    { id: TemplateType.ECOMMERCE, name: 'E-commerce Store', desc: 'Product grids & cart.', icon: '🛍️' },
    { id: TemplateType.CHAT, name: 'Social & Chat', desc: 'Messaging interface.', icon: '💬' },
  ];

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      setError('Please sign in or create an account to use the generator.');
      return;
    }
    if (!selectedTemplate) {
      setError('Please select a template first.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please provide a description for your website.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const code = await generateWebsiteCode(selectedTemplate, prompt);
      setGeneratedCode(code);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during generation.');
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
    a.download = `nazcraft-${selectedTemplate}-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-4">
          <Sparkles size={14} className="mr-2" />
          Nazcraft AI Engine v2.0
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Create Your Website</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Select a blueprint, describe your vision, and let our AI assemble your professional digital home.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTemplate(t.id);
              setError(null);
            }}
            className={`p-6 rounded-2xl border-2 transition-all text-left flex flex-col items-center md:items-start ${
              selectedTemplate === t.id 
                ? 'border-indigo-600 bg-indigo-50 shadow-md transform scale-105' 
                : 'border-gray-100 bg-white hover:border-indigo-200 hover:shadow-sm'
            }`}
          >
            <div className="text-4xl mb-3">{t.icon}</div>
            <h3 className="font-bold text-sm text-gray-900">{t.name}</h3>
            <p className="text-[10px] text-gray-400 mt-1 hidden md:block">{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative z-10">
          <label className="block text-xs font-black text-indigo-600 mb-3 uppercase tracking-widest">Instruction Manual</label>
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Tell us everything... 'A luxury watches boutique with a gold and black theme, including a collection gallery and a contact form.'"
            className="w-full h-40 p-5 bg-gray-50 border-gray-100 border-2 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none resize-none mb-8 transition-all text-lg"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !isAuthenticated}
              className={`flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-200 ${isLoading ? 'cursor-not-allowed' : 'active:scale-95'}`}
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
              <span>{isLoading ? 'Assembling Components...' : 'Generate My Website'}</span>
            </button>

            {generatedCode && !isLoading && (
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowPreview(true)} 
                  className="px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold flex items-center space-x-2 hover:bg-black transition-all shadow-lg active:scale-95"
                >
                  <Eye size={20} /> <span>Preview</span>
                </button>
                <button 
                  onClick={handleDownload} 
                  className="px-8 py-5 bg-emerald-500 text-white rounded-2xl font-bold flex items-center space-x-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                >
                  <Download size={20} /> <span>Download</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-8 p-5 bg-red-50 text-red-700 rounded-2xl flex items-center space-x-4 border border-red-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertCircle size={20} />
          </div>
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {!isAuthenticated && !isLoading && (
        <div className="mt-10 p-6 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 rounded-3xl text-center border border-amber-100 shadow-inner">
          <p className="font-medium">Account required! <span className="underline font-bold cursor-pointer">Sign in</span> to access the Nazcraft AI generator.</p>
        </div>
      )}

      {showPreview && generatedCode && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/95 backdrop-blur-md p-4 sm:p-8">
          <div className="bg-white w-full h-full max-w-7xl rounded-[2rem] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">N</div>
                <div>
                  <h3 className="font-bold text-gray-900">Live Preview</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Template: {selectedTemplate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleDownload}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-sm hover:bg-emerald-100 transition-colors"
                >
                  <Download size={16} /> <span>Save Result</span>
                </button>
                <button 
                  onClick={() => setShowPreview(false)} 
                  className="p-3 hover:bg-gray-200 rounded-full transition-all text-gray-500 hover:text-gray-900"
                >
                  <X size={28} />
                </button>
              </div>
            </div>
            <div className="flex-grow w-full bg-white relative">
               <iframe 
                srcDoc={generatedCode} 
                className="w-full h-full border-none" 
                title="AI Generated Website Preview"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;