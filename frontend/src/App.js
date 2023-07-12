import React, { useReducer } from "react";
import { reducer, initialLoggedInDetails } from "./context/Reducer";
import AppContext from "./context/AppContext";
import Main from "./Main";

function App() {
  const [loggedInDetails, dispatch] = useReducer(
    reducer,
    initialLoggedInDetails
  );
  return (
    <AppContext.Provider value={{ loggedInDetails, dispatch }}>
      <Main />
    </AppContext.Provider>
  );
}

export default App;
