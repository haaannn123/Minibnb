const CreateNewSpot = () => {
  return (
    <form>
        <h1>Create a new Spot</h1>
        <h2>Where's your place located?</h2>
        <h3>Guests will only get your exact address once they book a reservation.</h3>
            <label>Country</label>
            <input type="text" value="Country"/>
            <label>Street Address</label>
            <input type="text" value="Street Address"/>
            <label>City</label>
            <input type="text" value="City"/>
            <label>State</label>
            <input type="text" value="STATE"/>
            <label>
                <h3>Describe your place to guests</h3>
                Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
            </label>
            <input type="text" value="Please write at least 30 characters"/>
            <label>
                <h3>Create a title for your spot</h3>
                Catch guests' attention with a spot title that highlights what makes your place special.
            </label>
            <input type="text" value="Name of your spot"/>
            <label>
                <h3>Set a base price for your spot</h3>
                Competitive pricing can help your listing stand out and rank highe in search results.
                $
            </label>
            <input type="text" value="Pricer per night(USD)"/>
            <label>
                <h3>Liven up your spot with photos</h3>
                Submit a link to at least one photo to publish your spot.
            </label>
            <input type="text" value="Preview Image URL"/>
            <input type="text" value="Image URL"/>
            <input type="text" value="Image URL"/>
            <input type="text" value="Image URL"/>

    <div>
        <button>Create Spot</button>
    </div>
    </form>
  );
};

export default CreateNewSpot;
