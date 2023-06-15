import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWithDate, storeWithDate } from "../../assets/js/helpers";
import { getRandomFlag } from "../../features/main/mainSlice";

const Gameplay = ({ difficulty, round, lang, setScore, end, setEnd }) => {
  const dispatch = useDispatch();
  const savedScore = JSON.parse(getWithDate("langScore"));
  const [selected, setSelected] = useState(
    lang && savedScore
      ? lang.Round == savedScore.round
        ? savedScore.selected
        : null
      : null
  );
  const [evaluated, setEvaluated] = useState(
    lang && savedScore
      ? lang.Round == savedScore.round
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
    if (lang.Round <= round || round === "unl") {
      const reqData = {
        round: lang.Round + 1,
        difficulty: difficulty === "easy" ? 1 : 2,
        prevFlag: getWithDate("prevLangs"),
      };
      dispatch(getRandomFlag(reqData));
    }
  };

  const saveScore = (selectedItem) => {
    let rScore = savedScore ? savedScore.score : 0;
    if (lang.Correct.Country === selectedItem.Country) {
      setScore((previousValue) => ++previousValue);
      rScore = ++rScore;
    }
    const results = {
      round: lang.Round,
      score: rScore,
      selected: selectedItem,
      evaluated: true,
      end: lang.Round == round ? true : false,
    };
    storeWithDate("langScore", JSON.stringify(results), 1);
    checkFinalRound();
  };

  const checkFinalRound = () => {
    if (lang.Round == round) {
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
          {lang.Flags.map((item) => (
            <button
              key={item.ID}
              className={
                evaluated && selected
                  ? lang.Correct.Country === item.Country
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
