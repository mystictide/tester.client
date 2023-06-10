import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Difficulty from "../../components/flagger/difficulty";
import Rounds from "../../components/flagger/rounds";
import { resetFlagger } from "../../features/main/mainSlice";

function FlaggerStarter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [difficulty, setDifficulty] = useState("");
  const [round, setRound] = useState("");

  useEffect(() => {
    dispatch(resetFlagger());
  }, [dispatch]);

  return (
    <div className="main">
      <div className="overlay flagger-overlay"></div>
      <section className="content content-wrapper">
        <div className="single flagger">
          <div className="info-overlay"></div>
          <div className="info">
            <h1 className="fancy">FLAGGER</h1>
            <span>
              Whether you're a geography enthusiast or simply looking to learn
              more about the world..
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
                  navigate("/test/flagger", {
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

export default FlaggerStarter;
