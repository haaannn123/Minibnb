import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch , Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSingleSpot from "./components/GetSingleSpot";
import CreateNewSpot from "./components/CreateNewSpot";
<<<<<<< HEAD
import SignupFormModal from "./components/SignupFormModal";
=======
>>>>>>> f0f437e362e9038adb6ef31df37a4092eb3b5d55

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div className="entire-container">
      <Navigation isLoaded={isLoaded}/>
      {isLoaded &&
        <Switch>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
          <Route exact path="/" component={GetAllSpots}/>
          <Route exact path="/:spotId" component={GetSingleSpot} />
<<<<<<< HEAD
          <Route path="/new" component={CreateNewSpot} />
=======
          <Route exact path="/new" component={CreateNewSpot} />
>>>>>>> f0f437e362e9038adb6ef31df37a4092eb3b5d55
        </Switch>}
      </div>
    </>
  );
}

export default App;
