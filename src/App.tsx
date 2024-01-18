import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProjectPage from "./components/pages/ProjectPage";
import Projects from "./components/pages/Projects";
import MyProjects from "./components/pages/InvolvedProjects";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className="flex justify-center">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route
            path="projects/myprojects/created"
            element={<MyProjects request="Created" />}
          />
          <Route
            path="projects/myprojects/involved"
            element={<MyProjects request="Participated" />}
          />
          <Route
            path="projects/myprojects/requested"
            element={<MyProjects request="Requested" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects/:project_id" element={<ProjectPage />} />
        </Routes>
      </main>
      <Footer />
    </Provider>
  );
}

export default App;
