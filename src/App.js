import { useSelector } from "react-redux";

import Login from "./components/Login/Login";

import { authSelectors } from "./store/authSlice";
import spinner from "./assets/images/spinner.gif";
import "./App.css";

function App() {
  const userLoading = useSelector(authSelectors.loading);
  const user = useSelector(authSelectors.user);

  return (
    <>
      <header>
        <h1>Roleplay Town Portals Editor</h1>
      </header>
      <main>
        {(() => {
          if (userLoading) {
            return <img alt="loading" src={spinner} />;
          } else if (user) {
            return <div>Authenticated!</div>
          } else {
            return <Login />
          }
        })()}
      </main>
    </>
  );
}

export default App;
