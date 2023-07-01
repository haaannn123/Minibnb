import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSingleSpot } from "../../store/spots";
import GetSpotReview from "../GetSpotReview";
import OpenModalButton from "../OpenModelButton";
import ReviewModal from "../ReviewModal";
import "./GetSingleSpot.css";
import { thunkCreateBookings, thunkGetUserBookings } from "../../store/bookings";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const GetSingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(currentDate);
  const [guests, setGuests] = useState()
  const [totalBeforeTaxes, setTotalBeforeTaxes] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0)
  const [airBnbFee, setAirBnbFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0)
  const [errors, setErrors] = useState([])
  const endDateDate = new Date(new Date(startDate).getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [endDate, setEndDate] = useState(endDateDate)
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector(state => state.bookingsReducer.bookings.Bookings);
  console.log('BOOKINGS:', bookings)
  const singleSpot = useSelector((state) => state.spots.singleSpot);
  const allReviews = Object.values(useSelector((state) => state.reviews.spot));
  const spotImages = singleSpot.SpotImages;

  const numberReviews = singleSpot.numReviews;
  const history = useHistory();

  const getPrice = (price) => {
    if (price && typeof price === "number") {
      const roundedPrice = Math.ceil(price);
      return parseInt(roundedPrice);
    } else {
      return price;
    }
  };

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
    dispatch(thunkGetUserBookings())
  }, [dispatch, spotId]);

  const calculateTotalAmount = () => {
    const pricePerNight = singleSpot.price;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    setTotalDays(totalDays);
    const totalBeforeTaxes = totalDays * pricePerNight;
    setTotalBeforeTaxes(totalBeforeTaxes);
    const cleaningFee = (totalBeforeTaxes * .1)
    setCleaningFee(getPrice(cleaningFee))
    const airBnbFee = (totalBeforeTaxes * .14)
    setAirBnbFee(getPrice(airBnbFee))
    const totalAmount = totalBeforeTaxes + cleaningFee + airBnbFee;
    setTotalAmount(totalAmount)
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [startDate, endDate, singleSpot.price]);
  

  let userReview;
  for (let reviewObj of allReviews) {
    userReview = reviewObj.userId;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let bookings = {
      startDate,
      endDate,
      numberOfGuests: guests
    }
    dispatch(thunkCreateBookings(singleSpot.id, bookings))
    .catch(async (res) => {
      const data = await res.json();
      const errors = Object.values(data.errors);
      if (!errors){
        history.push('/bookings/current')
      }
      setErrors(errors)
    })
    
  }

  const getStars = (stars) => {
    if (stars && typeof stars === "number") {
      return stars.toFixed(1);
    } else {
      return stars;
    }
  };



  const checkReviews = (reviews) => {
    if (reviews === 0) {
      return (
        <div className="review-info">
          <i className="fa-sharp fa-solid fa-star"></i>
          <p>New</p>
        </div>
      );
    } else {
      return (
        <div className="review-info">
          <i className="fa-sharp fa-solid fa-star"></i>
          <p>{getStars(singleSpot.avgStarRating)}</p>
          <div className="centered-dot">·</div>
          <h4>{numberReviews > 1 ? `${numberReviews} Reviews` : `${numberReviews} Review`}</h4>
        </div>
      );
    }
  };

  const ifUser = () => {
    if (sessionUser && sessionUser.id !== singleSpot.ownerId && userReview !== sessionUser.id) {
      return <OpenModalButton className="post-review-button" buttonText="Leave A Review" modalComponent={<ReviewModal spotId={spotId} />} />;
    }
  };

  const reviewHeader = () => {
    if (numberReviews === 0) {
      return (
        <div className="reviews-header">
          <i className="fa-sharp fa-solid fa-star"></i>
          <h3>New</h3>
        </div>
      );
    } else {
      return (
        <div className="reviews-header">
          <i className="fa-sharp fa-solid fa-star"></i>
          <h4>{getStars(singleSpot?.avgStarRating)}</h4>
          <div className="centered-dot">·</div>
          <h4>{numberReviews > 1 ? `${numberReviews} Reviews ` : `${numberReviews} Review`}</h4>
        </div>
      );
    }
  };

  const renderReviews = () => {
    if (numberReviews === 0) {
      return <h4>Be the first to Post a Review!</h4>;
    } else {
      return <GetSpotReview />;
    }
  };


  if (!singleSpot) return null;
  if (!spotImages) return null;
  if (!singleSpot.Owner) return null;

  let previewImg = spotImages[0]
  let img1 = spotImages[1];
  let img2 = spotImages[2]
  let img3 = spotImages[3]
  let img4 = spotImages[4]

  return (
    <>
      <div className="spot-details-container">
        <h1 id="spot-details-header">{singleSpot.name}</h1>
        <div  className="spot-details-subheading">
        <div>{reviewHeader()}</div>
        <div>·</div>
        <div>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</div>
        </div>
        <div className="spot-images-container">
              <img src={previewImg.url} alt="cottage house" className="preview-image"/>
              <div className="four-images-container">
                  <img className="small-images" src={img1 ? img1.url : "https://i.imgur.com/zuH81uv.png"} alt=""/>
                  <img className="small-images top-right" src={img2? img2.url: "https://i.imgur.com/zuH81uv.png"} alt=""/>
                  <img className="small-images " src={img3? img3.url: "https://i.imgur.com/zuH81uv.png"} alt=""/>
                  <img className="small-images bottom-right" src={img4? img4.url: "https://i.imgur.com/zuH81uv.png"} alt=""/>
              </div>
        </div>
        <div className="single-spot-details">
          <div className="single-spot-details-info">
            <h2 className="single-spot-header-host">Entire home hosted by {singleSpot.Owner.firstName}</h2>
            <p className="home-occupancy">{singleSpot.guests} guests · {singleSpot.bedrooms} bedrooms · {singleSpot.beds} beds · {singleSpot.bath} baths</p>
            <div className="home-info">
              <span className="material-symbols-outlined door">door_open</span>
              <div className="home-info-sub">
                <h3 className="self-check-in-header">Self check-in</h3>
                <span className="self-check-in-description">Check yourself in with the lockbox.</span>
              </div>
            </div>
            <div className="home-info">
              <span className="material-symbols-outlined door">social_leaderboard</span>
              <div className="home-info-sub">
                <h3 className="self-check-in-header">{singleSpot.Owner.firstName} is a Superhost</h3>
                <span className="self-check-in-description">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
              </div>
            </div>
            <span className="single-spot-description">{singleSpot.description}</span>
          </div>
          <div className="single-spot-reservation">
            <div className="single-spot-reservation-info">
              <div className="single-spot-price-container">
                <p className="single-spot-price">${singleSpot.price} night</p>
              </div>
              <p>{checkReviews(singleSpot.numReviews)}</p>
            </div>
            <form onSubmit={handleSubmit} className="form-form">
            <div className="reserving-box">
              <div className="checks">
                  <div className='check-in-container'>
                    <label className="reservation-labels" for="check-in">CHECK-IN</label>
                    <input 
                      id="check-in" 
                      type="date"
                      value={startDate}
                      onChange = {(e) => setStartDate(e.target.value)}
                      min={currentDate}
                      required/>
                  </div>
                  <div className="check-out-container">
                    <label className="reservation-labels" for="check-in">CHECKOUT</label>
                    <input 
                      id="check-in" 
                      type="date"
                      value={endDate}
                      min={new Date(new Date(startDate).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      onChange = {(e) => setEndDate(e.target.value)}
                      required/>
                  </div>
              </div>
              <div className="number-of-guests">
                    <label className="reservation-labels" for="guests">GUESTS</label>
                    <input 
                      id="guests" 
                      type="number"
                      value={parseInt(guests)}
                      onChange={(e) => setGuests(e.target.value)}
                      placeholder={singleSpot.guests}
                      max={singleSpot.guests}
                      min="1"
                      required/>
              </div>
            </div>
            <div className='booking-signup-errors'>
              {errors.map((error, idx) => <p className="errors" key={idx}>*{error}</p>)}
            </div>
            <button type="submit" className="reserve-button">Reserve</button>
            <p className="text-under-reserve-button">You won't be charged yet</p>
            <div className="single-spot-total-price">
                <div className="single-spot-total-price-sub">${singleSpot.price} X {totalDays} nights</div>
                <div className="single-spot-total-price-sub">${totalBeforeTaxes}</div>
            </div>
            <div className="single-spot-total-price">
              <div className="single-spot-total-price-sub">Cleaning Fee</div>
              <div className="single-spot-total-price-sub">${cleaningFee}</div>
            </div>
            <div className="single-spot-total-price">
              <div className="single-spot-total-price-sub">Minibnb Fee</div>
              <div className="single-spot-total-price-sub">${airBnbFee}</div>
            </div>
            <div className="single-spot-total-price">
              <div>Total before taxes</div>
              <div>${getPrice(totalAmount)}</div>
            </div>
            
            </form>
          </div>
        </div>
        <div className="reviews-section-container">
          {ifUser()}
          {renderReviews()}
        </div>
      </div>
    </>
  );
};
export default GetSingleSpot;
