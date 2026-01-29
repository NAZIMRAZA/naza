
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, Globe } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50 to-transparent -z-10"></div>
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-8">
          <Sparkles size={16} className="mr-2" />
          AI-Powered Website Building
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 max-w-4xl">
          Craft Your Digital Presence <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            In Seconds with Nazcraft
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          The world's most intuitive AI web engine. Describe your vision, select a template, and watch Nazcorp's intelligence bring it to life.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/service" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1">
            Start Building Free
          </Link>
          <Link to="/about" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg shadow-sm hover:bg-gray-50 transition-all">
            Learn Our Process
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Our proprietary AI model generates optimized, high-performance code in under 10 seconds.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Verified Trust</h3>
            <p className="text-gray-600">Security-first architecture ensuring your data and generated source code are protected.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Ready</h3>
            <p className="text-gray-600">Multi-language support and international SEO standards built into every generated site.</p>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="bg-indigo-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 italic">"Nazcraft by Nazcorp isn't just a tool; it's a paradigm shift in how we approach the web."</h2>
          <div className="flex items-center justify-center space-x-4">
            <img src="https://picsum.photos/id/64/100/100" alt="CEO" className="w-12 h-12 rounded-full border-2 border-indigo-400" />
            <div className="text-left">
              <p className="font-bold text-lg leading-tight">Alex Rivera</p>
              <p className="text-indigo-300 text-sm">CTO, Future Systems</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
