const Difficulty = ({ difficulty, setDifficulty }) => {
  return (
    <div className="difficulty">
      <button
        className={difficulty === "easy" ? "btn-regular active" : "btn-regular"}
        onClick={(e) => setDifficulty("easy")}
      >
        EASY
      </button>
      <button
        className={difficulty === "hard" ? "btn-regular active" : "btn-regular"}
        onClick={(e) => setDifficulty("hard")}
      >
        HARD
      </button>
    </div>
  );
};

export default Difficulty;
