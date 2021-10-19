import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import DashBoard from "./Dashboard";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivatRoute from "./PrivatRoute";
import ForgotPassword from "./ForgotPassword";
import NavBarComp from "./NavBarComp";


function App() {
  return (
    <AuthProvider>
      <NavBarComp />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <Switch>
              <PrivatRoute exact path="/" component={DashBoard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgotpassword" component={ForgotPassword} />
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>

  );
}

export default App;
