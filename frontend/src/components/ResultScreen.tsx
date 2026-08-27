type ResultScreenProps = {
  correct: boolean;
  explanation?: string;
  onNext: () => void;
  onCategories: () => void;
};

function ResultScreen({
  correct,
  explanation,
  onNext,
  onCategories
}: ResultScreenProps) {

  if (!correct) return null;

  return (
    <div className="result-card">

      <div className="success-icon">
        ✓
      </div>

      <div className="success-label">
        CHALLENGE COMPLETE
      </div>

      <h1>
        You solved it!
      </h1>

      <p>
        Nice work. Your Linux skills just
        leveled up.
      </p>

      <div className="xp-earned">
        <span>⭐</span>
        +50 XP
      </div>

      {explanation && (
        <div className="explanation-card">

          <strong>
            What you learned
          </strong>

          <p>
            {explanation}
          </p>

        </div>
      )}

      <div className="result-actions">

        <button
          className="gradient-button"
          onClick={onNext}
        >
          Next Challenge →
        </button>

        <button
          className="soft-button"
          onClick={onCategories}
        >
          Change Category
        </button>

      </div>

    </div>
  );
}

export default ResultScreen;
