import { GoogleGenAI } from "@google/genai";
import { TemplateType } from "../types";

const SYSTEM_INSTRUCTIONS: Record<TemplateType, string> = {
  [TemplateType.BUSINESS]: `Generate a high-end corporate business website. Include: Hero section with CTA, 'Our Services' grid, 'Our Team', 'Testimonials', and a detailed Footer. Style: Professional, blue/dark gray palette, sharp fonts. Return only HTML with internal <style> and <script> tags.`,
  
  [TemplateType.MINIMALIST]: `Generate a minimalist design. If for a person, make it a sleek resume/portfolio. If for a business, make it an elegant "About Us" landing page. Include: Large typography, plenty of white space. Style: Monochrome, sans-serif fonts, very clean.`,
  
  [TemplateType.CRYPTO]: `Generate a professional crypto platform. Include: Live-looking market tickers and a FULLY FUNCTIONAL JS CALCULATOR. The calculator MUST convert BTC, ETH, SOL, and USDT into USD, GBP (Pound), EUR (Euro), INR, and AED (UAE Dirham) and vice versa. Include sections for AML Policies and Privacy. Style: Dark mode, neon cyan/green accents.`,
  
  [TemplateType.ECOMMERCE]: `Generate an e-commerce store with a 'Flipkart/Amazon' inspired layout. Include: Top search bar, category navigation menu, a 'Deals of the Day' section, and at least 8 product cards with 'Add to Cart' buttons. Include a 'User Admin' mock section where products could be managed. Style: Modern, clean, multi-colored accents.`,
  
  [TemplateType.CHAT]: `Generate a functional chat interface inspired by Instagram/WhatsApp. Include: Sidebar with 'Friend IDs', a main chat window with message bubbles, and a functional-looking input area. Use JS to make the chat feel interactive (adding bubbles when 'sending'). Include a 'Verify User' splash screen.`
};

export const generateWebsiteCode = async (template: TemplateType, userPrompt: string): Promise<string> => {
  // Attempt to access the API key from the environment. 
  // We check typeof process to avoid 'ReferenceError: process is not defined' in pure browser environments.
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  
  if (!apiKey) {
    throw new Error(
      "API_KEY is missing. To fix this:\n" +
      "1. Ensure you have added 'API_KEY' to your deployment secrets (Vercel/Render/Replit).\n" +
      "2. If the error persists on a live domain, your hosting provider may not be passing 'process.env' variables to the browser automatically."
    );
  }

  // Initialize the Gemini AI client
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Create a fully functional, responsive single-page HTML website for a ${template} template.
    User specifics: "${userPrompt}"
    Requirements:
    - Use Tailwind CSS via CDN link in the head (<script src="https://cdn.tailwindcss.com"></script>).
    - Fully Responsive.
    - All JS in <script> tags, all CSS in <style> or Tailwind.
    - Template instructions: ${SYSTEM_INSTRUCTIONS[template]}
    
    IMPORTANT: Provide ONLY the raw HTML code. Do NOT wrap it in markdown code blocks. Start directly with <!DOCTYPE html>.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
      }
    });

    let text = response.text || '';
    
    // Safety check: if model still returns markdown code blocks, strip them
    if (text.includes('```')) {
      text = text.replace(/```html/g, '').replace(/```/g, '').trim();
    }
    
    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Provide a user-friendly message for common API errors
    if (error.message?.includes('API key not valid')) {
      throw new Error("The provided API key is invalid. Please check your Google AI Studio dashboard.");
    }
    throw new Error(error.message || "An unexpected error occurred while generating the website.");
  }
};