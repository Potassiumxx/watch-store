import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-dvh">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
