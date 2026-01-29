
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Nazcorp</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a specific request or need technical support with Nazcraft? 
          Our team is available 24/7 to help you build the perfect web presence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Our Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Email Us</p>
                  <p className="text-gray-500">support@nazcorp.tech</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Call Us</p>
                  <p className="text-gray-500">+1 (555) 000-NAZCORP</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Global HQ</p>
                  <p className="text-gray-500">Suite 500, Tech Plaza, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Partnership Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} placeholder="How can we help you today?" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg transform active:scale-95">
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
