import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { newSpot } from "../../store/spots";
import "./CreateNewSpot.css";

const CreateNewSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [prevImage, setPrevImage] = useState("");
  const [errors, setErrors] = useState("");

  const sessionUser = useSelector((state) => state.session.user);

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
    if (!prevImage.endsWith('jpg') || !prevImage.endsWith('.jpeg') || !prevImage.endsWith('.png'))
    setErrors(err);

    if (Object.values(err).length > 0){
      return;
    }
    // removed id: sessionUser.id
    const spotImages = [{ url: prevImage, preview: "true" }];
    const owner = { id: sessionUser.id, firstName: sessionUser.firstName, lastName: sessionUser.lastName };
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
      Owner: owner,
      //   SpotImages: spotImages
    };

    const promise = await dispatch(newSpot(spot, spotImages));
    // .then((res) => {
    //     console.log("RES",res)
    // })
    if (promise) {
      history.push(`/spots/${promise.id}`);
      return;
    }
  };


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Create a new Spot</h1>
      <h2>Where's your place located?</h2>
      <div className="guest-text">Guests will only get your exact address once they book a reservation.</div>
      <label>
        Country
        <p className="errors">{errors.country}</p>
        <input
          className="long-input"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
      </label>
      <label>
        Street Address
        <p className="errors">{errors.address}</p>
        <input
          className="long-input"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </label>
      <div className="inner-inputs">
        <label className="city-label">
          City
          <p className="errors">{errors.city}</p>
          <input
            className="city-input"
            type="text"
            placeholder="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          ,
        </label>
        <label className="state-label">
          State
          <p className="errors">{errors.state}</p>
          <input
            className="state-input"
            type="text"
            placeholder="State"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </label>
      </div>
      <label className="label-seperate description">
        <h3 className="section-title">Describe your place to guests</h3>
        Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the
        neighborhood.
        <textarea
          className="description-input"
          type="text"
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <p className="errors">{errors.description}</p>
      <label className="label-seperate">
        <h3 className="section-title">Create a title for your spot</h3>
        Catch guests' attention with a spot title that highlights what makes your place special.
        <input type="text" placeholder="Name of your spot" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <p className="errors">{errors.name}</p>
      <label className="label-seperate">
        <h3 className="section-title">Set a base price for your spot</h3>
        Competitive pricing can help your listing stand out and rank higher in search results.
        <div className="price-input-container">
          <p>$</p>
          <input
            className="price-input"
            type="text"
            placeholder="Price per night(USD)"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
      </label>
      <p className="errors">{errors.price}</p>
      <label className="label-seperate">
        <h3 className="section-title">Liven up your spot with photos</h3>
        Submit a link to at least one photo to publish your spot.
        <input type="text" placeholder="Preview Image URL" value={prevImage} onChange={(event) => setPrevImage(event.target.value)} />
        <p className="errors">{errors.prevImage}</p>
      </label>
      <div className="create-spot-container">
        <button className="create-spot-button">Create Spot</button>
      </div>
    </form>
  );
};

export default CreateNewSpot;
