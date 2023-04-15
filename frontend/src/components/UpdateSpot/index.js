import "./UpdateSpot.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSingleSpot, updateSpot } from "../../store/spots";
import { useEffect } from "react";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spot = useSelector((state) => state.spots);
  
  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  console.log(spot);
  const [prevImage, setPrevImage] = useState(spot.SpotImages);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = {};
    if (!country.length) err.country = "Country is required";
    if (!address.length) err.address = "Address is required";
    if (!city.length) err.city = "City is required";
    if (!state.length) err.state = "State is required";
    if (!lat) err.lat = "Latitude is required";
    if (!lng) err.lng = "Longitude is required";
    if (description.length < 30) err.description = "Description needs a minimum of 30 characters";
    if (!name.length) err.name = "Name is required";
    if (!price) err.price = "Price is required";
    if (!prevImage.length) err.prevImage = "Preview Image is required";
    setErrors(err);

    const spot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      prevImage,
      lat: 80.123213,
      lng: 100.123,
    };

    if (spot) {
      await dispatch(updateSpot(spot, spotId));
      history.push(`/spots/${spotId}`);
    }
  };

  if (!spot) return null;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Update your Spot</h1>
      <h2>Where's your place located?</h2>
      <h4>Guests will only get your exact address once they book a reservation.</h4>
      <label>
        Country
        <p className="errors">{errors.country}</p>
        <input type="text" placeholder="Country" value={country} onChange={(event) => setCountry(event.target.value)} />
      </label>
      <label>
        Street Address
        <p className="errors">{errors.address}</p>
        <input type="text" placeholder="Address" value={address} onChange={(event) => setAddress(event.target.value)} />
      </label>
      <div className="inner-inputs">
        <label>
          City
          <p className="errors">{errors.city}</p>
          <input type="text" placeholder="City" value={city} onChange={(event) => setCity(event.target.value)} />,
        </label>
        <label>
          State
          <p className="errors">{errors.state}</p>
          <input type="text" placeholder="State" value={state} onChange={(event) => setState(event.target.value)} />
        </label>
        {/* <label>Latitude
            <p className='errors'>{errors.lat}</p>
        <input
            type="text"
            placeholder='Latitude'
            value={lat}
            onChange={(event) => setLat(event.target.value)}/>,
        </label>
        <label>Longitude
            <p className='errors'>{errors.lng}</p>
        <input
            type="text"
            placeholder='Longitude'
            value={lng}
            onChange={(event) => setLng(event.target.value)}/>
        </label> */}
      </div>
      <label>
        <h3>Describe your place to guests</h3>
        Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the
        neighborhood.
        <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <p className="errors">{errors.description}</p>
      <label>
        <h3>Create a title for your spot</h3>
        Catch guests' attention with a spot title that highlights what makes your place special.
        <input type="text" placeholder="Name of your spot" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <p className="errors">{errors.title}</p>
      <label>
        <h3>Set a base price for your spot</h3>
        Competitive pricing can help your listing stand out and rank higher in search results. $
        <input type="text" placeholder="Price per night(USD)" value={price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      <p className="errors">{errors.price}</p>
      <label>
        <h3>Liven up your spot with photos</h3>
        Submit a link to at least one photo to publish your spot.
        <input type="text" placeholder="Preview Image URL" value={prevImage} onChange={(event) => setPrevImage(event.target.value)} />
        <p className="errors">{errors.prevImage}</p>
        {/* <input
            type="text"
            placeholder='Image URL'
            value={image1}
            onChange={(event) => setImage1(event.target.value)}/>
        <p className="errors">{errors.image1}</p>
        <input
            type="text"
            placeholder='Image URL'
            value={image2}
            onChange={(event) => setImage2(event.target.value)}/>
        <p className="errors">{errors.image2}</p>
        <input
            type="text"
            placeholder='Image URL'
            value={image3}
            onChange={(event) => setImage3(event.target.value)}/>
        <p className="errors">{errors.image3}</p>
        <input
            type="text"
            placeholder='Image URL'
            value={image4}
            onChange={(event) => setImage4(event.target.value)}/>
        <p className="errors">{errors.image4}</p> */}
      </label>
      <div>
        <button>Create Spot</button>
      </div>
    </form>
  );
};

export default UpdateSpot;
