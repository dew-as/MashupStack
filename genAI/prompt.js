const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyC1kjMyNChZ6jXPk7uuP5ftdDkUzQl-NGY');

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run() {
    const prompt = "Top 10 Programming Languages"
    const params = {
        maxTokens: 100, // Set the maximum token limit
        stop: ["\n\n"], // Optional: specify a stop sequence
        temperature: 0.7, // Optional: adjust the temperature
      };
    
  
    const result = await model.generateContent(prompt,params);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();