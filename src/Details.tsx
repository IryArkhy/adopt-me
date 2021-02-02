import React, { Component } from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

// RouteComponentProps receives 2 parameter: props and state
class Details extends Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    name: "",
    animal: "",
    url: "",
    location: "",
    description: "",
    media: [] as Photo[],
    breed: "",
    showModal: false,
  };

  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    }

    pet
      .animal(+this.props.id)
      .then(({ animal }) =>
        this.setState({
          name: animal.name,
          url: animal.url,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        })
      )
      .catch((err: Error) => this.setState({ error: err }));
  }

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

// HOC
export default function DetailsWithErrorBoundry(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundry>
      <Details {...props} />
    </ErrorBoundry>
  );
}
