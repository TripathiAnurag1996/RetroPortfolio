// Generated automatically from data/promptive-sentry-ALL-links-influencer-ranked.csv
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

export const WALL_OF_FAME_ITEMS: MentionItem[] = [
  {
    "id": "ig-DZfI11SNIHW-1",
    "rank": 1,
    "creator": "100XEngineers",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DZfI11SNIHW/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DZfI11SNIHW/embed/captioned/"
  },
  {
    "id": "ig-DZfbS8Stx7o-2",
    "rank": 2,
    "creator": "100XEngineers",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DZfbS8Stx7o/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DZfbS8Stx7o/embed/captioned/"
  },
  {
    "id": "ig-DaiXBAPyk4g-3",
    "rank": 3,
    "creator": "Nick Saraev",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DaiXBAPyk4g/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DaiXBAPyk4g/embed/captioned/"
  },
  {
    "id": "ig-DaXYAonD8ky-4",
    "rank": 4,
    "creator": "Seb Intel",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DaXYAonD8ky/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DaXYAonD8ky/embed/captioned/"
  },
  {
    "id": "yt-short-mtr2ad2ps-0-5",
    "rank": 5,
    "creator": "Nick Automates",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/mtr2ad2ps-0",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/mtr2ad2ps-0?autoplay=1&rel=0"
  },
  {
    "id": "ig-DZ-Ax4StIQY-6",
    "rank": 6,
    "creator": "Vaibhav Sisinty — Decoding AI",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DZ-Ax4StIQY/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DZ-Ax4StIQY/embed/captioned/"
  },
  {
    "id": "ig-DcXgw9MMkAE-7",
    "rank": 7,
    "creator": "Abhiraj Chandrawanshi",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcXgw9MMkAE/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcXgw9MMkAE/embed/captioned/"
  },
  {
    "id": "ig-DasdD-syZQM-8",
    "rank": 8,
    "creator": "Ankit Arora — AI With Ankit",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DasdD-syZQM/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DasdD-syZQM/embed/captioned/"
  },
  {
    "id": "ig-DZ2384Wzs4C-9",
    "rank": 9,
    "creator": "Sohail Khan — KhanLabs",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DZ2384Wzs4C/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DZ2384Wzs4C/embed/captioned/"
  },
  {
    "id": "yt-short-kOtp-qonRmE-10",
    "rank": 10,
    "creator": "Shreyansh Singh — Digital Heroes",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/kOtp-qonRmE",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/kOtp-qonRmE?autoplay=1&rel=0"
  },
  {
    "id": "ig-DbGeCU5F6Gc-11",
    "rank": 11,
    "creator": "Shreyansh Singh — Digital Heroes",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DbGeCU5F6Gc/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DbGeCU5F6Gc/embed/captioned/"
  },
  {
    "id": "ig-DaK0o1Bk870-12",
    "rank": 12,
    "creator": "S Ferro AI",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DaK0o1Bk870/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DaK0o1Bk870/embed/captioned/"
  },
  {
    "id": "ig-DcLp9KSIDhg-13",
    "rank": 13,
    "creator": "aaghaz_ai",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcLp9KSIDhg/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcLp9KSIDhg/embed/captioned/"
  },
  {
    "id": "ig-Db5X0FvBBon-14",
    "rank": 14,
    "creator": "meghana.ai",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Db5X0FvBBon/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Db5X0FvBBon/embed/captioned/"
  },
  {
    "id": "ig-DZplqatJX0A-15",
    "rank": 15,
    "creator": "adityaa.daily",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DZplqatJX0A/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DZplqatJX0A/embed/captioned/"
  },
  {
    "id": "ig-DalAfTPkb8z-16",
    "rank": 16,
    "creator": "sophiene.ia",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DalAfTPkb8z/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DalAfTPkb8z/embed/captioned/"
  },
  {
    "id": "yt-short-URkV7eiC974-17",
    "rank": 17,
    "creator": "Build Fast With AI",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/URkV7eiC974",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/URkV7eiC974?autoplay=1&rel=0"
  },
  {
    "id": "ig-DamqVK5tJeH-18",
    "rank": 18,
    "creator": "Build Fast With AI",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DamqVK5tJeH/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DamqVK5tJeH/embed/captioned/"
  },
  {
    "id": "ig-DZm8qZgptUb-19",
    "rank": 19,
    "creator": "mr.bobbyig",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DZm8qZgptUb/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DZm8qZgptUb/embed/captioned/"
  },
  {
    "id": "ig-DZmPF1cpGw_-20",
    "rank": 20,
    "creator": "mr.bobbyig",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DZmPF1cpGw_/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DZmPF1cpGw_/embed/captioned/"
  },
  {
    "id": "ig-Da23mtnTmvW-21",
    "rank": 21,
    "creator": "woke_engineer",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Da23mtnTmvW/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Da23mtnTmvW/embed/captioned/"
  },
  {
    "id": "ig-Dao4RCyzMFK-22",
    "rank": 22,
    "creator": "kayadigital.ai",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Dao4RCyzMFK/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Dao4RCyzMFK/embed/captioned/"
  },
  {
    "id": "ig-DbQm_KthPwu-23",
    "rank": 23,
    "creator": "mike.mozg",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DbQm_KthPwu/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DbQm_KthPwu/embed/captioned/"
  },
  {
    "id": "ig-DalN_a6oMgc-24",
    "rank": 24,
    "creator": "mbarki_amidou",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DalN_a6oMgc/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DalN_a6oMgc/embed/captioned/"
  },
  {
    "id": "ig-Dbx8qnSI0Bf-25",
    "rank": 25,
    "creator": "itsorionray",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Dbx8qnSI0Bf/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Dbx8qnSI0Bf/embed/captioned/"
  },
  {
    "id": "yt-short-ebG7nJEr8LU-26",
    "rank": 26,
    "creator": "Aman_Vashisth",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/ebG7nJEr8LU",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/ebG7nJEr8LU?autoplay=1&rel=0"
  },
  {
    "id": "yt-short-Vc2l4Gj4NJs-27",
    "rank": 27,
    "creator": "Renato Dinis — Build With AI",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/Vc2l4Gj4NJs",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/Vc2l4Gj4NJs?autoplay=1&rel=0"
  },
  {
    "id": "ig-DcWlkUvlK_u-28",
    "rank": 28,
    "creator": "Renato Dinis — Build With AI",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcWlkUvlK_u/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcWlkUvlK_u/embed/captioned/"
  },
  {
    "id": "ig-DcQvn9rHTI0-29",
    "rank": 29,
    "creator": "Renato Dinis — Build With AI",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcQvn9rHTI0/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcQvn9rHTI0/embed/captioned/"
  },
  {
    "id": "ig-Db8Tulak5Fr-30",
    "rank": 30,
    "creator": "Renato Dinis — Build With AI",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Db8Tulak5Fr/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Db8Tulak5Fr/embed/captioned/"
  },
  {
    "id": "ig-DcOPE1xD3aT-31",
    "rank": 31,
    "creator": "Renato Dinis — Build With AI",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcOPE1xD3aT/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcOPE1xD3aT/embed/captioned/"
  },
  {
    "id": "ig-DcsZd13sud_-32",
    "rank": 32,
    "creator": "ihammamx",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcsZd13sud_/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcsZd13sud_/embed/captioned/"
  },
  {
    "id": "ig-DaFuK5zDq3w-33",
    "rank": 33,
    "creator": "arindam.1729",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DaFuK5zDq3w/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DaFuK5zDq3w/embed/captioned/"
  },
  {
    "id": "ig-Da3B8X7MqrN-34",
    "rank": 34,
    "creator": "shishko.ai",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Da3B8X7MqrN/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Da3B8X7MqrN/embed/captioned/"
  },
  {
    "id": "ig-DaqROFINze9-35",
    "rank": 35,
    "creator": "Gaurav Singh Bisen — The PMF Guy",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DaqROFINze9/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DaqROFINze9/embed/captioned/"
  },
  {
    "id": "blog-7i80pe-36",
    "rank": 36,
    "creator": "Gaurav Singh Bisen — The PMF Guy",
    "platform": "blog",
    "url": "https://gauravbisen.com/blog/carry-context-across-ai-models/",
    "kind": "article",
    "isFounder": false,
    "isListing": false
  },
  {
    "id": "ig-Dd_r8k1oGOu-37",
    "rank": 37,
    "creator": "Muhammad Abdullah — Ranahaani",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Dd_r8k1oGOu/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Dd_r8k1oGOu/embed/captioned/"
  },
  {
    "id": "medium-hit-your-claude-limi-38",
    "rank": 38,
    "creator": "Muhammad Abdullah — Ranahaani",
    "platform": "medium",
    "url": "https://ranahaani.medium.com/hit-your-claude-limit-move-the-chat-to-chatgpt-with-promptly-sentry-305a8ade966a",
    "kind": "article",
    "isFounder": false,
    "isListing": false
  },
  {
    "id": "ig-DdwDFQ7MlEF-39",
    "rank": 39,
    "creator": "alekseimediaru",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DdwDFQ7MlEF/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DdwDFQ7MlEF/embed/captioned/"
  },
  {
    "id": "ig-DcGkgfBB3jB-40",
    "rank": 40,
    "creator": "reveal.tech",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcGkgfBB3jB/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcGkgfBB3jB/embed/captioned/"
  },
  {
    "id": "ig-DdL_M6US191-41",
    "rank": 41,
    "creator": "100xhumans",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DdL_M6US191/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DdL_M6US191/embed/captioned/"
  },
  {
    "id": "yt-short-wnmH_ImC3GQ-42",
    "rank": 42,
    "creator": "Maniprajwal Tamminedi — TechyVest",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/wnmH_ImC3GQ",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/wnmH_ImC3GQ?autoplay=1&rel=0"
  },
  {
    "id": "ig-Daiizk5M25u-43",
    "rank": 43,
    "creator": "Maniprajwal Tamminedi — TechyVest",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Daiizk5M25u/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Daiizk5M25u/embed/captioned/"
  },
  {
    "id": "yt-video-FfAk6mcy2BM-44",
    "rank": 44,
    "creator": "Null Technology",
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=FfAk6mcy2BM",
    "kind": "video",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/FfAk6mcy2BM?autoplay=1&rel=0"
  },
  {
    "id": "yt-short-nIyOxKPbDm4-45",
    "rank": 45,
    "creator": "galtechlearninghub",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/nIyOxKPbDm4",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/nIyOxKPbDm4?autoplay=1&rel=0"
  },
  {
    "id": "yt-video-HqNRLYDm87k-46",
    "rank": 46,
    "creator": "Ehtraf Al Bramj (Mohammed Tawfiq)",
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=HqNRLYDm87k",
    "kind": "video",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/HqNRLYDm87k?autoplay=1&rel=0"
  },
  {
    "id": "ig-Da9kEEPkeVa-47",
    "rank": 47,
    "creator": "ikramranaa",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Da9kEEPkeVa/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Da9kEEPkeVa/embed/captioned/"
  },
  {
    "id": "yt-video-WqYoGfbYb7Q-48",
    "rank": 48,
    "creator": "Maitis",
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=WqYoGfbYb7Q",
    "kind": "video",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/WqYoGfbYb7Q?autoplay=1&rel=0"
  },
  {
    "id": "ig-Deia83rJMM7-49",
    "rank": 49,
    "creator": "moncy_jo",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/Deia83rJMM7/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/Deia83rJMM7/embed/captioned/"
  },
  {
    "id": "yt-video-nOE6frSysEI-50",
    "rank": 50,
    "creator": "Ali Ahmed's AI Lab",
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=nOE6frSysEI",
    "kind": "video",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/nOE6frSysEI?autoplay=1&rel=0"
  },
  {
    "id": "yt-video-YlbxENE_iWg-51",
    "rank": 51,
    "creator": "Ali Ahmed's AI Lab",
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=YlbxENE_iWg",
    "kind": "video",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/YlbxENE_iWg?autoplay=1&rel=0"
  },
  {
    "id": "yt-video-0UAapL8cxiM-52",
    "rank": 52,
    "creator": "Anurag Tripathi (FOUNDER — own posts)",
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=0UAapL8cxiM",
    "kind": "video",
    "isFounder": true,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/0UAapL8cxiM?autoplay=1&rel=0"
  },
  {
    "id": "x-2046499751655510273-53",
    "rank": 53,
    "creator": "Anurag Tripathi (FOUNDER — own posts)",
    "platform": "x",
    "url": "https://x.com/anuragships/status/2046499751655510273",
    "kind": "post",
    "isFounder": true,
    "isListing": false
  },
  {
    "id": "x-profile-54",
    "rank": 54,
    "creator": "Anurag Tripathi (FOUNDER — own posts)",
    "platform": "x",
    "url": "https://x.com/anuragships",
    "kind": "post",
    "isFounder": true,
    "isListing": false
  },
  {
    "id": "x-2084191620493455710-55",
    "rank": 55,
    "creator": "Anurag Tripathi (FOUNDER — own posts)",
    "platform": "x",
    "url": "https://x.com/anuragships/status/2084191620493455710",
    "kind": "post",
    "isFounder": true,
    "isListing": false
  },
  {
    "id": "x-2083454905571070417-56",
    "rank": 56,
    "creator": "Anurag Tripathi (FOUNDER — own posts)",
    "platform": "x",
    "url": "https://x.com/anuragships/status/2083454905571070417",
    "kind": "post",
    "isFounder": true,
    "isListing": false
  },
  {
    "id": "devto-i-was-wasting-10-min-57",
    "rank": 57,
    "creator": "Anurag Tripathi (FOUNDER — own posts)",
    "platform": "devto",
    "url": "https://dev.to/anurag_aipm/i-was-wasting-10-minutes-every-claude-session-so-i-built-a-fix-5ah6",
    "kind": "article",
    "isFounder": true,
    "isListing": false
  },
  {
    "id": "yt-short-L6kybnWHiCM-58",
    "rank": 58,
    "creator": "kalkiii_ai",
    "platform": "youtube",
    "url": "https://www.youtube.com/shorts/L6kybnWHiCM",
    "kind": "short",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.youtube-nocookie.com/embed/L6kybnWHiCM?autoplay=1&rel=0"
  },
  {
    "id": "ig-DcO_qJPlBP7-59",
    "rank": 59,
    "creator": "russellnicholls_",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcO_qJPlBP7/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcO_qJPlBP7/embed/captioned/"
  },
  {
    "id": "ig-DbyNGapNUyW-60",
    "rank": 60,
    "creator": "ai_technologist07",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DbyNGapNUyW/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DbyNGapNUyW/embed/captioned/"
  },
  {
    "id": "ig-DcbCOhPPRvl-61",
    "rank": 61,
    "creator": "__qibs_",
    "platform": "instagram",
    "url": "https://www.instagram.com/reel/DcbCOhPPRvl/",
    "kind": "reel",
    "isFounder": false,
    "isListing": false,
    "embedUrl": "https://www.instagram.com/reel/DcbCOhPPRvl/embed/captioned/"
  },
  {
    "id": "producthunt-listing-62",
    "rank": 62,
    "creator": "Product Hunt (platform listing)",
    "platform": "producthunt",
    "url": "https://t.co/7ZiLSFdBei",
    "kind": "listing",
    "isFounder": false,
    "isListing": true
  },
  {
    "id": "devto-y-friend-has-five-ch-63",
    "rank": 63,
    "creator": "krish007code (Dev.to)",
    "platform": "devto",
    "url": "https://dev.to/krish007code/y-friend-has-five-chatgpt-accounts-and-zero-shared-memory-so-i-built-localclip-1jhn",
    "kind": "article",
    "isFounder": false,
    "isListing": false
  }
];

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
