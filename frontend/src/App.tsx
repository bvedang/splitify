import Layout from "./Layout/Layout";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Bills from "./pages/Bills/Bills";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <Layout header={<Header />} footer={<Footer />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Users />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Layout>
  );
}

export default App;
