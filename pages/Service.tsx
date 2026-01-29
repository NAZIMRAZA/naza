
import React, { useState } from 'react';
import { TemplateType } from '../types';
import { generateWebsiteCode } from '../services/geminiService';
import { Wand2, Layout, Download, Eye, Loader2, X, AlertCircle } from 'lucide-react';

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
    { id: TemplateType.BUSINESS, name: 'Business Website', desc: 'Corporate & professional sites.', icon: '🏢' },
    { id: TemplateType.MINIMALIST, name: 'Minimalist Design', desc: 'Clean, elegant personal sites.', icon: '🎨' },
    { id: TemplateType.CRYPTO, name: 'Crypto & Finance', desc: 'Charts, calculators & AML info.', icon: '🪙' },
    { id: TemplateType.ECOMMERCE, name: 'E-commerce Store', desc: 'Product grids & cart logic.', icon: '🛍️' },
    { id: TemplateType.CHAT, name: 'Social & Chat', desc: 'Interactive messaging UIs.', icon: '💬' },
  ];

  const handleGenerate = async () => {
    if (!selectedTemplate) return alert('Please select a template!');
    if (!prompt.trim()) return alert('Please enter a description!');
    if (!isAuthenticated) return alert('You must be signed in to generate websites.');

    setIsLoading(true);
    setError(null);
    try {
      const code = await generateWebsiteCode(selectedTemplate, prompt);
      setGeneratedCode(code);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">The Magic Creator</h1>
        <p className="text-gray-600">Select your base template and describe your vision below.</p>
      </div>

      {!isAuthenticated && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center space-x-3 text-amber-700">
          <AlertCircle size={20} />
          <span>Please <strong>Sign In</strong> to use the generator.</span>
        </div>
      )}

      {/* Template Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              selectedTemplate === t.id 
                ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-200' 
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <div className="text-4xl mb-3">{t.icon}</div>
            <h3 className="font-bold text-gray-900">{t.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
          </button>
        ))}
      </div>

      {/* Prompt Input */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Describe your website</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: A dark-themed bakery business named 'Crusty Delights' in London. Include a menu section and a contact form with a picture of a sourdough bread."
          className="w-full h-40 p-5 bg-gray-50 border-gray-200 border rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all outline-none resize-none"
        />
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !isAuthenticated}
            className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg ${
              isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Generating Magic...</span>
              </>
            ) : (
              <>
                <Wand2 size={20} />
                <span>Create Website</span>
              </>
            )}
          </button>

          {generatedCode && (
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center space-x-2 hover:bg-gray-200"
              >
                <Eye size={20} />
                <span>View Page</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-4 bg-green-100 text-green-700 rounded-xl font-bold flex items-center space-x-2 hover:bg-green-200"
              >
                <Download size={20} />
                <span>Download Source</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center font-medium">
          {error}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && generatedCode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10">
          <div className="bg-white w-full h-full rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center space-x-2">
                <Layout size={20} className="text-indigo-600" />
                <span className="font-bold text-gray-700">Preview: {selectedTemplate}</span>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <iframe
              srcDoc={generatedCode}
              title="Generated Site Preview"
              className="flex-grow w-full border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
