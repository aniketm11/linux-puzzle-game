type PuzzlePanelProps = {
  puzzle: {
    title: string;
    description: string;
    hint: string;
  };
  showHint: boolean;
  onHint: () => void;
};

function PuzzlePanel({
  puzzle,
  showHint,
  onHint
}: PuzzlePanelProps) {

  return (
    <div className="mission-card">

      <div className="mission-label">
        <span>⌁</span>
        MISSION
      </div>

      <h1>
        {puzzle.title}
      </h1>

      <p className="mission-description">
        {puzzle.description}
      </p>

      <div className="mission-info">

        <div className="info-box pink-bg">

          <span>◈</span>

          <div>
            <small>Difficulty</small>
            <strong>Easy</strong>
          </div>

        </div>

        <div className="info-box purple-bg">

          <span>★</span>

          <div>
            <small>Reward</small>
            <strong>50 XP</strong>
          </div>

        </div>

      </div>

      <div className="objective">

        <div className="objective-title">
          🎯 YOUR OBJECTIVE
        </div>

        <div className="objective-row">

          <span className="checked">
            ✓
          </span>

          <p>
            Understand the problem
          </p>

        </div>

        <div className="objective-row">

          <span>
            2
          </span>

          <p>
            Find the correct Linux command
          </p>

        </div>

        <div className="objective-row">

          <span>
            3
          </span>

          <p>
            Complete the challenge
          </p>

        </div>

      </div>

      <button
        className="hint-gradient"
        onClick={onHint}
      >
        💡
        {showHint
          ? "Hide Hint"
          : "Show Hint"}
      </button>

      <div className="hints-left">
        Hints remaining: 2
      </div>

    </div>
  );
}

export default PuzzlePanel;
