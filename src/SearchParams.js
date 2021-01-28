import React, { useState, useEffect, useContext } from "react";
import useDropdown from "./useDropdown";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  // async functions return a Promise
  async function requestPets() {
    const { animals } = await pet.animals({ location, breed, type: animal });

    setPets(animals || []);
  }

  // useEffect is disconnected from when the render is happening. useEffect is scheduling this function to run after the render happens. So: first render -> useEffect function (but not immidiately, after some time)
  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error); // same as (err) => console.error(err)
  }, [animal, setBreeds, setBreed]);

  function handleSubmit(e) {
    e.preventDefault();
    requestPets();
  }

  const handleLocationChange = ({ target }) => setLocation(target.value);
  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Loaction
          <input
            onChange={handleLocationChange}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          ThemeContext
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="yellow">Yellow</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
