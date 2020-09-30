import React from "react";
import axios from "axios";
import moment from "moment";
import config from './config/default.json';
import "./HeroImage.css";

class HeroImage extends React.Component {
  constructor() {
    super();
    this.state = { showingMoreInfo: false };
  }

  componentDidMount = async () => {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: config.API_KEY,
        date: moment().format("YYYY-MM-DD"),
      },
    });

    if (response.status === 200) {
      this.setState({ isLoaded: true, info: response.data });
    } else {
      this.setState({
        isLoaded: true,
        error: {
          code: response.status,
          message: response.statusText,
        },
      });
    }
  };

  handleMoreInfoClick = () => {
    this.setState({ showingMoreInfo: true });
  };

  handleLessInfoClick = () => {
    this.setState({ showingMoreInfo: false });
  };

  render() {
    const { error, isLoaded, info } = this.state;
    if (error) {
      return (
        <div>
          Error: {error.code}, {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <h2>{info.title}</h2>
          {info.media_type === "image" && (
            <img src={info.hdurl} alt={info.title} className="hero-image" />
          )}
          {info.media_type === "video" && (
            <iframe
              title={info.title}
              className="hero-image"
              src={info.url}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
            ></iframe>
          )}
          <div
            className={
              this.state.showingMoreInfo
                ? "hero-image_caption_visible"
                : "hero-image_caption_hidden"
            }
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {info.explanation}
          </div>
          <div
            onClick={
              this.state.showingMoreInfo
                ? this.handleLessInfoClick
                : this.handleMoreInfoClick
            }
            className='info-button'
          >
            {this.state.showingMoreInfo ? "Less Info" : "More Info"}
          </div>
        </>
      );
    }
  }
}

export default HeroImage;
