import { useNavigate } from "react-router-dom";
import flags from "../../assets/img/tests/flags.jpg";
import languages from "../../assets/img/tests/languages.jpeg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="overlay"></div>
      <section className="content content-wrapper">
        <div className="single">
          <ul className="h-list c-gap-10 r-gap-10">
            <li
              className="box"
              style={{ backgroundImage: `url(${languages})`, opacity: ".4" }}
            ></li>
            <li
              className="box"
              style={{ backgroundImage: `url(${flags})` }}
              onClick={(e) => {
                navigate("/start/flagger");
              }}
            ></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
