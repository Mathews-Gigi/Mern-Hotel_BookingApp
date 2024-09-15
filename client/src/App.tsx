import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          //passing children prop to layout ?
          <Route
            path="/"
            element={
              <Layout>
                <p>Homepage</p>
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <p>serach - page</p>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
