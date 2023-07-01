import './UpdateSpot.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchSingleSpot, singleSpotOnChange, updateSpot } from "../../store/spots";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spot = useSelector((state) => state.spots.singleSpot);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchSingleSpot(parseInt(spotId)))
  }, [dispatch, spotId])

  

  const handleSubmit = (e) => {
    e.preventDefault();

    let country = e.target.country.value;
    let address = e.target.address.value;
    let city = e.target.city.value;
    let state = e.target.state.value;
    let description = e.target.description.value;
    let name = e.target.name.value;
    let price = e.target.price.value;
    let guests = e.target.guests.value;
    let bedrooms = e.target.bedrooms.value;
    let beds = e.target.beds.value;
    let bath = e.target.bath.value;
    let prevImage = e.target.prevImage.value;
    let img1 =  e.target.img1.value;
    let img2 = e.target.img2.value;
    let img3 = e.target.img3.value;
    let img4 = e.target.img4.value;

    let err = {};
    if (!country.length) err.country = "Country is required";
    if (!address.length) err.address = "Address is required";
    if (!city.length) err.city = "City is required";
    if (!state.length) err.state = "State is required";
    if (description.length < 30) err.description = "Description needs a minimum of 30 characters";
    if (!name.length) err.name = "Name is required";
    if (!price) err.price = "Price is required";
    if (!prevImage.length) err.prevImage = "Preview Image is required";
    if (img1 !== "" && !img1.endsWith('.png') && !img1.endsWith('.jpg') && !img1.endsWith('.jpeg')) err.img = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img2 !== "" && !img2.endsWith('.png') && !img2.endsWith('.jpg') && !img2.endsWith('.jpeg')) err.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img3 !== "" && !img3.endsWith('.png') && !img3.endsWith('.jpg') && !img3.endsWith('.jpeg')) err.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img4 !== "" && !img4.endsWith('.png') && !img4.endsWith('.jpg') && !img4.endsWith('.jpeg')) err.img4 = 'Image URL must end in .png, .jpg, or .jpeg'
    setErrors(err);

    if (Object.values(err).length > 0){
      setErrors(err)
    } else {

    
    const spot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      guests,
      beds,
      bedrooms,
      bath : bath,
      //prevImage,
      lat: 80.123213,
      lng: 100.123,
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

    if (spot) {
      dispatch(updateSpot(spot, parseInt(spotId), photoArr));
      history.push(`/spots/${parseInt(spotId)}`);
    }
  }
  };


  if (!spot) return null;
  if (!spot.SpotImages) return null
  if (parseInt(spot.id) !== parseInt(spotId)) return null;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Update your Spot</h1>
      <h2>Where's your place located?</h2>
      <h4>Guests will only get your exact address once they book a reservation.</h4>
      <label>
        Country
        <p className="errors">{errors.country}</p>
        <input
          name="country" 
          type="text" 
          placeholder="Country" 
          defaultValue={spot.country} 
        />
      </label>
      <label>
        Street Address
        <p className="errors">{errors.address}</p>
        <input 
          name="address" 
          type="text" 
          placeholder="Address" 
          defaultValue={spot.address} />
      </label>
      <div className="inner-inputs">
      <label>
          City
          <p className="errors">{errors.city}</p>
        <input 
          name="city" 
          type="text" 
          placeholder="City" 
          defaultValue={spot.city} 
        />
      </label>
        <label>
          State
          <p className="errors">{errors.state}</p>
          <input 
              name="state" 
              type="text" 
              placeholder="State" 
              defaultValue={spot.state}
          />
        </label>
      </div>
      <label>
        <h3>Describe your place to guests</h3>
        Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the
        neighborhood.
        <input name="description" type="text" placeholder="Description" defaultValue={spot.description}  />
      </label>
      <h3>How many guests can your place accomodate?</h3>
              <span>Check that you have enough beds to accomodate all of your guests comfortably</span>
              <label for="create-guests" >Guests</label>
              <input name="guests" id="create-guests" className="long-input"type="number" defaultValue={spot.guests}/>
              <h3>How many bedrooms can guests use?</h3>
              <label for="create-bedrooms">Bedrooms</label>
              <input name="bedrooms" type="number" id="create-bedrooms" className="long-input" defaultValue={spot.bedrooms}/>
              <label for="create-beds">Beds</label>
              <label for="create-beds">Beds</label>
              <input name="beds" id="create-beds" type="number" className="long-input" defaultValue={spot.beds} />
              <label for="create-baths">Baths</label>
              <input name="bath" type="number" id="create-baths" className="long-input" defaultValue={spot.bath} />
      <p className="errors">{errors.description}</p>
      <label>
        <h3>Create a title for your spot</h3>
        Catch guests' attention with a spot title that highlights what makes your place special.
        <input name="name" type="text" placeholder="Name of your spot" defaultValue={spot.name} />
      </label>
      <p className="errors">{errors.title}</p>
      <label>
        <h3>Set a base price for your spot</h3>
        Competitive pricing can help your listing stand out and rank higher in search results. $
        <input name="price" type="text" placeholder="Price per night(USD)" defaultValue={spot.price} />
      </label>
      <p className="errors">{errors.price}</p>
      <label>
      <h3 className="section-title">Liven up your spot with photos</h3>
          Submit a link to at least one photo to publish your spot.
          <input 
              name="prevImage"
              className="long-input"
              type="url" 
              placeholder="Preview Image URL, image must end in '.png', '.jpg', .'jpeg'" 
              defaultValue={spot.SpotImages[0].url} 
          />
          <input 
              name="img1"
              className="long-input"
              type="url" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" 
              defaultValue={spot.SpotImages[1] === undefined ? null : spot.SpotImages[1].url} 
          />
          <input 
              name="img2"
              className="long-input"
              type="url" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" 
              defaultValue={spot.SpotImages[1] === undefined ? null : spot.SpotImages[2].url} 
          />
          <input 
              name="img3"
              className="long-input"
              type="url" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" 
              defaultValue={spot.SpotImages[3] === undefined ? null : spot.SpotImages[3].url} 
              />
          <input 
              name="img4"
              className="long-input"
              type="url" 
              placeholder="Image must end in '.png', '.jpg', '.jpeg'" 
              defaultValue={spot.SpotImages[4] === undefined ? null : spot.SpotImages[4].url} 
              />
          <p className="errors">{errors.prevImage}</p>
        </label>
      <div>
        <button className="update-spot-button-button">Update your Spot</button>
      </div>
    </form>
  );
};

export default UpdateSpot;
