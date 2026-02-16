// Window configuration registry
export interface WindowConfig {
  id: string;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
}

export const WINDOW_CONFIGS: Record<string, WindowConfig> = {
  about: {
    id: "about",
    title: "ABOUT - ANURAG TRIPATHI",
    icon: "about",
    defaultSize: { width: 700, height: 550 },
  },
  settings: {
    id: "settings",
    title: "SETTINGS - PREFERENCES",
    icon: "settings",
    defaultSize: { width: 350, height: 420 },
  },
  "my-computer": {
    id: "my-computer",
    title: "MY COMPUTER - PORTFOLIO",
    icon: "computer",
    defaultSize: { width: 650, height: 500 },
  },
  documents: {
    id: "documents",
    title: "DOCUMENTS",
    icon: "document",
    defaultSize: { width: 450, height: 350 },
  },
  music: {
    id: "music",
    title: "MUSIC PLAYER - RETRO JAMS",
    icon: "music",
    defaultSize: { width: 380, height: 420 },
  },
  guestbook: {
    id: "guestbook",
    title: "GUESTBOOK",
    icon: "guestbook",
    defaultSize: { width: 450, height: 400 },
  },
  paint: {
    id: "paint",
    title: "PAINT",
    icon: "paint",
    defaultSize: { width: 500, height: 400 },
  },
  welcome: {
    id: "welcome",
    title: "WELCOME",
    icon: "about",
    defaultSize: { width: 500, height: 600 },
  },
  snakegame: {
    id: "snakegame",
    title: "SNACK GAME - RETRO ARCADE",
    icon: "game",
    defaultSize: { width: 400, height: 530 },
  },
  help: {
    id: "help",
    title: "ANURAG HELP",
    icon: "about",
    defaultSize: { width: 550, height: 600 },
  },
  assistant: {
    id: "assistant",
    title: "ANURAG OS ASSISTANT",
    icon: "about",
    defaultSize: { width: 500, height: 450 },
  },
  demo: {
    id: "demo",
    title: "AI PRODUCT INSIGHT ANALYZER",
    icon: "computer",
    defaultSize: { width: 800, height: 600 },
  },
  browser: {
    id: "browser",
    title: "INTERNET EXPLORER",
    icon: "internet",
    defaultSize: { width: 800, height: 600 },
  },
};

import { DesktopIconData } from "../types";

// Desktop icons configuration - reorganized for portfolio
export const DESKTOP_ICONS: DesktopIconData[] = [
  // Top Row - Main Navigation
  {
    id: "my-computer",
    label: "MY COMPUTER",
    icon: "computer",
    windowId: "my-computer",
    position: { row: 0, col: 0 },
  },
  {
    id: "about",
    label: "ABOUT ME",
    icon: "about",
    windowId: "about",
    position: { row: 0, col: 1 },
  },
  {
    id: "resume",
    label: "RESUME.PDF",
    icon: "pdf",
    externalUrl: "/Anurag Tripatrhi_Tech Product Manager.pdf",
    position: { row: 0, col: 2 },
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    icon: "linkedin",
    externalUrl: "https://www.linkedin.com/in/anuragtripathi-pm/",
    position: { row: 0, col: 3 },
  },

  // Second Row - Tools & Featured
  {
    id: "settings",
    label: "SETTINGS",
    icon: "settings",
    windowId: "settings",
    position: { row: 1, col: 0 },
  },
  {
    id: "guestbook",
    label: "GUESTBOOK",
    icon: "guestbook",
    windowId: "guestbook",
    position: { row: 1, col: 1 },
  },
  {
    id: "paint",
    label: "PAINT",
    icon: "paint",
    windowId: "paint",
    position: { row: 1, col: 2 },
  },

  // Third Row - Apps
  {
    id: "music",
    label: "MUSIC",
    icon: "music",
    windowId: "music",
    position: { row: 2, col: 0 },
  },
  {
    id: "kickflip",
    label: "SNACK GAME",
    icon: "game",
    windowId: "snakegame",
    position: { row: 2, col: 1 },
  },
  {
    id: "demo",
    label: "AI DEMOS",
    icon: "computer",
    windowId: "demo",
    position: { row: 2, col: 2 },
  },
  {
    id: "browser",
    label: "INTERNET",
    icon: "internet",
    windowId: "browser",
    position: { row: 2, col: 3 },
  },

  // Bottom
  { id: "trash", label: "TRASH", icon: "trash", position: { row: 3, col: 0 } },
];

// Taskbar icons
export const TASKBAR_ICONS = [
  { id: "about", icon: "about", windowId: "about" },
  { id: "my-computer", icon: "computer", windowId: "my-computer" },
  { id: "settings", icon: "settings", windowId: "settings" },
  { id: "guestbook", icon: "guestbook", windowId: "guestbook" },
  { id: "paint", icon: "paint", windowId: "paint" },
  { id: "snakegame", icon: "game", windowId: "snakegame" },
];

// Menu items
export const MENU_ITEMS = [
  { label: "FILE" },
  { label: "EDIT" },
  { label: "VIEW" },
  { label: "WINDOW" },
  { label: "HELP" },
];
