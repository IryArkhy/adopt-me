import React, { Component } from "react";
import pet from "@frontendmasters/pet";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBoundary";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, name: "", showModal: false };

  componentDidMount() {
    pet.animal(this.props.id).then(
      ({ animal }) =>
        this.setState({
          name: animal.name,
          url: animal.url,
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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => navigate(this.state.url);

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
          <button
            style={{ backgroundColor: this.props.theme }}
            onClick={this.toggleModal}
          >
            Adopt {name}
          </button>
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
const mstp = ({ theme }) => ({
  theme,
});

const WrappedDetails = connect(mstp)(Details);

export default function DetailsWithErrorBoundry(props) {
  return (
    <ErrorBoundry>
      <WrappedDetails {...props} />
    </ErrorBoundry>
  );
}
