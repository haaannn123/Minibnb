import "./UpdateSpot.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSpot } from "../../store/spots";

const UpdateSpot = ({ spot }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [guests, setGuests] = useState(spot.guests);
  const [bedrooms, setBedrooms] = useState(spot.bedrooms)
  const [beds, setBeds] = useState(spot.beds)
  const [baths, setBaths] = useState(spot.bath)
  const [prevImage, setPrevImage] = useState(spot.SpotImages[0].url);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = {};
    if (!country.length) err.country = "Country is required";
    if (!address.length) err.address = "Address is required";
    if (!city.length) err.city = "City is required";
    if (!state.length) err.state = "State is required";

    if (description.length < 30) err.description = "Description needs a minimum of 30 characters";
    if (!name.length) err.name = "Name is required";
    if (!price) err.price = "Price is required";
    if (!prevImage.length) err.prevImage = "Preview Image is required";
    setErrors(err);

    if (Object.values(err).length > 0) return;
    const spot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      //prevImage,
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
      </div>
      <label>
        <h3>Describe your place to guests</h3>
        Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the
        neighborhood.
        <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <h3>How many guests can your place accomodate?</h3>
              <span>Check that you have enough beds to accomodate all of your guests comfortably</span>
              <label for="create-guests" >Guests</label>
              <input id="create-guests" className="long-input"type="number" value={guests} onChange={(e) => setGuests(e.target.value)}/>
              <h3>How many bedrooms can guests use?</h3>
              <label for="create-bedrooms">Bedrooms</label>
              <input type="number" id="create-bedrooms" className="long-input" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}/>
              <lable for="create-beds">Beds</lable>
              <input id="create-beds" type="number" className="long-input" value={beds} onChange={(e) => setBeds(e.target.value)}/>
              <label for="create-baths">Baths</label>
              <input type="number" id="create-baths" className="long-input" value={baths} onChange={(e)=> setBaths(e.target.value)}/>
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
        <button>Update your Spot</button>
      </div>
    </form>
  );
};

export default UpdateSpot;
