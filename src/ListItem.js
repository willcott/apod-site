import React from "react";
import axios from "axios";
import moment from "moment";
import config from './config/default.json';
import "./ListItem.css";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: config.API_KEY,
        date: moment().subtract(this.props.index, "days").format("YYYY-MM-DD"),
      },
    });
    this.props.onFullyLoaded(this.props.index);
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

  render() {
    const { error, isLoaded, info } = this.state;
    if (error) {
      return (
        <div>
          Error: {error.code}, {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return null;
    } else {
      return (
        <div className="list-item">
          <h3 className="list-item_date">{info.date}</h3>
          <h3 className="list-item_title">{info.title}</h3>
          {info.media_type === "image" && (
            <img src={info.url} alt={info.title} className="list-item_image" />
          )}
          {info.media_type === "video" && (
            <iframe
              title={info.title}
              className="list-item_image"
              src={info.url}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
            ></iframe>
          )}
        </div>
      );
    }
  }
}

export default ListItem;
