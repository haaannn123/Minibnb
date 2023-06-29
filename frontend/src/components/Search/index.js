import React, { useEffect, useRef, useState } from 'react';
import './Search.css';
import { useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSearchResults } from '../../store/spots';
import { NavLink } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!query){
      return
    }
    dispatch(thunkGetSearchResults(query))
    history.push(`/search/${query}`)
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search destinations"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

export default SearchBar;
