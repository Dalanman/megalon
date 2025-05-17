import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { promises as fs } from 'fs';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructions = await fs.readFile("summarizer.txt", "utf-8");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
          { role: 'developer', content: instructions }, 
          { role: 'user', content: prompt }],
    });

    const message = completion.choices[0]?.message?.content;

    if (message != null){

      // const summaries = JSON.parse(message);
      // Split into individual JSON object strings
      const jsonObjects = message
          .trim()
          .split(/\n(?={)/g) // splits at each new JSON object (starting with "{")
          .map(str => str.trim())
          .filter(str => str.length > 0);

      // Parse each string into a real JSON object
      const parsedObjects = jsonObjects.map(jsonStr => JSON.parse(jsonStr));
      res.status(200).json({ response: parsedObjects});
    }


  } catch (error: any) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
