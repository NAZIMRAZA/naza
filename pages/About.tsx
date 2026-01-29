
import React from 'react';
import { Target, Users, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2">Our Story</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Born from the desire to make development accessible to everyone.</h1>
            <p className="text-lg text-gray-600 mb-6">
              Nazcorp was founded with a single mission: to bridge the gap between imagination and implementation. We noticed that millions of great ideas never saw the light of day because of the high barriers to entry in web development.
            </p>
            <p className="text-lg text-gray-600">
              Nazcraft is our flagship product, utilizing the power of Generative AI to turn text prompts into professional-grade websites instantly.
            </p>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/800/600" alt="Team Work" className="rounded-2xl shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden lg:block">
              <p className="text-3xl font-bold text-indigo-600">10k+</p>
              <p className="text-gray-500 font-medium">Websites Built</p>
            </div>
          </div>
        </div>

        {/* Pillars of Excellence */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Pillars of Nazcorp</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We operate on four core values that define every line of code we write and every user we support.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Elite Quality</h3>
            <p className="text-gray-600">No compromises. Every template is hand-crafted by design experts then scaled by AI.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">User Focus</h3>
            <p className="text-gray-600">We prioritize the 'Layman Experience'. If you can type, you can build a website.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Unmatched Trust</h3>
            <p className="text-gray-600">Transparent pricing, verifiable user verification, and robust data privacy.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Global Community</h3>
            <p className="text-gray-600">A ecosystem of users sharing prompts and pushing the boundaries of AI design.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
