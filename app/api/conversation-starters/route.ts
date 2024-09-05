import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function GET() {
  console.log('Conversation starters API route called');
  try {
    console.log('Calling Groq API to generate conversation starters');
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that generates short conversation starters in the form of questions that a person would typically ask a gardener. Each question should be in French, be a maximum of 5 words, and focus on common gardening topics or problems. Provide only the questions, without any introductory text or numbering.'
        },
        {
          role: 'user',
          content: 'Generate 4 short French gardening questions.'
        }
      ],
      model: 'llama-3.1-70b-versatile',
      max_tokens: 150,
    });

    console.log('Groq API response received:', JSON.stringify(response, null, 2));

    const starters = response.choices[0].message.content
      ?.split('\n')
      .filter((starter: string) => starter.trim() !== '')
      .map((starter: string) => starter.trim()) || [];

    console.log('Generated conversation starters:', starters);

    return NextResponse.json({ starters });
  } catch (error) {
    console.error('Error generating conversation starters:', error);
    // Fallback to static starters
    const fallbackStarters = [
      "Comment cultiver des tomates ?",
      "Quelles plantes pour l'ombre ?",
      "Astuces pour un compost réussi ?",
      "Combattre les pucerons naturellement ?"
    ];
    return NextResponse.json({ starters: fallbackStarters });
  }
}
