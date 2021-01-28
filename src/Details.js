import React, { Component } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  // вот этот синтаксис очень неудобный. Чтобы писать меньше кода - нужно настроить babel
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     loading: true,
  //   };
  // }

  // with babel it'll look like this
  state = { loading: true, name: "" };

  componentDidMount() {
    // throw new Error("Check error Boundry component");
    // runs only once when I first get created
    // AJAX request

    //!!! it's required to use an arrow function here
    // if I use a regular function it'll create a new context and this != Details Component
    // arrow functions do not create a new context
    pet.animal(this.props.id).then(
      ({ animal }) =>
        this.setState({
          // shalow merge: Object.assign(oldState, newState). If I have nested objects - they will NOT be overwritten so setState does only top level
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        }),
      console.error
    );
  }

  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }
    const { animal, breed, location, description, name, media } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          {/* Using Context with Class Components */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// HOC
export default function DetailsWithErrorBoundry(props) {
  return (
    <ErrorBoundry>
      <Details {...props} />
    </ErrorBoundry>
  );
}
