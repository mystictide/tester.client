import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getWithDate, storeWithDate } from "../../assets/js/helpers";
import { getRandomLanguage } from "../../features/main/mainSlice";

const Gameplay = ({ difficulty, round, lang, setScore, end, setEnd }) => {
  const audioRef = useRef();
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
    lang && savedScore ? (lang.Round == savedScore.round ? true : false) : false
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
        prevLang: getWithDate("prevLangs"),
      };
      dispatch(getRandomLanguage(reqData)).then(updateAudio());
    }
  };

  const saveScore = (selectedItem) => {
    let rScore = savedScore ? savedScore.score : 0;
    if (lang.Correct.Language === selectedItem.Language) {
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
    audioRef.current.pause();
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

  const updateAudio = () => {
    audioRef.current.pause();
    audioRef.current.load();
  };

  return (
    <>
      <div>
        <audio
          key={lang.Correct.Language}
          ref={audioRef}
          controls
          controlsList="nodownload noplaybackrate"
        >
          <source src={lang.Correct.URL} type="audio/ogg" />
        </audio>
      </div>
      <div className="options">
        <div className="option-selector">
          {lang.Languages.map((item) => (
            <button
              key={item.ID}
              className={
                evaluated && selected
                  ? lang.Correct.Language === item.Language
                    ? "btn-option correct"
                    : selected.Language === item.Language
                    ? "btn-option wrong"
                    : "btn-option fade"
                  : "btn-option"
              }
              disabled={evaluated ? true : false}
              onClick={(e) => evaluateRound(item)}
            >
              {item.Language}
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
