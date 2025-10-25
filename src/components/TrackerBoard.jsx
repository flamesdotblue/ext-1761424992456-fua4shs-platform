import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Trash2, CalendarDays } from 'lucide-react';

function formatDate(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function subDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - n);
  return formatDate(d);
}

export default function TrackerBoard({ goals, today, deleteGoal, toggleHabitDone, isHabitDone }) {
  const [expanded, setExpanded] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);

  const toggleExpand = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const days = Array.from({ length: 7 }).map((_, i) => subDays(selectedDate, 6 - i));

  return (
    <div className="bg-slate-900/60 backdrop-blur rounded-2xl border border-slate-800 p-6 shadow-xl shadow-blue-900/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Routines & Daily Tracking</h3>
          <p className="text-slate-400 text-sm">Mark habits complete for the selected date and visualize your week.</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-slate-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {goals.length === 0 && (
          <div className="text-slate-400 text-sm">No goals yet. Create one above to begin.</div>
        )}
        {goals.map((g) => (
          <div key={g.id} className="rounded-xl border border-slate-800 bg-slate-950/40">
            <div className="flex items-center justify-between p-4">
              <button onClick={() => toggleExpand(g.id)} className="inline-flex items-center gap-2 text-left">
                {expanded[g.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <div>
                  <div className="text-white font-medium">{g.title}</div>
                  <div className="text-xs text-slate-400">{g.horizon} • {g.why || '—'}</div>
                </div>
              </button>
              <button
                onClick={() => deleteGoal(g.id)}
                className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-200"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>

            {expanded[g.id] && (
              <div className="px-4 pb-4">
                <div className="text-sm text-slate-300 mb-3">
                  <span className="text-slate-400">Systems:</span> {g.systems || '—'}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-slate-400">
                        <th className="text-left p-2">Habit</th>
                        {days.map((d) => (
                          <th key={d} className="text-center p-2 font-normal">
                            <div className="text-xs">{d.slice(5)}</div>
                          </th>
                        ))}
                        <th className="text-center p-2">Selected</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.habits.map((h) => (
                        <tr key={h.id} className="border-t border-slate-800/80">
                          <td className="p-2">
                            <div className="font-medium text-slate-100">{h.name}</div>
                            <div className="text-xs text-slate-400">{h.cadence}</div>
                          </td>
                          {days.map((d) => (
                            <td key={d} className="p-2 text-center">
                              <span
                                className={
                                  (isHabitDone(h.id, d)
                                    ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
                                    : 'bg-slate-800/60 text-slate-400 border-slate-700') +
                                  ' inline-flex items-center justify-center w-7 h-7 rounded-md border'
                                }
                              >
                                {isHabitDone(h.id, d) ? '✓' : ''}
                              </span>
                            </td>
                          ))}
                          <td className="p-2 text-center">
                            <button
                              onClick={() => toggleHabitDone(h.id, selectedDate)}
                              className={
                                (isHabitDone(h.id, selectedDate)
                                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700') +
                                ' inline-flex items-center gap-2 px-3 py-1.5 rounded-md'
                              }
                            >
                              <CheckCircle2 className="w-4 h-4" /> {isHabitDone(h.id, selectedDate) ? 'Done' : 'Mark done'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
