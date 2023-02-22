import { Rank, ranks } from '../ranks/ranks';
const stringSimilarity = require("string-similarity"),
  fs = require('fs');

// const result: Results = JSON.parse(fs.readFileSync('./example.json', 'utf8'))

const getRank = (text: string): Rank => {
  const words = text.split('\n').reverse();
  let RANK: Rank | undefined = undefined;
  let bestRank: BestRankInterface = {
    target: "Unknown",
    rating: 0
  };
  for (let word of words) {
    const clean = word.replace(/[^A-Za-z0-9 ]/g, '').trim();
    const matches = stringSimilarity.findBestMatch(clean, ranks);
    if (matches.bestMatch.rating > 0.77) {
      RANK = ranks[matches.bestMatchIndex];
      break;
    }
    else if (matches.bestMatch.rating > bestRank.rating) {
      bestRank = matches.bestMatch
    }
  }
  if (!RANK) {
    RANK = bestRank.rating > 0.59 ? bestRank.target : "Unknown"
  }

  return RANK;
}

const getStats = (detections: Word[]): Stats => {
  const cleanDetections = (index: number): number => {
    const clean = parseInt(detections[index + 2].description.replace(/[^0-9]/g, ''), 10) // cleans up stat number
    return !isNaN(clean) ? clean : 0
  }
  const statDetected = (stat: string, text: string): boolean => stringSimilarity.compareTwoStrings(stat, text) >= 0.5 // 0.5 may cause future pain...can change it to 0.9 or 1 for stricter checking
  // ↑ returns true if e.g. "matches:" is over 50% similar to an item

  const stats: Stats = {
    matches: 0,
    wins: 0,
    kills: 0,
    deaths: 0
  }

  for (let i = 0; i <= detections.length - 3; i++) {
    const text = detections[i].description.toLowerCase();
    const clean = cleanDetections(i);
    // console.log(`Text: ${text}`)
    // console.log(`Clean: ${clean}`)
    if (statDetected("matches:", text)) {
      // console.log('matches found')
      stats.matches = clean
    }
    else if (statDetected("wins:", text)) {
      // console.log('wins found')
      stats.wins = clean
    }
    else if (statDetected("kills:", text)) {
      // console.log('kills found')
      stats.kills = clean
    }
    else if (statDetected("deaths:", text)) {
      // console.log('deaths found')
      stats.deaths = clean
    }
  }
  return stats
}

export const getPlayerDetails = (result: Results): PlayerDetails => {
  const detections = result.textAnnotations;
  const STATS: PlayerDetails = {
    rank: "Unknown",
    matches: 0,
    wins: 0,
    kills: 0,
    deaths: 0
  };
  if (detections.length >= 8) { // to be on the safe side
    STATS.rank = getRank(detections[0].description);
    Object.assign(STATS, getStats(detections));    
  }
  return STATS;
}

// const STATS = getPlayerDetails(result)
// console.log(`Rank: ${STATS.rank}`)
// console.log(`Matches: ${STATS.matches}`)
// console.log(`Wins: ${STATS.wins}`)
// console.log(`Kills: ${STATS.kills}`)
// console.log(`Deaths: ${STATS.deaths}`)

module.exports = {
  getPlayerDetails
}

// Interfaces

interface BestRankInterface {
  target: Rank;
  rating: number;
}

interface Word {
  description: string;
}

export interface Results {
  textAnnotations: Word[];
  error?: any;
}

interface Stats {
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
}

export interface PlayerDetails extends Stats {
  rank: Rank;
}