import React, { useState, useEffect } from "react";
const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow p-4">{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Checkbox = ({ checked, onCheckedChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onCheckedChange}
  />
);

const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div
      className="bg-blue-500 h-3 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const data = [
  {
    phase: "Phase 1 (Month 1–3)",
    focus: "Python + Bash Foundations",
    tasks: [
      "Python basics",
      "Functions & modules",
      "File handling",
      "Linux commands",
      "Shell scripting"
    ]
  },
  {
    phase: "Phase 2 (Month 4–6)",
    focus: "Python APIs + JavaScript",
    tasks: [
      "OOP in Python",
      "FastAPI project",
      "JavaScript basics",
      "DOM manipulation",
      "CLI tool project"
    ]
  },
  {
    phase: "Phase 3 (Month 7–9)",
    focus: "TypeScript + Go",
    tasks: [
      "TypeScript",
      "Node.js APIs",
      "Go basics",
      "Concurrency",
      "Fullstack project"
    ]
  },
  {
    phase: "Phase 4 (Month 10–12)",
    focus: "Rust + Security",
    tasks: [
      "Rust basics",
      "Ownership",
      "Systems programming",
      "Security tools",
      "Capstone project"
    ]
  }
];

export default function App() {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak") || 0);
  });

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  const toggle = (key) => {
    setChecked((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      return updated;
    });
    setStreak((prev) => prev + 1);
  };

  const calcProgress = (tasks, phaseIndex) => {
    const total = tasks.length;
    const done = tasks.filter((_, i) => checked[`${phaseIndex}-${i}`]).length;
    return Math.round((done / total) * 100);
  };

  const overallProgress = () => {
    let total = 0;
    let done = 0;
    data.forEach((phase, i) => {
      phase.tasks.forEach((_, j) => {
        total++;
        if (checked[`${i}-${j}`]) done++;
      });
    });
    return Math.round((done / total) * 100);
  };

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">🚀 Elite Dev System 2026</h1>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold">📊 Overall Progress</h2>
          <Progress value={overallProgress()} />
          <p className="text-sm mt-2">{overallProgress()}% completed</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold">🔥 Daily Streak</h2>
          <p className="text-2xl">{streak} days</p>
        </CardContent>
      </Card>

      {data.map((phase, i) => (
        <Card key={i} className="rounded-2xl shadow-lg">
          <CardContent className="p-5">
            <h2 className="text-xl font-semibold">{phase.phase}</h2>
            <p className="text-gray-600 mb-2">{phase.focus}</p>

            <Progress value={calcProgress(phase.tasks, i)} className="mb-4" />

            <div className="grid gap-2">
              {phase.tasks.map((task, j) => {
                const key = `${i}-${j}`;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox
                      checked={checked[key] || false}
                      onCheckedChange={() => toggle(key)}
                    />
                    <span>{task}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold">🧪 Weekly Challenge</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>Build a Python automation script</li>
            <li>Create a Bash recon tool</li>
            <li>Develop a REST API</li>
            <li>Build a Go CLI tool</li>
            <li>Create a Rust security tool</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
