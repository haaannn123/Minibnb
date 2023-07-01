import { useEffect } from 'react';
import './UsersTrips.css';
import { thunkGetUserBookings } from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModelButton';
import { NavLink } from 'react-router-dom'
import ChangeReservationModal from '../ChangeReservationModal';

const UsersTrips = () => {
    const dispatch= useDispatch();

    const userTrips = useSelector(state => state.bookingsReducer.bookings.Bookings)
    console.log('USERS BOOKINGS:', userTrips)
    
    useEffect(() => {
        dispatch(thunkGetUserBookings())
    }, [dispatch]);
    
    if (!userTrips) return null;
    
    const pastTrips = userTrips.filter(spotsObj => new Date(spotsObj.endDate) <= new Date());
    const upcomingTrips = userTrips.filter(spotsObj => new Date(spotsObj.endDate) >= new Date());
    return (
        <>
            <div className="user-trips-container">
                <h1 className="user-trips-header">Upcoming Trips</h1>
                <div className="user-trips-card-container">
                    {upcomingTrips.length > 0 ? (
                        upcomingTrips.map(spotsObj => (
                            <div className="destination-card" key={spotsObj.spotId}>
                                <NavLink to={`/spots/${spotsObj.spotId}`}>
                                    <img className="destination-img" src={spotsObj.Spot.previewImage} alt="place" />
                                </NavLink>
                                <div className="destination-details">
                                    <span className="destination-dates">
                                        {new Date(spotsObj.startDate).toLocaleDateString(undefined, {
                                            month: "long",
                                            day: "numeric",
                                            timeZone: "UTC"
                                        })} - {new Date(spotsObj.endDate).toLocaleDateString(undefined, {
                                            month: "long",
                                            day: "numeric",
                                            timeZone: "UTC"
                                        })}
                                    </span>
                                    <h2 className="destination-city">{spotsObj.Spot.city}</h2>
                                    <OpenModalButton
                                        buttonText="Change Reservation"
                                        modalComponent={<ChangeReservationModal startDate={spotsObj.startDate} endDate={spotsObj.endDate} guests={spotsObj.numberOfGuests} maxGuests={spotsObj.Spot.guests} bookingId={spotsObj.id} />}
                                        className="change-booking"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <span>You don't have any trips coming up, make a reservation by clicking on a spot and selecting the appropriate dates and guests!</span>
                    )}
                </div>
            </div>
            <div className="user-trips-container">
                <h1 className="user-trips-header">Past trips</h1>
                <div className="user-trips-card-container">
                    {pastTrips.length > 0 ? (
                        pastTrips.map(spotsObj => (
                            <div className="destination-card" key={spotsObj.spotId}>
                                <NavLink to={`/spots/${spotsObj.spotId}`}>
                                    <img className="destination-img" src={spotsObj.Spot.previewImage} alt="place" />
                                </NavLink>
                                <div className="destination-details">
                                    <span className="destination-dates">
                                        {new Date(spotsObj.startDate).toLocaleDateString(undefined, {
                                            month: "long",
                                            day: "numeric",
                                            timeZone: "UTC"
                                        })} - {new Date(spotsObj.endDate).toLocaleDateString(undefined, {
                                            month: "long",
                                            day: "numeric",
                                            timeZone: "UTC" 
                                        })}
                                    </span>
                                    <h2 className="destination-city">{spotsObj.Spot.city}</h2>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>
            </div>
        </>
    );
    
}

export default UsersTrips;