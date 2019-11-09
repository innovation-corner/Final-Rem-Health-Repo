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
      let lab = index + 1;
      lab = lab.toString();
      let image =
        "https://res.cloudinary.com/neydoo/image/upload/c_scale,w_111/v1573286661/location_dot.png";
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.lat,
            lng: store.lng
          }}
          label={
            this.props.stores.length > 1 ? { text: lab, color: "red" } : null
          }
          icon={this.props.stores.length > 1 ? image : null}
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
