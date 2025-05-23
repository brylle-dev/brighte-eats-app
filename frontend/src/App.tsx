import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Leads from "./pages/Leads";
import Lead from "./pages/Lead";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/lead/:id" element={<Lead />} />
      </Routes>
    </Layout>
  );
}
