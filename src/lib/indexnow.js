const INDEXNOW_KEY = '8e52a8a58a74e5bd8dcaf16a928e469e';

/**
 * Submits a URL to the IndexNow API to trigger instant crawling by search engines (Bing, Yandex, etc.)
 * @param {string} rawPath - The path of the updated/created content (e.g. '/blog/my-post')
 */
export async function submitToIndexNow(rawPath) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.resugrow.com';
    const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    const fullUrl = `${siteUrl}${cleanPath}`;

    const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(fullUrl)}&key=${INDEXNOW_KEY}`;
    
    // We send a GET request as per the IndexNow protocol for single URLs
    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (response.ok) {
      console.log(`[IndexNow] Successfully submitted URL: ${fullUrl}`);
    } else {
      console.warn(`[IndexNow] Failed to submit URL: ${fullUrl}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`[IndexNow] Error submitting URL:`, error);
  }
}
