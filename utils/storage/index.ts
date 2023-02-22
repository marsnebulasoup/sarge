import Conf from 'conf';
import { PlayerDetails } from './../stat-helper/formatter/index';

const verifySetup = () => {
  const config = new Conf({ cwd: __dirname });
  config.has('playerinfo') || config.set('playerinfo', [])
}

export const addDetails = (stats: Stats) => {
  verifySetup();
  const config = new Conf({ cwd: __dirname });
  const existing: Stats[] = config.get('playerinfo') as Stats[];
  for (let i = 0; i < existing.length; i++) {
    if (existing[i].user.username === stats.user.username) {
      existing[i] = stats
      // console.log(existing[i])
      config.set('playerinfo', existing);
      return
    }
  }
  existing.push(stats);
  config.set('playerinfo', existing);
}

export const getDetails = (user: string) => {
  verifySetup();
  const config = new Conf({ cwd: __dirname });
  const existing: Stats[] = config.get('playerinfo') as Stats[];
  for (let stat of existing) {
    if (stat.user.username === user) return stat;
  }
  return false
}

interface User {
  username: string;
}

interface Stats {
  user: User;
  screenshot_url: string;
  details: PlayerDetails
}
