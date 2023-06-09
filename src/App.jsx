import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/main/home";
import Flagger from "./pages/tests/flagger";
import FlaggerStarter from "./pages/tests/flaggerStarter";
import Langger from "./pages/tests/lang";
import LanggerStarter from "./pages/tests/langStarter";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start/flagger" element={<FlaggerStarter />} />
            <Route path="/test/flagger" element={<Flagger />} />
            <Route path="/start/langger" element={<LanggerStarter />} />
            <Route path="/test/langger" element={<Langger />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
