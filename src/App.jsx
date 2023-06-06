import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/main/home";
import Flagger from "./pages/tests/flagger";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flagger" element={<Flagger />} />
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
