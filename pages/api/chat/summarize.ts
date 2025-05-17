import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { promises as fs } from 'fs';
import { parse } from 'path';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const instructions = await fs.readFile("summarizer.txt", "utf-8");

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: JSON.stringify(prompt, null, 2) }
      ]
    });

    const message = completion.choices[0]?.message?.content;

    if (message != null) {
      const jsonObjects = message
        .trim()
        .split(/\n(?={)/g)
        .map(str => str.trim())
        .filter(str => str.length > 0);

      const parsedObjects = jsonObjects.map(jsonStr => JSON.parse(jsonStr));

      res.status(200).json({ response: parsedObjects });
    } else {
      res.status(500).json({ error: 'No content returned from OpenAI.' });
    }

  } catch (error: any) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

