import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=87dcd30e775e648ef&q=${query}&num=5`);
    const data = await response.json();

    console.log(`Google API response received for query: "${query}"`);

    if (data.items && data.items.length > 0) {
      const links = data.items.map((item: any) => {
        const link = {
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          favicon: item.pagemap?.cse_image?.[0]?.src || '',
          image: item.pagemap?.cse_image?.[0]?.src || '',
        };
        console.log(`Processed link: ${link.title}\n  Image URL: ${link.image}\n  Favicon URL: ${link.favicon}`);
        return link;
      });
      console.log(`Total links processed: ${links.length}`);
      return NextResponse.json({ links });
    } else {
      console.log('No items found in the search results');
      return NextResponse.json({ links: [] });
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}