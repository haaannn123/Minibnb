import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch , Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSingleSpot from "./components/GetSingleSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded &&
        <Switch>
          <Route exact path="/" component={GetAllSpots}/>
          <Route exact path="/:spotId" component={GetSingleSpot} />
        </Switch>}
    </>
  );
}

export default App;
