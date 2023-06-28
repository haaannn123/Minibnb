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
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [prevImage, setPrevImage] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
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
    if (!prevImage.endsWith('jpg') || !prevImage.endsWith('.jpeg') || !prevImage.endsWith('.png'));
    if (img1 !== "" && !img1.endsWith('.png') && !img1.endsWith('.jpg') && !img1.endsWith('.jpeg')) err.img = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img2 !== "" && !img2.endsWith('.png') && !img2.endsWith('.jpg') && !img2.endsWith('.jpeg')) err.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img3 !== "" && !img3.endsWith('.png') && !img3.endsWith('.jpg') && !img3.endsWith('.jpeg')) err.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img4 !== "" && !img4.endsWith('.png') && !img4.endsWith('.jpg') && !img4.endsWith('.jpeg')) err.img4 = 'Image URL must end in .png, .jpg, or .jpeg'
    setErrors(err);

    if (Object.values(err).length > 0){
      return;
    }

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

    let photoArr = [];

        let previewImg = {
            url: prevImage,
            preview: true
        }

        photoArr.push(previewImg)

        if (img1) {
            photoArr.push({
                url: img1,
                preview: false
            });
        }
        if (img2) {
            photoArr.push({
                url: img2,
                preview: false
            });
        }
        if (img3) {
            photoArr.push({
                url: img3,
                preview: false
            });
        }
        if (img4) {
            photoArr.push({
                url: img4,
                preview: false
            });
        }

    const promise = await dispatch(newSpot(spot, photoArr));
    if (promise) {
      history.push(`/spots/${promise.id}`);
      return;
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <h1 className="create-spot-header">Create a new Spot</h1>
        <h3>Where's your place located?</h3>
        <span className="guest-text">Guests will only get your exact address once they book a reservation.</span>
        <div className="country-street-address">
          <div className="country-values">
            <p className="errors">{errors.country}</p>
              <label for="country">Country</label>
              <input
                  id="country"
                  className="long-input"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                />
          </div>
          <div className="country-values">
            <p className="errors">{errors.address}</p>
            <label for="street-address">Street Address</label>
            <input
                id="street-address"
                className="long-input"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
          </div>
        </div>
        <div className="city-state">
          <div className="city-city">
            <p className="errors">{errors.city}</p>
            <label for="city" className="city-label">City</label>
            <input
                id="city"
                className="long-input"
                type="text"
                placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
            />
          </div>

          <div className="city-city">
            <p className="errors">{errors.state}</p>
              <label for="state" className="state-label">State</label>
              <input
                  id="state"
                  className="long-input"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
              />
          </div>
        </div>
        <h3 className="section-title">Describe your place to guests</h3>
        <label for="description" className="description-label">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about theneighborhood.</label>
        <p className="errors">{errors.description}</p>
        <textarea
            id="description"
            className="description-input"
            type="text"
            placeholder="Please write at least 30 characters"
            rows="10"
            cols="40"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />


        <h3 className="section-title">Create a title for your spot</h3>
        <label>Catch guests' attention with a spot title that highlights what makes your place special.</label>
        <p className="errors">{errors.name}</p>
        <input type="text" placeholder="Name of your spot" value={name} onChange={(event) => setName(event.target.value)} />
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
          <input 
              type="text" 
              placeholder="Preview Image URL, image must end in '.png', '.jpg', .'jpeg'" 
              value={prevImage} 
              onChange={(event) => setPrevImage(event.target.value)} 
          />
          <input 
              type="text" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" 
              value={img1} 
              onChange={(e) => setImg1(e.target.value)}
          />
          <input 
              type="text" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" value={img2} 
              onChange={(e) => setImg2(e.target.value)}
          />
          <input 
              type="text" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" 
              value={img3} 
              onChange={(e) => setImg3(e.target.value)}/>
          <input 
              type="text" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" 
              value={img4} 
              onChange={(e) => setImg4(e.target.value)}/>
          <p className="errors">{errors.prevImage}</p>
        </label>
        <div className="create-spot-container">
          <button className="create-spot-button">Create Spot</button>
        </div>
      </div>
    </form>
  );
};

export default CreateNewSpot;
