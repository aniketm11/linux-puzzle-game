import { useEffect, useState } from "react";

import PuzzlePanel from "../components/PuzzlePanel";
import Terminal from "../components/Terminal";
import ResultScreen from "../components/ResultScreen";

const API_URL = import.meta.env.VITE_API_URL;

type GameProps = {
  category: string;
  onCategories: () => void;
};

type Puzzle = {
  title: string;
  description: string;
  hint: string;
  accepted_commands: string[];
  explanation: string;
};

const categoryNames: Record<string, string> = {
  files: "File Management",
  permissions: "Permissions",
  processes: "Processes",
  networking: "Networking",
  users: "Users & Groups",
  shell: "Shell Scripting",
};

function getDifficulty(level: number) {
  if (level <= 3) {
    return "easy";
  }

  if (level <= 6) {
    return "medium";
  }

  if (level <= 9) {
    return "hard";
  }

  return "expert";
}

function getDifficultyLabel(level: number) {
  if (level <= 3) {
    return "Easy";
  }

  if (level <= 6) {
    return "Medium";
  }

  if (level <= 9) {
    return "Hard";
  }

  return "Expert";
}

function getDifficultyColor(level: number) {
  if (level <= 3) {
    return "easy";
  }

  if (level <= 6) {
    return "medium";
  }

  if (level <= 9) {
    return "hard";
  }

  return "expert";
}

