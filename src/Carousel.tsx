import { Photo } from "@frontendmasters/pet";
import React, { Component } from "react";

interface IProps {
  media: Photo[];
}

interface IState {
  active: number;
  photos: string[];
}

class Carousel extends Component<IProps, IState> {
  public state = {
    photos: [],
    active: 0,
  };

  public static getDerivedStateFromProps({ media }: IProps) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  };

  public render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
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
