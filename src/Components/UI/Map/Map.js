import React, { Component, Fragment } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Modal from "../../hoc/Modal";

const mapStyles = {
  width: "100%",
  height: "1000%",
  left: "10%"
};

export class MapContainer extends Component {
  displayMarkers = () => {
    return this.props.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.lat,
            lng: store.lng
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.shows} clicked={this.props.clicked}>
          <Map
            google={this.props.google}
            zoom={this.props.zoom || 15}
            style={mapStyles}
            center={this.props.stores[0]}
            initialCenter={this.props.stores[0]}
          >
            {this.displayMarkers()}
          </Map>
        </Modal>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAND-UoTmcxem4fPt3xbAR3-7IhT7-xdgE"
})(MapContainer);
