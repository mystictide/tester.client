import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Difficulty from "../../components/main/difficulty";
import Rounds from "../../components/main/rounds";
import { resetLang } from "../../features/main/mainSlice";

function LangStarter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [difficulty, setDifficulty] = useState("");
  const [round, setRound] = useState("");

  useEffect(() => {
    dispatch(resetLang());
  }, [dispatch]);

  return (
    <div className="main">
      <div className="overlay lang-overlay"></div>
      <section className="content content-wrapper">
        <div className="single test">
          <div className="info-overlay"></div>
          <div className="info">
            <h1 className="fancy">LANGGER</h1>
            <span>
              Whether you're a master at the art of listening or simply looking
              to challenge yourself
            </span>
          </div>
          <div className="starter">
            <h2>Select Difficulty</h2>
            <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
            <h2>Select Rounds</h2>
            <Rounds round={round} setRound={setRound} />
            {difficulty && round ? (
              <button
                className="btn-regular start"
                onClick={() =>
                  navigate("/test/langger", {
                    state: { difficulty: difficulty, round: round },
                  })
                }
              >
                Start
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LangStarter;
