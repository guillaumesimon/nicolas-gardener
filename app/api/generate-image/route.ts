import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const output = await replicate.run(
      "black-forest-labs/flux-dev",
      {
        input: {
          prompt: prompt,
          guidance: 3.5
        }
      }
    );
    if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ image: output[0] });
    } else {
      throw new Error('Unexpected output format from Replicate');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}