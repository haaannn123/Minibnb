import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { newSpot } from '../../store/spots';
import './CreateNewSpot.css'

const CreateNewSpot = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [description, setDescription] = useState('');
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [prevImage, setPrevImage] = useState("");
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [errors, setErrors] = useState('');
    const history = useHistory();

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    let err = {};
        if (!country.length) err.country = "Country is required";
        if (!address.length) err.address = "Address is required";
        if (!city.length) err.city = "City is required";
        if (!state.length) err.state = "State is required";
        if (!lat) err.lat = "Latitude is required";
        if (!lng) err.lng = "Longitude is required";
        if (description.length < 30) err.description = "Description needs a minimum of 30 characters"
        if (!name.length) err.name = "Name is required";
        if (!price) err.price = "Price is required";
        if (!prevImage.length) err.prevImage = "Preview Image is required";
        if (!image1.endsWith('.jpg') || !image1.endsWith('.jpeg') || !image1.endsWith('.png')) err.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (!image2.endsWith('.jpg') || !image2.endsWith('.jpeg') || !image2.endsWith('.png')) err.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (!image3.endsWith('.jpg') || !image3.endsWith('.jpeg') || !image3.endsWith('.png')) err.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (!image4.endsWith('.jpg') || !image4.endsWith('.jpeg') || !image4.endsWith('.png')) err.image4 = 'Image URL must end in .png, .jpg, or .jpeg'
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
        lat,
        lng,
        image1,
        image2,
        image3,
        image4
    };

    const promise =  await dispatch(newSpot(spot));

    if (promise){
         history.push(`/spot/${promise.id}`);
         return
    }
  }

  return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Create a new Spot</h1>
            <h2>Where's your place located?</h2>
            <h4>Guests will only get your exact address once they book a reservation.</h4>
                <label>Country
                <p className="errors">{errors.country}</p>
                <input
                    type="text"
                    placeholder='Country'
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}/>
                </label>
                <label>Street Address
                <p className='errors'>{errors.address}</p>
                <input
                    type="text"
                    placeholder='Address'
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}/>
                </label>
            <div className='inner-inputs'>
                <label>City
                <p className="errors">{errors.city}</p>
                <input
                    type="text"
                    placeholder='City'
                    value={city}
                    onChange={(event) => setCity(event.target.value)}/>,
                </label>
                <label>State
                    <p className='errors'>{errors.state}</p>
                <input
                    type="text"
                    placeholder='State'
                    value={state}
                    onChange={(event) => setState(event.target.value)}/>
                </label>
                <label>Latitude
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
                </label>
                </div>
                <label>
                    <h3>Describe your place to guests</h3>
                    Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
                <input
                    type="text"
                    placeholder='Description'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}/>
                </label>
                <p className="errors">{errors.description}</p>
                <label>
                    <h3>Create a title for your spot</h3>
                    Catch guests' attention with a spot title that highlights what makes your place special.
                <input
                    type="text"
                    placeholder='Name of your spot'
                    value={name}
                    onChange={(event) => setName(event.target.value)}/>
                </label>
                <p className="errors">{errors.title}</p>
                <label>
                    <h3>Set a base price for your spot</h3>
                    Competitive pricing can help your listing stand out and rank higher in search results.
                $<input
                    type="text"
                    placeholder='Price per night(USD)'
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                </label>
                <p className='errors'>{errors.price}</p>
                <label>
                    <h3>Liven up your spot with photos</h3>
                    Submit a link to at least one photo to publish your spot.
                <input
                    type="text"
                    placeholder='Preview Image URL'
                    value={prevImage}
                    onChange={(event) => setPrevImage(event.target.value)}/>
                <p className="errors">{errors.prevImage}</p>
                <input
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
                <p className="errors">{errors.image4}</p>
                </label>
        <div>
            <button>Create Spot</button>
        </div>
        </form>
  );
};

export default CreateNewSpot;
