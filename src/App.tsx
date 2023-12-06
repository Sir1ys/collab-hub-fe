import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Projects from "./components/pages/Projects";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="flex justify-center">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
