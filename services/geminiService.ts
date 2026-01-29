
import { GoogleGenAI } from "@google/genai";
import { TemplateType } from "../types";

const SYSTEM_INSTRUCTIONS: Record<TemplateType, string> = {
  [TemplateType.BUSINESS]: `Generate a high-end corporate business website. Include: Hero section with CTA, 'Our Services' grid, 'Our Team', 'Testimonials', and a detailed Footer. Style: Professional, blue/dark gray palette, sharp fonts. Return only HTML with internal <style> and <script> tags.`,
  
  [TemplateType.MINIMALIST]: `Generate a minimalist portfolio website. Include: Large typography, plenty of white space, a brief 'About' section, and a simple project showcase. Style: Monochrome (black/white), sans-serif fonts, very clean. Return only HTML with internal CSS/JS.`,
  
  [TemplateType.CRYPTO]: `Generate a crypto dashboard site. Include: Market tickers, 'AML Policies' section, and a JS Crypto Calculator for BTC/ETH/SOL to USD/EUR/INR. Style: Dark mode, neon accents. Return only HTML with internal CSS/JS.`,
  
  [TemplateType.ECOMMERCE]: `Generate an e-commerce store. Include: Search bar, product categories, 8 products with 'Add to Cart', and a Shopping Cart sidebar. Style: Modern, vibrant. Return only HTML with internal CSS/JS.`,
  
  [TemplateType.CHAT]: `Generate a chat interface (Instagram-like). Include: Sidebar, main chat window, and message history bubbles. Style: Clean gradients, rounded corners. Return only HTML with internal CSS/JS.`
};

export const generateWebsiteCode = async (template: TemplateType, userPrompt: string): Promise<string> => {
  // Use the API Key from the environment
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key not found. Please click the 'Connect Gemini API Key' button on the Service page.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelName = 'gemini-3-flash-preview';
  
  const prompt = `
    Create a fully functional, responsive single-page HTML website for a ${template} template.
    User specifics: "${userPrompt}"
    Requirements:
    - Use Tailwind CSS via CDN link in the head.
    - Responsive/Mobile-friendly.
    - All JS in <script> tags, all CSS in <style> or Tailwind.
    - Template rules: ${SYSTEM_INSTRUCTIONS[template]}
    
    IMPORTANT: Provide ONLY the HTML code. No markdown code blocks, no intro text. Start with <!DOCTYPE html>.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
      },
    });

    const text = response.text || '';
    return text.replace(/```html|```/g, '').trim();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("entity was not found")) {
      throw new Error("Invalid API Key or project not found. Please re-connect your key.");
    }
    throw new Error(error.message || "Failed to generate website.");
  }
};
