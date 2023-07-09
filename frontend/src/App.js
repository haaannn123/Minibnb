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
import UsersTrips from "./components/UsersTrips";
import SearchResults from "./components/Search/SearchResults";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div className="entire-container">
      <ScrollToTop />
      <Navigation isLoaded={isLoaded}/>
      {isLoaded &&
        <Switch>
          <Route path="/signup" component={SignupFormModal} />
          <Route exact path="/" component={GetAllSpots}/>
          <Route path="/spots/new" component={CreateNewSpot} />
          <Route path="/spots/current" component={ManageSpots}/>
          <Route path="/spots/:spotId/edit" component={UpdateSpot}/>
          <Route path="/spots/:spotId" component={GetSingleSpot} />
          <Route path="/bookings/current" component={UsersTrips}/>
          <Route path="/search/:search_terms" component={SearchResults}/>
        </Switch>
        } 
        
      </div>
    </>
  );
};

export default App;
