import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEXNOW_KEY = process.env.VITE_INDEXNOW_KEY; 
const HOST = process.env.VITE_SITE_HOST || 'anuragtripathi.pro';

async function submitToIndexNow() {
  if (!INDEXNOW_KEY) {
    console.warn('VITE_INDEXNOW_KEY not found in environment. Skipping IndexNow submission.');
    return;
  }
  console.log('Starting IndexNow submission for host:', HOST);
  
  const urls = [
    `https://${HOST}/`,
    `https://${HOST}/?win=about`,
    `https://${HOST}/?win=demo`
  ];

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
    console.error('Error submitting to IndexNow:', error.message);
  }
}

submitToIndexNow();
