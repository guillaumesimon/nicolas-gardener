import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Extract only the name of the plant from this message. If there's no plant mentioned, respond with "No plant". Message: "${message}"`
        }
      ],
    });

    console.log('Anthropic API response:', JSON.stringify(response, null, 2));

    let plantName = 'No plant';
    if (response.content && response.content.length > 0) {
      const content = response.content[0];
      if ('text' in content) {
        plantName = content.text;
      }
    }

    console.log('Extracted plant name:', plantName);

    if (!plantName || typeof plantName !== 'string' || plantName === 'No plant') {
      console.log('No valid plant name found, returning "No plant"');
      return NextResponse.json({ plantName: 'No plant' });
    }
    
    console.log('Returning plant name:', plantName);
    return NextResponse.json({ plantName });
  } catch (error) {
    console.error('Error in POST /api/extract-plant:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
