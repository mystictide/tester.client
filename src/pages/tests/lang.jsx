import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { getWithDate } from "../../assets/js/helpers";
import Gameplay from "../../components/lang/gameplay";
import Results from "../../components/main/results";
import { getRandomLanguage, resetLang } from "../../features/main/mainSlice";

function Langger() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedScore = JSON.parse(getWithDate("langScore"));
  const { state } = useLocation();
  const { difficulty, round } = state ? state : "";
  const [score, setScore] = useState(savedScore ? savedScore.score : 0);
  const [end, setEnd] = useState(savedScore ? savedScore.end : false);
  const { lang, isError } = useSelector((state) => state.main);

  useEffect(() => {
    return () => {
      dispatch(resetLang());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!state) {
      navigate("/");
    } else if (!lang && !isError) {
      const reqData = {
        round: 1,
        difficulty: difficulty === "easy" ? 1 : 2,
        prevLang: "",
      };
      dispatch(getRandomLanguage(reqData));
    }
  }, [dispatch, navigate, state, lang, getRandomLanguage]);

  return (
    <div className="main">
      <div className="overlay lang-overlay"></div>
      <section className="content content-wrapper">
        {lang ? (
          <div className="single test">
            <div className="info-overlay"></div>
            {end ? (
              <Results
                rounds={lang.Round}
                score={savedScore.score}
                game={"langger"}
              />
            ) : (
              <>
                <div className="info game">
                  <h1 className="fancy">
                    {round === "unl"
                      ? `Score: ${score}`
                      : `ROUND ${lang.Round} of ${round}`}
                  </h1>
                </div>{" "}
                <div className="starter">
                  <h2>Match audio to language</h2>
                  <Gameplay
                    difficulty={difficulty}
                    round={round}
                    lang={lang}
                    setScore={setScore}
                    end={end}
                    setEnd={setEnd}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="single">
            <div className="loading">
              <PropagateLoader
                color="#89daff"
                size={30}
                speedMultiplier={0.5}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Langger;
