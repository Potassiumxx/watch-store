import { Outlet } from "react-router-dom";
import Footer from "./components/ui/Footer/Footer";
import Navbar from "./components/ui/Navbar/Navbar";

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
