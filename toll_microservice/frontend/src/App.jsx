import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VechileDetails from "./components/VechileDetails";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:id" element={<VechileDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
