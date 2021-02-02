import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
  FormEvent,
  ChangeEvent,
} from "react";
import { RouteComponentProps } from "@reach/router";
import useDropdown from "./useDropdown";
import pet, { ANIMALS, Animal } from "@frontendmasters/pet";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [pets, setPets] = useState([] as Animal[]);
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({ location, breed, type: animal });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds: breedsArray }) => {
      const breedStrings = breedsArray.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreeds, setBreed]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    requestPets();
  }

  const handleLocationChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setLocation(target.value);

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
