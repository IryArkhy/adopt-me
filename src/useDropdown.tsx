import React, {
  useState,
  FunctionComponent,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from "react";

const useDropdown = (
  label: string,
  defaultState: string,
  options: string[]
) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace("", "").toLowerCase()}`;

  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) =>
    setState(target.value);

  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={handleChange}
        onBlur={handleChange}
        disabled={!options.length}
      >
        <option>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );

  // because you return an array and do not write return typings, when you import the hook the TS will always assume that these things are out of order. This is why you have to state return type to convince TS that its gonna be these things in this order
  return [state, Dropdown, setState] as [
    string,
    FunctionComponent,
    Dispatch<SetStateAction<string>>
  ];
};

export default useDropdown;
