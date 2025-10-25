import React, { useMemo } from 'react';
import Hero from './components/Hero';
import GoalForm from './components/GoalForm';
import TrackerBoard from './components/TrackerBoard';
import StatsPanel from './components/StatsPanel';
import useLocalStorage from './hooks/useLocalStorage';

function formatDate(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function App() {
  const [goals, setGoals] = useLocalStorage('impossible_goals', []);
  const [logs, setLogs] = useLocalStorage('habit_logs', {}); // { [date]: { [habitId]: true } }

  const today = formatDate();

  const addGoal = (goal) => {
    setGoals((prev) => [{ ...goal, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteGoal = (goalId) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    // Optional: clean logs entries for removed habits
  };

  const toggleHabitDone = (habitId, date) => {
    const key = date || today;
    setLogs((prev) => {
      const day = { ...(prev[key] || {}) };
      day[habitId] = !day[habitId];
      return { ...prev, [key]: day };
    });
  };

  const isHabitDone = (habitId, date) => {
    const key = date || today;
    return Boolean(logs?.[key]?.[habitId]);
  };

  const allHabits = useMemo(() => {
    return goals.flatMap((g) => g.habits.map((h) => ({ ...h, goalId: g.id, goalTitle: g.title })));
  }, [goals]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Hero />

      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <section className="grid lg:grid-cols-3 gap-6 -mt-24">
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur rounded-2xl border border-slate-800 p-6 shadow-xl shadow-blue-900/10">
            <GoalForm onAddGoal={addGoal} />
          </div>
          <div className="bg-slate-900/60 backdrop-blur rounded-2xl border border-slate-800 p-6 shadow-xl shadow-blue-900/10">
            <StatsPanel habits={allHabits} logs={logs} today={today} />
          </div>
        </section>

        <section className="mt-8 mb-16">
          <TrackerBoard
            goals={goals}
            today={today}
            deleteGoal={deleteGoal}
            toggleHabitDone={toggleHabitDone}
            isHabitDone={isHabitDone}
          />
        </section>
      </main>
    </div>
  );
}
