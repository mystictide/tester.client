const Rounds = ({ round, setRound }) => {
  return (
    <div className="options">
      <div className="option-selector">
        <label
          className={round === "10" ? "active" : ""}
          onClick={(e) => setRound("10")}
        >
          Round of 10
        </label>
      </div>
      <div className="option-selector">
        <label
          className={round === "25" ? "active" : ""}
          onClick={(e) => setRound("25")}
        >
          Round of 25
        </label>
      </div>
      <div className="option-selector">
        <label
          className={round === "50" ? "active" : ""}
          onClick={(e) => setRound("50")}
        >
          Round of 50
        </label>
      </div>
      <div className="option-selector">
        <label
          className={round === "unl" ? "active" : ""}
          onClick={(e) => setRound("unl")}
        >
          Unlimited
        </label>
      </div>
    </div>
  );
};

export default Rounds;
