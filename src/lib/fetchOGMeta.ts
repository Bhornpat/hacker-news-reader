import ogs from 'open-graph-scraper'; //
export interface OGMeta {
  title?: string; //
  description?: string; //
  image?: string; // This will hold the URL of the first image
  imageWidth?: number; // Added for potential image width
  imageHeight?: number; // Added for potential image height
  imageAlt?: string; // Added for potential image alt text
}

export async function fetchOpenGraphMeta(url: string): Promise<OGMeta | null> { 
  try {
    const { result } = await ogs({ url }); 

    // Safely extract image URL, width, height, and alt.
    // ogImage can be an array of objects, or a single object, or undefined.
    const ogImageArray = Array.isArray(result.ogImage) ? result.ogImage : (result.ogImage ? [result.ogImage] : []);
    const firstOgImage = ogImageArray.length > 0 ? ogImageArray[0] : null;

    const imageUrl = firstOgImage?.url || ''; // Access url property of the first image object
    const imageWidth = firstOgImage?.width ? Number(firstOgImage.width) : undefined;
    const imageHeight = firstOgImage?.height ? Number(firstOgImage.height) : undefined;
    const imageAlt = firstOgImage?.alt || undefined;

    return {
      title: result.ogTitle || '', 
      description: result.ogDescription || '', 
      image: imageUrl, // Now correctly assigning a string URL
      imageWidth: imageWidth,
      imageHeight: imageHeight,
      imageAlt: imageAlt,
    };
  } catch (e) {
    console.error('OG fetch error:', e); 
    return null; //
  }
}
