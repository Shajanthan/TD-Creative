import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePage from "./pages/SinglePage";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Layout>
                <SinglePage />
              </Layout>
              <WhatsAppButton />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
