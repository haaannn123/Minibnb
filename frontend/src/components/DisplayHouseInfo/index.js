import './DisplayHouseInfo.css'

const DisplayHouseInfo= ({image, location, rating, guests, price, bedrooms, beds, baths}) => {
    return(
        <div>
            <img src={image} alt="house"/>

        </div>
    )
}

export default DisplayHouseInfo;