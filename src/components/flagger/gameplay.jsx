import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWithDate, storeWithDate } from "../../assets/js/helpers";
import { getRandomFlag } from "../../features/main/mainSlice";

const Gameplay = ({ difficulty, round, flagger, setScore, end, setEnd }) => {
  const dispatch = useDispatch();
  const savedScore = JSON.parse(getWithDate("flaggerScore"));
  const [selected, setSelected] = useState(
    flagger && savedScore
      ? flagger.Round == savedScore.round
        ? savedScore.selected
        : null
      : null
  );
  const [evaluated, setEvaluated] = useState(
    flagger && savedScore
      ? flagger.Round == savedScore.round
        ? true
        : false
      : false
  );
  const evaluateRound = (item) => {
    setSelected(item);
    setEvaluated(true);
    saveScore(item);
  };

  const nextRound = () => {
    setSelected(null);
    setEvaluated(false);
    if (flagger.Round <= round || round === "unl") {
      const reqData = {
        round: flagger.Round + 1,
        difficulty: difficulty === "easy" ? 1 : 2,
        prevFlag: getWithDate("prevFlags"),
      };
      dispatch(getRandomFlag(reqData));
    }
  };

  const saveScore = (selectedItem) => {
    let rScore = savedScore ? savedScore.score : 0;
    if (flagger.Correct.Country === selectedItem.Country) {
      setScore((previousValue) => ++previousValue);
      rScore = ++rScore;
    }
    const results = {
      round: flagger.Round,
      score: rScore,
      selected: selectedItem,
      evaluated: true,
      end: flagger.Round == round ? true : false,
    };
    storeWithDate("flaggerScore", JSON.stringify(results), 1);
    checkFinalRound();
  };

  const checkFinalRound = () => {
    if (flagger.Round == round) {
      setEnd(true);
    }
  };

  const endRound = () => {
    setEnd(true);
  };

  return (
    <>
      <div className="options">
        <div className="option-selector">
          {flagger.Flags.map((item) => (
            <button
              key={item.ID}
              className={
                evaluated && selected
                  ? flagger.Correct.Country === item.Country
                    ? "btn-option correct"
                    : selected.Country === item.Country
                    ? "btn-option wrong"
                    : "btn-option fade"
                  : "btn-option"
              }
              disabled={evaluated ? true : false}
              onClick={(e) => evaluateRound(item)}
            >
              {item.Country}
            </button>
          ))}
        </div>
      </div>
      {evaluated && !end ? (
        <>
          <button className="btn-regular start" onClick={() => nextRound()}>
            Next
          </button>
          {round === "unl" ? (
            <button className="btn-regular start" onClick={() => endRound()}>
              End Round
            </button>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Gameplay;
