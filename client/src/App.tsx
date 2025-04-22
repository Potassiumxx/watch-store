import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-dvh">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
