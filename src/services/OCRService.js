import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('YOUR_API_KEY');

export const processOCR = async (base64Image) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    const result = await model.generateContent({
      contents: [{
        parts: [{
          inlineData: {
            data: base64Image,
            mimeType: 'image/jpeg'
          }
        }, {
          text: "Extract total amount and date from this receipt. Respond in JSON format: { total: number, date: string }"
        }]
      }]
    });

    const response = result.response.text();
    return parseOCRResponse(response);
  } catch (error) {
    throw new Error('OCR processing failed: ' + error.message);
  }
};

const parseOCRResponse = (text) => {
  try {
    const jsonString = text.match(/\{.*\}/s)[0];
    return JSON.parse(jsonString);
  } catch {
    return { total: null, date: new Date().toISOString() };
  }
};