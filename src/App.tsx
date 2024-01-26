import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProjectPage from "./components/pages/ProjectPage";
import Projects from "./components/pages/Projects";
import RequestedProjects from "./components/pages/RequestedProjects";
import CreatedProjects from "./components/pages/CreatedProjects";
import InvolvedProjects from "./components/pages/InvolvedProjects";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Footer from "./components/Footer";
import Chat from "./components/pages/Chat";
import "./App.css";
import io from "socket.io-client";
export const socket = io("http://localhost:3000");

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className="text-center flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route
            path="projects/myprojects/created"
            element={<CreatedProjects />}
          />
          <Route
            path="projects/myprojects/involved"
            element={<InvolvedProjects />}
          />
          <Route
            path="projects/myprojects/requested"
            element={<RequestedProjects />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
          <Route path="/projects/:project_id" element={<ProjectPage />} />
        </Routes>
      </main>
      <Footer />
    </Provider>
  );
}

export default App;
