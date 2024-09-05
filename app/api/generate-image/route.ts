import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { Groq } from 'groq-sdk';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log('Original prompt:', prompt);

    // Improve prompt using Groq
    const improvedPromptResponse = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that improves image prompts. Modify the prompt to describe a realistic, wide-angle photography of a beautiful garden with sunlight. Focus on composition and atmosphere rather than specific details. Provide only the improved prompt, without any additional text or explanations.'
        },
        {
          role: 'user',
          content: `Improve this image prompt for a garden scene: ${prompt}`
        }
      ],
      model: 'mixtral-8x7b-32768',
      max_tokens: 100,
    });

    const improvedPrompt = improvedPromptResponse.choices[0].message.content;
    console.log('Improved prompt:', improvedPrompt);

    // Generate image using Flux
    const output = await replicate.run(
      "black-forest-labs/flux-dev",
      {
        input: {
          prompt: improvedPrompt,
          guidance: 3.5
        }
      }
    );
    console.log('Flux output:', output);

    if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ image: output[0], improvedPrompt });
    } else {
      throw new Error('Unexpected output format from Replicate');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}