/**
 * IndexNow Implementation for Anurag Tripathi Portfolio
 * 
 * Documentation:
 * 1. Generate API key at https://www.bing.com/indexnow
 * 2. Save key to public/[key].txt
 * 3. Call submitToIndexNow() on content updates or at the end of build.
 */

const INDEXNOW_KEY = import.meta.env.VITE_INDEXNOW_KEY;
const HOST = import.meta.env.VITE_SITE_HOST || 'anuragtripathi.pro';

export async function submitToIndexNow(urls: string[]) {
  if (!INDEXNOW_KEY || INDEXNOW_KEY === 'your_indexnow_api_key_here') {
    console.warn('IndexNow key not configured. Skipping submission.');
    return;
  }

  const endpoint = 'https://api.indexnow.org/indexnow';
  const data = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Successfully submitted URLs to IndexNow:', urls);
    } else {
      console.error('IndexNow submission failed:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error submitting to IndexNow:', error);
  }
}

// Example usage triggered on build or via Netlify Function
// submitToIndexNow(['https://anuragtripathi.pro/']);
