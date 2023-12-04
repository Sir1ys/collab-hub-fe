import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Projects from "./components/pages/Projects";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
