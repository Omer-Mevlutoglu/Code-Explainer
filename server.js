import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import process from "node:process";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });

app.post("/api/explain", async (req, res) => {
  try {
    const { code } = req.body;

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that explains code.",
        },
        { role: "user", content: `Explain this code the shortest way you can :\n\n${code}` },
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName,
    });

    res.json({ explanation: response.choices[0].message.content });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
