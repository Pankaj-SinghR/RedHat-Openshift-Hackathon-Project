import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
