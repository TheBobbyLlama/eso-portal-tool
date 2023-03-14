import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "./components/Login/Login";

import { authActions, authSelectors } from "./store/authSlice";
import spinner from "./assets/images/spinner.gif";
import "./App.css";

function App() {
  const userLoading = useSelector(authSelectors.busy);
  const user = useSelector(authSelectors.user);
  const dispatch = useDispatch();

  // Attempt to login using saved user data on startup.
  useEffect(() => {
    dispatch(authActions.autoLogin());
  }, []);

  const doLogout = () => {
    dispatch(authActions.logout());
  }

  return (
    <>
      <header>
        <h1>Roleplay Town Portals Editor</h1>
        {user && <div>
          <button id="logout" onClick={doLogout}>Logout</button>
        </div>}
      </header>
      <main>
        {(() => {
          if (user) {
            return <div>Authenticated!</div>
          } else if (userLoading) {
            return <img alt="loading" src={spinner} />;
          } else {
            return <Login />
          }
        })()}
      </main>
    </>
  );
}

export default App;
