import React from "react";
import "./Pagination.css";

class Pagination extends React.Component {
  handleClickBack = () => {
    if (this.props.page > 1) {
      this.props.onChange(this.props.page - 1);
    }
  };

  handleClickForward = () => {
    this.props.onChange(this.props.page + 1);
  };

  render() {
    return (
      <>
        <div className='pagination'>
          <div onClick={this.handleClickBack} className="pagination_arrow">
            {"<"}
          </div>
          {this.props.page > 1 && (
            <div className="pagination_page">{this.props.page - 1}</div>
          )}
          <div className="pagination_current-page">{this.props.page}</div>
          <div className="pagination_page">{this.props.page + 1}</div>
          <div onClick={this.handleClickForward} className="pagination_arrow">
            {">"}
          </div>
        </div>
      </>
    );
  }
}

export default Pagination;
