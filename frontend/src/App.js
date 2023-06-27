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
import GetSpotForUpdated from "./components/UpdateSpot/GetSpotForUpdated";
import UsersTrips from "./components/UsersTrips";


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
          <Route path="/signup" component={SignupFormModal} />
          <Route exact path="/" component={GetAllSpots}/>
          <Route path="/spots/new" component={CreateNewSpot} />
          <Route path="/spots/current" component={ManageSpots}/>
          <Route path="/spots/:spotId/edit" component={GetSpotForUpdated}/>
          <Route path="/spots/:spotId" component={GetSingleSpot} />
          <Route path="/bookings/current" component={UsersTrips}/>
        </Switch>}
      </div>
    </>
  );
};

export default App;
