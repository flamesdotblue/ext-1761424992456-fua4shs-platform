import React, { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';

const defaultHabit = () => ({ id: crypto.randomUUID(), name: '', cadence: 'daily' });

export default function GoalForm({ onAddGoal }) {
  const [title, setTitle] = useState('');
  const [why, setWhy] = useState('');
  const [horizon, setHorizon] = useState('90 days');
  const [systems, setSystems] = useState('');
  const [habits, setHabits] = useState([defaultHabit()]);

  const addHabitField = () => setHabits((h) => [...h, defaultHabit()]);
  const updateHabit = (id, patch) => setHabits((h) => h.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const removeHabit = (id) => setHabits((h) => (h.length > 1 ? h.filter((x) => x.id !== id) : h));

  const canSubmit = title.trim() && habits.every((h) => h.name.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onAddGoal({ title: title.trim(), why: why.trim(), horizon, systems: systems.trim(), habits });
    // reset
    setTitle('');
    setWhy('');
    setSystems('');
    setHorizon('90 days');
    setHabits([defaultHabit()]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Create an Impossible Goal</h2>
        <p className="text-slate-400 text-sm">Translate an audacious target into identity-aligned habits and robust systems.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Goal Title</label>
          <input
            className="w-full rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            placeholder="e.g., Launch a profitable app"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Time Horizon</label>
          <select
            className="w-full rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
          >
            <option>30 days</option>
            <option>90 days</option>
            <option>6 months</option>
            <option>1 year</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300">Why this matters</label>
        <textarea
          className="w-full min-h-[72px] rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          placeholder="Identity-level reason that makes the pursuit non-negotiable"
          value={why}
          onChange={(e) => setWhy(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300">Systems and constraints</label>
        <textarea
          className="w-full min-h-[72px] rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          placeholder="Environment design, checklists, if-then plans, accountability, time blocks, constraints"
          value={systems}
          onChange={(e) => setSystems(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-300">Keystone Habits</label>
          <button type="button" onClick={addHabitField} className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200">
            <Plus className="w-4 h-4" /> Add habit
          </button>
        </div>
        <div className="space-y-3">
          {habits.map((h, idx) => (
            <div key={h.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
              <input
                className="md:col-span-2 w-full rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                placeholder={idx === 0 ? 'e.g., 45m deep work' : 'Habit name'}
                value={h.name}
                onChange={(e) => updateHabit(h.id, { name: e.target.value })}
              />
              <select
                className="w-full rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                value={h.cadence}
                onChange={(e) => updateHabit(h.id, { cadence: e.target.value })}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
              <button
                type="button"
                onClick={() => removeHabit(h.id)}
                className="w-full md:w-auto rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-slate-300 hover:bg-slate-900"
                disabled={habits.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 text-slate-950 font-medium px-4 py-2 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-4 h-4" />
          Add Goal
        </button>
      </div>
    </form>
  );
}
