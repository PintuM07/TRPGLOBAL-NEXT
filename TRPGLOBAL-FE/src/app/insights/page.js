import InsightsClient from './InsightsClient';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80';

async function fetchBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://thoughtful-frog-771c7c34ea.strapiapp.com';

  // Request only the fields we render + just the image URL — much smaller payload than populate=*
  const query = [
    'fields[0]=Title',
    'fields[1]=ShortHeading',
    'fields[2]=ShortDiscription',
    'fields[3]=LongDesc',
    'fields[4]=Date',
    'fields[5]=Author',
    'populate[HeaderImage][fields][0]=url',
    'sort[0]=Date:desc',
    'sort[1]=createdAt:desc',
  ].join('&');

  try {
    const res = await fetch(`${apiUrl}/api/blogs?${query}`, {
      next: { revalidate: 60 }, // cache for 60 s — repeat visitors pay nothing
    });
    if (!res.ok) {
      console.error(`[Strapi] HTTP ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    if (!data?.data?.length) {
      console.warn('[Strapi] No data returned:', JSON.stringify(data));
      return [];
    }

    return data.data.map(item => {
      // Support Strapi v4 (item.attributes.*) and v5 (flat item.*)
      const attrs = item.attributes || item;
      // Support v4 image shape and v5 image shape
      const imgUrl = attrs.HeaderImage?.data?.attributes?.url || attrs.HeaderImage?.url || null;
      const resolvedImg = imgUrl
        ? (imgUrl.startsWith('http') ? imgUrl : `${apiUrl}${imgUrl}`)
        : FALLBACK_IMG;
      const rawDate = attrs.Date || attrs.createdAt || attrs.publishedAt;
      return {
        img: resolvedImg,
        cat: attrs.ShortHeading || 'General',
        title: attrs.Title,
        excerpt: attrs.ShortDiscription,
        longDesc: attrs.LongDesc,
        date: new Date(rawDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        dateOrder: parseInt(new Date(rawDate).toISOString().slice(0, 7).replace('-', ''), 10),
        read: '5 min read',
        category: attrs.ShortHeading || 'General',
        author: attrs.Author || 'TRP Global',
      };
    });
  } catch (err) {
    console.error('[Strapi] Fetch failed:', err);
    return [];
  }
}

export default async function InsightsPage() {
  const articles = await fetchBlogs();
  return <InsightsClient initialArticles={articles} />;
}
