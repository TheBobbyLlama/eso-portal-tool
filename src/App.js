import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "./screens/Login/Login";
import Editor from "./screens/Editor/Editor";
import ModalManager from "./screens/ModalManager/ModalManager";

import { authActions, authSelectors } from "./store/authSlice";
import { modalActions, modalKey } from "./store/modalSlice";
import { townSelectors } from "./store/townSlice";
import spinner from "./assets/images/spinner.gif";
import "./App.css";

function App() {
  const userLoading = useSelector(authSelectors.busy);
  const user = useSelector(authSelectors.user);
  const changed = useSelector(townSelectors.changed);
  const dispatch = useDispatch();

  // Attempt to login using saved user data on startup.
  useEffect(() => {
    setTimeout(() => { dispatch(authActions.startupTasks()); }, 100);
  }, [ dispatch ]);

  const doLogout = () => {
    if (changed) {
      dispatch(modalActions.showModal({
        key: modalKey.generic,
        data: {
          title: `Confirm`,
          text: "You have unsaved changes.  Are you sure you want to log out?",
          action: authActions.logout(),
        }
      }));
    } else {
      dispatch(authActions.logout());
    }
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
            return <Editor />
          } else if (userLoading) {
            return <img alt="loading" src={spinner} />;
          } else {
            return <Login />
          }
        })()}
      </main>
      <ModalManager />
    </>
  );
}

export default App;
