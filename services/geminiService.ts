
import { GoogleGenAI } from "@google/genai";
import { TemplateType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTIONS: Record<TemplateType, string> = {
  [TemplateType.BUSINESS]: `Generate a high-end corporate business website. Include: Hero section with CTA, 'Our Services' grid, 'Our Team', 'Testimonials', and a detailed Footer. Style: Professional, blue/dark gray palette, sharp fonts. Return only HTML with internal <style> and <script> tags. Use CDN for any icons (like FontAwesome or Lucide).`,
  
  [TemplateType.MINIMALIST]: `Generate a minimalist portfolio or resume website. Include: Large typography, plenty of white space, a brief 'About' section, and a simple project showcase. Style: Monochrome (black/white), sans-serif fonts, very clean. Return only HTML with internal CSS/JS.`,
  
  [TemplateType.CRYPTO]: `Generate a high-tech cryptocurrency dashboard/info site. Include: Real-time looking market tickers, 'AML Policies' section, and a FULLY FUNCTIONAL JS Crypto Calculator that converts BTC, ETH, SOL, and USDT into USD, EUR, GBP, INR, and AED. Calculator must be interactive. Style: Dark mode, neon accents, grid-based layout. Return only HTML with internal CSS/JS.`,
  
  [TemplateType.ECOMMERCE]: `Generate an e-commerce store (similar to Amazon/Flipkart). Include: Search bar, product categories, a grid of at least 8 featured products with prices and 'Add to Cart' buttons, and a Shopping Cart sidebar that actually updates. Also include a hidden 'User-Admin' panel section to 'add products'. Style: Modern, vibrant, user-friendly. Return only HTML with internal CSS/JS.`,
  
  [TemplateType.CHAT]: `Generate a modern social/chat interface (Instagram-like). Include: Sidebar with user stories/profiles, a main chat window with message history bubbles, an input field that 'sends' a message (local UI only), and a profile settings tab. Style: Clean gradients, rounded corners, soft shadows. Return only HTML with internal CSS/JS.`
};

export const generateWebsiteCode = async (template: TemplateType, userPrompt: string): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  const prompt = `
    Create a fully functional, responsive single-page HTML website for a ${template} template.
    User specifics: "${userPrompt}"
    Requirements:
    - Use Tailwind CSS via CDN.
    - Ensure it is mobile-friendly.
    - All logic (JS) must be inside <script> tags.
    - All styles must be inside <style> tags or Tailwind classes.
    - Follow these specific instructions for the template: ${SYSTEM_INSTRUCTIONS[template]}
    
    IMPORTANT: Provide ONLY the HTML code. No markdown blocks, no commentary. Just start with <!DOCTYPE html>.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const text = response.text || '';
    // Clean up if the model accidentally included markdown
    return text.replace(/```html|```/g, '').trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate website code. Please check your API key.");
  }
};
