# Wall of Fame Data Guide

The Wall of Fame highlights 63 verified creator mentions, media articles, and videos for **Promptive Sentry**.

## How to Add a New Link:
1. Open `data/promptive-sentry-ALL-links-influencer-ranked.csv`.
2. Add a new row with:
   ```csv
   <Rank>,<Creator Name>,<URL>,,,,
   ```
   *Note: If the post is by the founder, include `Anurag Tripathi (FOUNDER — own posts)` in the creator column. If it is a platform directory listing (like Product Hunt), specify `(platform listing)`.*
3. Run:
   ```bash
   npm run build:fame
   ```
   This automatically synchronizes and compiles typed data and computed counts into `src/data/wallOfFame.ts`.

## Structure:
- `data/promptive-sentry-ALL-links-influencer-ranked.csv`: Canonical source of truth.
- `scripts/buildWallOfFame.js`: Automated parser and type-safe generator.
- `src/data/wallOfFame.ts`: Generated TypeScript exports (items, grouped creators, selectors).
