import React from "react";
import './Dropdown.css'

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <>
        <label>Page Size:</label>
        <select
          name={this.props.name}
          id={this.props.name}
          value={this.props.pageSize}
          onChange={this.handleChange}
          className='dropdown'
        >
          {this.props.values.map((current) => {
            return (
              <option value={current} key={current}>
                {current}
              </option>
            );
          })}
        </select>
        </>
    );
  }
}

export default Dropdown;