function Game({
  category,
  onCategories,
}: GameProps) {

  const [puzzle, setPuzzle] =
    useState<Puzzle | null>(null);

  const [output, setOutput] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showHint, setShowHint] =
    useState(false);

  const [solved, setSolved] =
    useState(false);

  const [level, setLevel] =
    useState(1);

  const [commandCount, setCommandCount] =
    useState(0);

  const [error, setError] =
    useState("");

  const difficulty =
    getDifficulty(level);

  const difficultyLabel =
    getDifficultyLabel(level);

  const generatePuzzle = async (
    currentLevel = level
  ) => {

    const currentDifficulty =
      getDifficulty(currentLevel);

    setLoading(true);
    setSolved(false);
    setShowHint(false);
    setCommandCount(0);
    setError("");

    setOutput([
      "Connecting to Linux Quest...",
      "",
      `Category: ${categoryNames[category]}`,
      `Level: ${currentLevel}`,
      `Difficulty: ${currentDifficulty}`,
      "",
      "AI is creating your challenge...",
    ]);

    try {

      const response = await fetch(
        `${API_URL}/api/generate-puzzle`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            category: category,
            difficulty: currentDifficulty,
            level: currentLevel,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to generate puzzle"
        );
      }

      const data = await response.json();

      setPuzzle(data);

      setOutput([
        "Linux Quest Terminal v1.0",
        "",
        `Category: ${categoryNames[category]}`,
        `Level ${currentLevel} • ${currentDifficulty}`,
        "",
        "Challenge loaded successfully.",
        "",
        "Type a Linux command to begin.",
      ]);

    } catch (err) {

      console.error(err);

      setError(
        "Could not connect to the AI game server."
      );

      setOutput([
        "Connection failed.",
        "",
        "Make sure Flask is running on",
        "http://127.0.0.1:5000",
      ]);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    setLevel(1);

    generatePuzzle(1);

  }, [category]);

  const handleCommand = async (
    command: string
  ) => {

    if (!puzzle) {
      return;
    }

    setCommandCount(
      previous => previous + 1
    );

    if (command.trim() === "clear") {

      setOutput([]);

      return;
    }

    setOutput(previous => [
      ...previous,
      `player@linux:~$ ${command}`,
    ]);

    try {

      const response = await fetch(
        `${API_URL}/api/check`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            command: command,

            accepted_commands:
              puzzle.accepted_commands,
          }),
        }
      );

      const data =
        await response.json();

      if (data.output) {

        setOutput(previous => [
          ...previous,
          data.output,
        ]);
      }

      if (data.correct) {

        setSolved(true);

        setOutput(previous => [
          ...previous,
          "",
          "✓ Correct!",
          "",
          `+50 XP`,
          "",
          "Preparing your next AI challenge...",
        ]);

        /*
         * Wait briefly so the user can see
         * the successful result.
         */
        setTimeout(() => {

          const nextLevel =
            level + 1;

          setLevel(nextLevel);

          generatePuzzle(nextLevel);

        }, 1800);

      } else {

        setOutput(previous => [
          ...previous,
          "",
          "↳ Not quite. Try another command.",
        ]);
      }

    } catch (err) {

      console.error(err);

      setOutput(previous => [
        ...previous,
        "",
        "Connection error.",
      ]);
    }
  };

  if (loading) {

    return (
      <main className="loading-screen">

        <div className="loading-card">

          <div className="loading-logo">
            &gt;_
          </div>

          <div className="eyebrow">
            <span className="status-dot" />
            AI LINUX QUEST
          </div>

          <h2>
            Creating your challenge
          </h2>

          <p>
            AI is generating a{" "}
            {difficultyLabel.toLowerCase()}{" "}
            {categoryNames[category]} puzzle...
          </p>

          <div className="loading-level">

            <span>
              Level {level}
            </span>

            <span
              className={`difficulty-badge ${getDifficultyColor(
                level
              )}`}
            >
              {difficultyLabel}
            </span>

          </div>

          <div className="loading-bar">
            <span />
          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="game">

      <header className="game-header">

        <div className="brand small">

          <div className="brand-icon">
            &gt;_
          </div>

          <div>
            <strong>LINUX</strong>
            <span>QUEST</span>
          </div>

        </div>

        <div className="game-progress">

          <span>
            Level {level}
          </span>

          <div className="progress-track">

            <div
              style={{
                width:
                  `${Math.min(
                    ((level - 1) % 10) * 10 + 10,
                    100
                  )}%`,
              }}
            />

          </div>

          <span>
            {level <= 3
              ? "Easy"
              : level <= 6
              ? "Medium"
              : level <= 9
              ? "Hard"
              : "Expert"}
          </span>

        </div>

        <div className="game-stats">

          <div>
            🔥
            <span>
              <small>Streak</small>
              {level - 1}
            </span>
          </div>

          <div>
            ⭐
            <span>
              <small>XP</small>
              {(level - 1) * 50}
            </span>
          </div>

          <button>
            ?
          </button>

        </div>

      </header>

      <div className="game-body">

        <aside className="sidebar">

          <button
            className="side-home"
            onClick={onCategories}
          >
            ← Categories
          </button>

          <div className="sidebar-section">

            <small>YOUR PROGRESS</small>

            <button className="side-active">
              🎯 Level {level}
            </button>

            <button>
              🏆 Achievements
            </button>

            <button>
              📊 Progress
            </button>

          </div>

          <div className="sidebar-section">

            <small>CURRENT CATEGORY</small>

            <button className="side-active">
              📁 {categoryNames[category]}
            </button>

          </div>

          <div className="difficulty-card">

            <small>CURRENT DIFFICULTY</small>

            <div className="difficulty-number">
              {level}
            </div>

            <div
              className={`difficulty-badge ${getDifficultyColor(
                level
              )}`}
            >
              {difficultyLabel}
            </div>

            <div className="difficulty-steps">

              <span className={level >= 1 ? "active" : ""} />
              <span className={level >= 4 ? "active" : ""} />
              <span className={level >= 7 ? "active" : ""} />
              <span className={level >= 10 ? "active" : ""} />

            </div>

            <p>
              AI automatically increases
              the challenge as you progress.
            </p>

          </div>

          <div className="pro-tip">

            <span>💡</span>

            <strong>
              Pro Tip
            </strong>

            <p>
              Solve challenges without
              using hints to improve your
              Linux skills faster.
            </p>

          </div>

        </aside>

        <section className="game-content">

          <div className="breadcrumbs">

            <button
              onClick={onCategories}
            >
              Categories
            </button>

            <span>/</span>

            <strong>
              {categoryNames[category]}
            </strong>

            <span>/</span>

            <strong>
              Level {level}
            </strong>

          </div>

          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          {puzzle && (

            <>

              <div className="level-banner">

                <div>

                  <span className="level-icon">
                    ✨
                  </span>

                  <div>

                    <strong>
                      AI Challenge #{level}
                    </strong>

                    <p>
                      A new {difficultyLabel.toLowerCase()}{" "}
                      puzzle generated for{" "}
                      {categoryNames[category]}.
                    </p>

                  </div>

                </div>

                <span
                  className={`difficulty-badge ${getDifficultyColor(
                    level
                  )}`}
                >
                  {difficultyLabel}
                </span>

              </div>

              <div className="workspace">

                <PuzzlePanel
                  puzzle={puzzle}
                  showHint={showHint}
                  onHint={() =>
                    setShowHint(
                      previous => !previous
                    )
                  }
                />

                <Terminal
                  output={output}
                  onSubmit={handleCommand}
                  disabled={solved}
                />

              </div>

              <div className="learning-panel">

                <div>

                  <span className="learning-icon">
                    💡
                  </span>

                  <div>

                    <strong>
                      Hint
                    </strong>

                    <p>
                      {showHint
                        ? puzzle.hint
                        : "Try solving the challenge before using a hint."}
                    </p>

                  </div>

                </div>

                <div>

                  <span className="learning-icon">
                    ⚡
                  </span>

                  <div>

                    <strong>
                      Useful Commands
                    </strong>

                    <div className="command-list">

                      <code>ls</code>
                      <code>cd</code>
                      <code>find</code>
                      <code>cat</code>
                      <code>grep</code>
                      <code>pwd</code>

                    </div>

                  </div>

                </div>

              </div>

              <div className="game-footer">

                <span>
                  🤖 AI will generate your
                  next challenge automatically.
                </span>

                <span>
                  Level {level} · {difficultyLabel}
                </span>

              </div>

            </>
          )}

        </section>

      </div>

    </main>
  );
}

export default Game;
