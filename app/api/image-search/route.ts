import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  console.log('Image search query:', query);

  if (!query) {
    console.log('Error: Query parameter is missing');
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${query}&searchType=image&num=1`);
    const data = await response.json();

    console.log('Google API response:', JSON.stringify(data, null, 2));

    if (data.items && data.items.length > 0) {
      const imageUrl = data.items[0].link;
      console.log('Found image URL:', imageUrl);
      return NextResponse.json({ imageUrl });
    } else {
      console.log('No image found for query:', query);
      return NextResponse.json({ error: 'No image found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
