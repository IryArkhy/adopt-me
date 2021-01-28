import { createContext } from "react";

//the function after color is a pleceholder which will be used if there is no Provider above it.
// Default state = "green" это может быть и обьект и массив, все что угодно в зависимости от потребностей.
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
