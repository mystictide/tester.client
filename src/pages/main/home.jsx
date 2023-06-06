import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import flags from "../../assets/img/tests/flags.jpg";
import languages from "../../assets/img/tests/languages.jpeg";
import { getCountries } from "../../features/main/mainSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.main);

  useEffect(() => {
    if (!countries) {
      dispatch(getCountries());
    }
  }, [countries, dispatch]);

  return (
    <div className="main">
      <div className="overlay"></div>
      <section className="content content-wrapper">
        <div className="single">
          <ul className="h-list c-gap-10 r-gap-10">
            <li
              className="box"
              style={{ backgroundImage: `url(${languages})` }}
            >
              <div className="info v-center h-center">
                <h4>Languages</h4>
              </div>
            </li>
            <li
              className="box"
              style={{ backgroundImage: `url(${flags})` }}
              onClick={(e) => {
                navigate("/flagger");
              }}
            >
              <div className="info v-center h-center">
                <h4>Flagger</h4>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
