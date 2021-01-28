import React, { Component } from "react";

class Carousel extends Component {
  state = {
    photos: [],
    // index of the selected one
    active: 0,
  };

  //this method must be static
  // it's going to take in a set of props and it'll give you back a new set of states
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    // we return watever object we want to be merged into the state
    return { photos };
  }

  // must be an arrow function so this = Component
  handleIndexClick = (event) => {
    this.setState({
      // the plus operator coerce the string into the number because active is an index of the active image
      active: +event.target.dataset.index,
    });
  };

  /* if I didnt have the babel set up for syntactic sugar I would need to fo the folowing:
  constructor(props) {
    super(props);

    // it's binding the context of handleIndexClick to be Carousel
    this.handleIndexClick = this.handleIndexClick.bind(this);
  }
  */

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
