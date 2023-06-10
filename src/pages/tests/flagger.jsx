import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { getWithDate } from "../../assets/js/helpers";
import Gameplay from "../../components/flagger/gameplay";
import Results from "../../components/flagger/results";
import { getRandomFlag, resetFlagger } from "../../features/main/mainSlice";

function Flagger() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedScore = JSON.parse(getWithDate("flaggerScore"));
  const { state } = useLocation();
  const { difficulty, round } = state ? state : "";
  const [score, setScore] = useState(savedScore ? savedScore.score : 0);
  const [end, setEnd] = useState(savedScore ? savedScore.end : false);
  const { flagger, isError } = useSelector((state) => state.main);

  useEffect(() => {
    return () => {
      dispatch(resetFlagger());
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
    } else if (!flagger && !isError) {
      const reqData = {
        round: 1,
        difficulty: difficulty === "easy" ? 1 : 2,
        prevFlag: "",
      };
      dispatch(getRandomFlag(reqData));
    }
  }, [dispatch, navigate, state, flagger, getRandomFlag]);

  return (
    <div className="main">
      <div className="overlay flagger-overlay"></div>
      <section className="content content-wrapper">
        {flagger ? (
          <div className="single flagger">
            <div className="info-overlay"></div>
            {end ? (
              <Results rounds={flagger.Round} score={savedScore.score} />
            ) : (
              <>
                <div className="info game">
                  <h1 className="fancy">
                    {round === "unl"
                      ? `Score: ${score}`
                      : `ROUND ${flagger.Round} of ${round}`}
                  </h1>
                  <img src={flagger.Correct.URL}></img>
                </div>{" "}
                <div className="starter">
                  <h2>Match flag to country</h2>
                  <Gameplay
                    difficulty={difficulty}
                    round={round}
                    flagger={flagger}
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

export default Flagger;
