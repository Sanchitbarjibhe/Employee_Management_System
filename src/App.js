import { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import EmpList from "./Components/EmpList";
import {
  Button,
  Avatar,
  Typography,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import "./App.css";
import AddEmp from "./Components/AddEmp";
import EditEmp from "./Components/EditEmp";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";

export default function App() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("access-token"));

  const [View, setView] = useState(true);

  const navigateToEmpList = () => {
    navigate("/emplist");
  };
  const navigateToAddEmp = () => {
    navigate("/addemp");
  };
  const navigateToEditEmp = () => {
    navigate("/editemp");
  };

  const navigateToRegistration = () => {
    setView(!View);
    navigate("/registration");
  };

  const navigateToLogin = () => {
    setView(!View);
    navigate("/");
  };
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  function navigateToProfile() {
    navigate("/profile");
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Employer app
            </Typography>
            {user ? (
              <>
                <Button onClick={navigateToAddEmp} color="inherit">
                  Add employer
                </Button>
                <Button onClick={navigateToEmpList} color="inherit">
                  Employers
                </Button>
                <Button onClick={logout} color="inherit">
                  Logout
                </Button>
                <Avatar
                  onClick={navigateToProfile}
                  src="/broken-image.jpg"
                  sx={{ height: "37px", width: "37px" }}
                />
              </>
            ) : (
              <>
                {View ? (
                  <>
                    <Button onClick={navigateToRegistration} color="inherit">
                      SignUp
                    </Button>
                  </>
                ) : (
                  <Button onClick={navigateToLogin} color="inherit">
                    Login
                  </Button>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to={"/emplist"} />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/emplist" element={<EmpList />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/editemp/:id" element={<EditEmp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/addemp" element={<AddEmp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
