import React, { useState, useEffect } from "react";
import useDropdown from "./useDropdown";
import pet, { ANIMALS } from "@frontendmasters/pet";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    pet.breeds(animal).then;
    return () => {
      cleanup;
    };
  }, [input]);

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
