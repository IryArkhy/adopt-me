import { readFileSync } from "fs";
import path from "path";
import { act } from "@testing-library/react";

// mocked data
const breeds = [
  { name: "Bichon Frise" },
  { name: "Bolognese" },
  { name: "Bolonka" },
  { name: "Coton de Tulear" },
  { name: "Havanese" },
  { name: "Lowchen" },
  { name: "Maltese" },
];

// get some mock data from an API
// this makes sure that you get a file from the right directory. Inside the same directory we are going to have something called "res.json" and its gonna read from "res.json"
const doggos = JSON.parse(
  readFileSync(path.join(__dirname, "/res.json")).toString()
);

export const ANIMALS = ["dog", "cat", "bird"];
export const _breeds = breeds;
export const _dogs = doggos.animals;

// mock library
/*
const mock = {
  // spy function to check whether it has been called
  // we fill it with an implementation details
  breeds: jest.fn(() => {
    return {
      // then: function thenMockBreeds(callback) {
      //   return function insideThenMockBreeds() {
      //     callback({ breeds });
      //   };
      // },
      then: (callback) =>
        act(() => {
          callback({ _breeds });
        }),
    };
  }),
  animals: jest.fn(() => {
    return {
      then: (callback) =>
        act(() => {
          callback(doggos);
        }),
      // -- or --
      // then: function thenMockAnimals(callback) {
      //   return function insideThenMockAnimals() {
      //     callback(doggos);
      //   };
      // },
    };
  }),
};
*/
const mock = {
  breeds: jest.fn(() => {
    return {
      then: (callback) =>
        act(() => {
          callback({
            breeds,
          });
        }),
    };
  }),
  animals: jest.fn(() => {
    return {
      then: (callback) =>
        act(() => {
          callback(doggos);
        }),
    };
  }),
};
export default mock;
