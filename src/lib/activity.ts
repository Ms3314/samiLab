// Build-time activity data for the heatmaps. Fetched once per build; nothing runs in the browser.
// If a source is unreachable the section is simply hidden, so a flaky API never breaks a deploy.
import { fetchJson, once } from './fetch';
import { SITE } from '../data/site';

export interface Day { date: string; count: number }
export interface Activity { days: Day[]; total: number; activeDays: number; extra?: { label: string; value: string }[] }

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** The last 53 weeks, ending today, as ISO dates. */
function lastYear(): string[] {
  const out: string[] = [];
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364 - start.getUTCDay()); // start on a Sunday
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) out.push(iso(d));
  return out;
}

function fill(counts: Map<string, number>, extra?: Activity['extra']): Activity {
  const days = lastYear().map((date) => ({ date, count: counts.get(date) ?? 0 }));
  return {
    days,
    total: days.reduce((s, d) => s + d.count, 0),
    activeDays: days.filter((d) => d.count > 0).length,
    extra,
  };
}

export const getGitHubActivity = once(async (): Promise<Activity | null> => {
  type R = { contributions?: { date: string; count: number }[] };
  const data = await fetchJson<R>(`https://github-contributions-api.jogruber.de/v4/${SITE.githubUser}?y=last`);
  if (!data?.contributions?.length) return null;
  return fill(new Map(data.contributions.map((c) => [c.date, c.count])));
});

export const getLeetCodeActivity = once(async (): Promise<Activity | null> => {
  type G = {
    data?: { matchedUser?: {
      userCalendar?: { submissionCalendar?: string };
      submitStatsGlobal?: { acSubmissionNum?: { difficulty: string; count: number }[] };
    } };
  };
  const query = `query($u:String!){matchedUser(username:$u){userCalendar{submissionCalendar}submitStatsGlobal{acSubmissionNum{difficulty count}}}}`;
  let calendar: Record<string, number> | null = null;
  let solved: Record<string, number> = {};

  const g = await fetchJson<G>('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { u: SITE.leetcodeUser } }),
  });
  const user = g?.data?.matchedUser;
  if (user?.userCalendar?.submissionCalendar) {
    try { calendar = JSON.parse(user.userCalendar.submissionCalendar); } catch {}
    for (const s of user.submitStatsGlobal?.acSubmissionNum ?? []) solved[s.difficulty] = s.count;
  }

  // Fallback: the community API the old site used.
  if (!calendar) {
    type A = { submissionCalendar?: Record<string, number> | string; totalSolved?: number; easySolved?: number; mediumSolved?: number; hardSolved?: number };
    const a = await fetchJson<A>(`https://alfa-leetcode-api.onrender.com/${SITE.leetcodeUser}/profile`, {}, 15000);
    if (a?.submissionCalendar) {
      calendar = typeof a.submissionCalendar === 'string' ? JSON.parse(a.submissionCalendar) : a.submissionCalendar;
      solved = { All: a.totalSolved ?? 0, Easy: a.easySolved ?? 0, Medium: a.mediumSolved ?? 0, Hard: a.hardSolved ?? 0 };
    }
  }
  if (!calendar) return null;

  const counts = new Map<string, number>();
  for (const [ts, n] of Object.entries(calendar)) {
    const d = iso(new Date(Number(ts) * 1000));
    counts.set(d, (counts.get(d) ?? 0) + Number(n));
  }
  const extra = solved.All
    ? [
        { label: 'solved', value: String(solved.All) },
        { label: 'easy', value: String(solved.Easy ?? 0) },
        { label: 'medium', value: String(solved.Medium ?? 0) },
        { label: 'hard', value: String(solved.Hard ?? 0) },
      ]
    : undefined;
  return fill(counts, extra);
});
