import React, { useState, useEffect } from "react";
import useDropdown from "./useDropdown";
import pet, { ANIMALS } from "@frontendmasters/pet";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  // useEffect is disconnected from when the render is happening. useEffect is scheduling this function to run after the render happens. So: first render -> useEffect function (but not immidiately, after some time)
  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error); // same as (err) => console.error(err)
  }, [animal, setBreeds, setBreed]);

  const handleLocationChange = ({ target }) => setLocation(target.value);
  return (
    <div className="search-params">
      <form>
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
