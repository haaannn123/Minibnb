import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch , Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSingleSpot from "./components/GetSingleSpot";
import CreateNewSpot from "./components/CreateNewSpot";
import SignupFormModal from "./components/SignupFormModal";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";


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
          <Route path="/spots/new" component={CreateNewSpot} />
          <Route path="/spots/current" component={ManageSpots}/>
          <Route path="/spots/:spotId/edit" component={UpdateSpot}/>
          <Route path="/spots/:spotId" component={GetSingleSpot} />
        </Switch>}
      </div>
    </>
  );
};

export default App;
