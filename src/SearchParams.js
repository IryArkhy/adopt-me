import React, { useState, useEffect } from "react";
import useDropdown from "./useDropdown";
import { connect } from "react-redux";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import changeLocation from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";

const SearchParams = (props) => {
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location: props.location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreeds, setBreed]);

  function handleSubmit(e) {
    e.preventDefault();
    requestPets();
  }

  const handleLocationChange = ({ target }) =>
    props.updateLocation(target.value);

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Loaction
          <input
            onChange={handleLocationChange}
            id="location"
            value={props.location}
            placeholder="Location"
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={props.theme}
            onChange={(e) => props.updateTheme(e.target.value)}
            onBlur={(e) => props.updateTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="yellow">Yellow</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

const mstp = ({ theme, location }) => ({
  theme,
  location,
});

const mdtp = (dispatch) => ({
  updateLocation: (location) => dispatch(changeLocation(location)),
  updateTheme: (theme) => dispatch(changeTheme(theme)),
});

export default connect(mstp, mdtp)(SearchParams);
