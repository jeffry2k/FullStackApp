import React, { useState, useEffect } from "react";
import { Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import TaskList from "./components/TaskList";
import CreateTask from './components/CreateTask'
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();   

    if (user) {
      console.log(user.roles);
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("user")
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>         

          {currentUser && (
            <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/tasks"} className="nav-link">
                Tasks
              </Link>              
            </li>
            <li className="nav-item">
              <Link to={"/create"} className="nav-link">
                Create Task
              </Link>              
            </li>            
            </div>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                Logout
              </a>           
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container p-4">
        <Switch>
          <PublicRoute restricted={false} component={Home} path={["/", "/home"]} exact />
          <PublicRoute restricted={true} exact path="/login" component={Login} />
          <PublicRoute restricted={false} exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute path="/tasks" component={TaskList} />
          <PrivateRoute path="/edit/:id" component={CreateTask} />
          <PrivateRoute path="/create" component={CreateTask} />          
        </Switch>
      </div>
    </div>
  );
};

export default App;
