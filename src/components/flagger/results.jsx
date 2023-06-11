import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetFlagger } from "../../features/main/mainSlice";

const Results = ({ rounds, score, correct }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startOver = () => {
    dispatch(resetFlagger);
    navigate("/start/flagger");
  };

  function getScorePercentage() {
    return (100 * score) / rounds;
  }

  return (
    <div className="results">
      <h1 className="fancy">{`Scored ${score} out of ${rounds}`}</h1>
      <h3>
        That's{" "}
        {getScorePercentage() >= 50 ? (
          <span style={{ color: "green" }}>{getScorePercentage()}%</span>
        ) : (
          <span style={{ color: "red" }}>{getScorePercentage()}%</span>
        )}{" "}
        correct answers.
      </h3>
      <button className="btn-regular start" onClick={() => startOver()}>
        Start Over
      </button>
    </div>
  );
};

export default Results;
