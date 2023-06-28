import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';


const SearchResults = () => {
    const {search_terms}  = useParams()

    const searchResult = Object.values(useSelector((state) => state.spots.allSpots));

    const getPrice = (price) => {
        if (price && typeof price === "number") {
          return price.toFixed(2);
        } else {
          return price;
        }
      };

      const getStars = (stars) => {
        if (stars && typeof stars === "number") {
          return stars.toFixed(1);
        } else {
          return stars;
        }
      };
    
    return (
        <div className="search-results-container">
        <h1>Search Results for "{`${search_terms}`}"</h1>
            <div className="search-results">
                {searchResult.length === 0 ? (<h2>Sorry, your search came up empty!</h2>
                ) : (
                    searchResult.map(obj => {
                        return (
                            <div className="all-spots-card">
                            <NavLink className="all-spots-navlink" to={`/spots/${obj.id}`}>
                            <img src={obj.previewImage} alt="house" className="all-spots-card-image" />
                            <div className="all-spots-card-details">
                                <h3 className="all-spots-city">{`${obj.city}, ${obj.state}`}</h3>
                                <h3 className="rating"><i className="fa-sharp fa-solid fa-star star all-spots-star"></i>{obj.avgRating === 0 ? "New" : getStars(obj.avgRating)}</h3>
                            </div>
                            <span className="all-spots-guests">{obj.guests} {obj.guests === 1? "guest": "guests"}</span>
                            <h4 className="all-spots-price">{`$${getPrice(obj.price)} night`}</h4>
                            </NavLink>
                          </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}


export default SearchResults