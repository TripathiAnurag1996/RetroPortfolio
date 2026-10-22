import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, '..', 'data', 'promptive-sentry-ALL-links-influencer-ranked.csv');
const OUT_PATH = path.join(__dirname, '..', 'src', 'data', 'wallOfFame.ts');

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function detectPlatformAndKind(url, creator) {
  const lowerUrl = url.toLowerCase();
  const lowerCreator = creator.toLowerCase();

  if (lowerCreator.includes('product hunt') || lowerUrl.includes('producthunt') || lowerUrl.includes('t.co/7zilsfdbei')) {
    return {
      platform: 'producthunt',
      kind: 'listing',
      cleanId: 'producthunt-listing'
    };
  }

  if (lowerUrl.includes('instagram.com/reel/')) {
    const match = url.match(/instagram\.com\/reel\/([^/?#&]+)/i);
    const shortcode = match ? match[1] : `ig-${Math.random().toString(36).slice(2, 8)}`;
    return {
      platform: 'instagram',
      kind: 'reel',
      embedUrl: `https://www.instagram.com/reel/${shortcode}/embed/captioned/`,
      cleanId: `ig-${shortcode}`
    };
  }

  if (lowerUrl.includes('youtube.com/shorts/')) {
    const match = url.match(/youtube\.com\/shorts\/([^/?#&]+)/i);
    const vid = match ? match[1] : `yt-${Math.random().toString(36).slice(2, 8)}`;
    return {
      platform: 'youtube',
      kind: 'short',
      embedUrl: `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`,
      cleanId: `yt-short-${vid}`
    };
  }

  if (lowerUrl.includes('youtube.com/watch') || lowerUrl.includes('youtu.be/')) {
    let vid = '';
    const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^/?#&]+)/);
    if (match) {
      vid = match[1];
    } else {
      vid = `yt-${Math.random().toString(36).slice(2, 8)}`;
    }
    return {
      platform: 'youtube',
      kind: 'video',
      embedUrl: `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`,
      cleanId: `yt-video-${vid}`
    };
  }

  if (lowerUrl.includes('x.com') || lowerUrl.includes('twitter.com')) {
    const match = url.match(/status\/(\d+)/);
    const tweetId = match ? match[1] : 'profile';
    return {
      platform: 'x',
      kind: 'post',
      cleanId: `x-${tweetId}`
    };
  }

  if (lowerUrl.includes('dev.to/')) {
    const parts = url.split('/').filter(Boolean);
    const slug = parts[parts.length - 1] || 'devto-article';
    return {
      platform: 'devto',
      kind: 'article',
      cleanId: `devto-${slug.slice(0, 20)}`
    };
  }

  if (lowerUrl.includes('medium.com/')) {
    const parts = url.split('/').filter(Boolean);
    const slug = parts[parts.length - 1] || 'medium-article';
    return {
      platform: 'medium',
      kind: 'article',
      cleanId: `medium-${slug.slice(0, 20)}`
    };
  }

  return {
    platform: 'blog',
    kind: 'article',
    cleanId: `blog-${Math.random().toString(36).slice(2, 8)}`
  };
}

function run() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found at ${CSV_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = raw.split(/\r?\n/).filter(line => line.trim().length > 0);

  const seenUrls = new Set();
  const items = [];

  for (let i = 1; i < lines.length; i++) {
    const [rankStr, creatorRaw, urlRaw] = parseCSVLine(lines[i]);
    const rank = parseInt(rankStr, 10);
    if (isNaN(rank) || !urlRaw || !creatorRaw) continue;

    const url = urlRaw.trim();
    if (seenUrls.has(url)) continue;
    seenUrls.add(url);

    const isFounder = creatorRaw.toLowerCase().includes('founder') || creatorRaw.toLowerCase().includes('anurag tripathi');
    const isListing = creatorRaw.toLowerCase().includes('product hunt') || url.includes('t.co/7zilsfdbei');

    const { platform, kind, embedUrl, cleanId } = detectPlatformAndKind(url, creatorRaw);

    items.push({
      id: `${cleanId}-${rank}`,
      rank,
      creator: creatorRaw.trim(),
      platform,
      url,
      kind,
      isFounder,
      isListing,
      ...(embedUrl ? { embedUrl } : {})
    });
  }

  items.sort((a, b) => a.rank - b.rank);

  const outCode = `// Generated automatically from data/promptive-sentry-ALL-links-influencer-ranked.csv
// DO NOT EDIT DIRECTLY. To add links, append to the CSV and run: npm run build:fame

export type PlatformType = 'instagram' | 'youtube' | 'x' | 'devto' | 'medium' | 'blog' | 'producthunt';
export type KindType = 'reel' | 'short' | 'video' | 'post' | 'article' | 'listing';

export interface MentionItem {
  id: string;
  rank: number;
  creator: string;
  platform: PlatformType;
  url: string;
  kind: KindType;
  isFounder: boolean;
  isListing: boolean;
  embedUrl?: string;
  views?: string;
  likes?: string;
  quote?: string;
  thumbnail?: string;
}

export interface CreatorGroup {
  creator: string;
  items: MentionItem[];
  primaryItem: MentionItem;
  count: number;
}

export const WALL_OF_FAME_ITEMS: MentionItem[] = ${JSON.stringify(items, null, 2)};

// ─── Computed Selectors ───

// All verified 3rd-party creator mentions (excludes founder's own posts & platform listings)
export const THIRD_PARTY_ITEMS: MentionItem[] = WALL_OF_FAME_ITEMS.filter(
  item => !item.isFounder && !item.isListing
);

// Founder posts
export const FOUNDER_ITEMS: MentionItem[] = WALL_OF_FAME_ITEMS.filter(
  item => item.isFounder
);

// Unique third-party creators count
export const UNIQUE_CREATOR_COUNT: number = new Set(THIRD_PARTY_ITEMS.map(i => i.creator.toLowerCase())).size;

// Total third party posts count
export const TOTAL_CREATOR_POSTS: number = THIRD_PARTY_ITEMS.length;

// Counts by platform (third party only)
export const PLATFORM_COUNTS = {
  instagram: THIRD_PARTY_ITEMS.filter(i => i.platform === 'instagram').length,
  youtube: THIRD_PARTY_ITEMS.filter(i => i.platform === 'youtube').length,
  articles: THIRD_PARTY_ITEMS.filter(i => i.platform === 'devto' || i.platform === 'medium' || i.platform === 'blog').length,
  x: THIRD_PARTY_ITEMS.filter(i => i.platform === 'x').length,
  founder: FOUNDER_ITEMS.length
};

// Unique platform count for third party posts
export const UNIQUE_PLATFORM_COUNT: number = new Set(THIRD_PARTY_ITEMS.map(i => i.platform)).size;

// Grouped creators for directory list
export function getGroupedCreators(items: MentionItem[]): CreatorGroup[] {
  const groupsMap = new Map<string, MentionItem[]>();
  for (const item of items) {
    const list = groupsMap.get(item.creator) || [];
    list.push(item);
    groupsMap.set(item.creator, list);
  }

  const groups: CreatorGroup[] = [];
  groupsMap.forEach((groupItems, creator) => {
    groupItems.sort((a, b) => a.rank - b.rank);
    groups.push({
      creator,
      items: groupItems,
      primaryItem: groupItems[0],
      count: groupItems.length
    });
  });

  groups.sort((a, b) => a.primaryItem.rank - b.primaryItem.rank);
  return groups;
}
`;

  fs.writeFileSync(OUT_PATH, outCode, 'utf-8');
  console.log(`Wall of Fame built successfully! Total items: ${items.length}`);
  console.log(`Third-party posts: ${items.filter(i => !i.isFounder && !i.isListing).length}`);
  console.log(`Founder posts: ${items.filter(i => i.isFounder).length}`);
  console.log(`Listing items: ${items.filter(i => i.isListing).length}`);
}

run();
