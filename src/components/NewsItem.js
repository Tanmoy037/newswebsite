import React, { Component } from "react";
// import PropTypes from "prop-types";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, date } = this.props;
    return (
      <div className="my-2">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} published at{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a href={url} target="_blank" className="btn btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
