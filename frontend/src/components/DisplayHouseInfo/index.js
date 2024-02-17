import './DisplayHouseInfo.css'

const DisplayHouseInfo= ({name, image, location, rating, guests, price, bedrooms, beds, baths}) => {
    return(
        <div>
            {image && <div className="house-image">{image}</div>}
            {name && <h3 className="house-name">{name}</h3>}
            {location && <p className="house-location">{location}</p>}
            {rating && <p className="house-rating">{rating}</p>}
            {guests && <p className="house-guests">{guests}</p>}
            {price && <p className="house-price">{price}</p>}
            {bedrooms && <p className="house-bedrooms">{bedrooms}</p>}
            {beds && <p className="house-beds">{beds}</p>}
            {baths && <p className="house-baths">{baths}</p>}
        </div>
    )
}

export default DisplayHouseInfo;