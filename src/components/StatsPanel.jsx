import React, { useMemo } from 'react';
import { Target, Flame, BarChart3 } from 'lucide-react';

function formatDate(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getStreak(habitId, logs) {
  let streak = 0;
  let day = formatDate();
  // count consecutive from today backwards
  while (logs?.[day]?.[habitId]) {
    streak += 1;
    const d = new Date(day);
    d.setDate(d.getDate() - 1);
    day = formatDate(d);
  }
  return streak;
}

export default function StatsPanel({ habits, logs, today }) {
  const { completedToday, totalToday } = useMemo(() => {
    const total = habits.length;
    const done = habits.filter((h) => Boolean(logs?.[today]?.[h.id])).length;
    return { completedToday: done, totalToday: total };
  }, [habits, logs, today]);

  const completion = totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100);

  const topStreaks = useMemo(() => {
    const list = habits
      .map((h) => ({ habitId: h.id, name: h.name, streak: getStreak(h.id, logs) }))
      .sort((a, b) => b.streak - a.streak)
      .slice(0, 3);
    return list;
  }, [habits, logs]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Progress Overview</h3>
        <p className="text-slate-400 text-sm">Daily completion and streak momentum across all habits.</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300"><Target className="w-4 h-4" /> Today</div>
            <div className="text-slate-200 font-medium">{completedToday}/{totalToday}</div>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-cyan-400" style={{ width: `${completion}%` }} />
          </div>
          <div className="mt-1 text-right text-xs text-slate-400">{completion}% complete</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <div className="flex items-center gap-2 text-slate-300 mb-2"><BarChart3 className="w-4 h-4" /> Top streaks</div>
          {topStreaks.length === 0 && <div className="text-slate-400 text-sm">No streaks yet. Start checking off habits.</div>}
          <div className="space-y-2">
            {topStreaks.map((s) => (
              <div key={s.habitId} className="flex items-center justify-between">
                <span className="text-slate-200">{s.name}</span>
                <span className="inline-flex items-center gap-1 text-amber-300"><Flame className="w-4 h-4" /> {s.streak}d</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
