import React from "react";
import ListItem from "./ListItem";
import Pagination from "./Pagination";
import Dropdown from "./Dropdown";

class PastImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      listItemsLoaded: [],
      pageSize: this.props.pastImageCount,
    };
  }

  handlePageChange = (page) => {
    this.setState({
      page: page,
    });
    console.log(this.state);
  };

  handleFullyLoaded = (index) => {
    const listItemsLoaded = this.state.listItemsLoaded;
    listItemsLoaded[index] = true;
    this.setState({
      listItemsLoaded: listItemsLoaded,
    });
  };

  handlePageSizeChange = (size) => {
    this.setState({
      pageSize: parseInt(size, 10),
    });
  };

  allItemsLoaded = () => {
    const checkArray = [...Array(this.state.pageSize).keys()].map((index) =>
      this.state.listItemsLoaded[
        index + (this.state.page - 1) * this.state.pageSize + 1
      ]
        ? true
        : false
    );
    console.log(!checkArray.includes(false));
    return !checkArray.includes(false);
  };

  render() {
    return (
      <>
        <Pagination
          page={this.state.page}
          onChange={this.handlePageChange}
        ></Pagination>
        <Dropdown
          name={"pageSize"}
          values={[5, 10, 20, 50]}
          pageSize={this.state.pageSize}
          onChange={this.handlePageSizeChange}
        ></Dropdown>

        {!this.allItemsLoaded() && <p>Loading...</p>}
        <div className={this.allItemsLoaded() ? "visible" : "hidden"}>
          {[...Array(this.state.pageSize).keys()].map((index) => {
            return (
              <ListItem
                key={index + (this.state.page - 1) * this.state.pageSize + 1}
                index={index + (this.state.page - 1) * this.state.pageSize + 1}
                onFullyLoaded={this.handleFullyLoaded}
              ></ListItem>
            );
          })}
        </div>

        <Pagination
          page={this.state.page}
          onChange={this.handlePageChange}
        ></Pagination>
      </>
    );
  }
}

export default PastImages;
