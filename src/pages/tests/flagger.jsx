import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rounds from "../../components/flagger/rounds";

function Flagger() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.main);
  const [round, setRound] = useState("10");

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
            <br />
          </div>
          <div className="starter">
            <h2>Select difficulty</h2>
            <div className="difficulty">
              <button className="btn-regular">EASY</button>
              <button className="btn-regular">HARD</button>
            </div>
            <Rounds round={round} setRound={setRound} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Flagger;
