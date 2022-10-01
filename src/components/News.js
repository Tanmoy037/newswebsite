import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import newsimage from "./newsImage.jpg";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [];

  capitaliz = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      currentlemgth: 6,
    };
    document.title = `${this.capitaliz(this.props.category)} - NewsBond`;
  }

  async componentDidMount() {
    this.props.setProgess(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=154ee2b242574d66b9784b411fed486c&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgess(40);
    let parsedData = await data.json();
    this.props.setProgess(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgess(100);
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });

    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=154ee2b242574d66b9784b411fed486c&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let newData = await data.json();

    this.setState({
      articles: this.state.articles.concat(newData.articles),
      currentlemgth: 6 * this.state.page,
      totalResults: newData.totalResults,
      loading: false,
    });
    console.log(
      this.state.currentlemgth + " results" + this.state.totalResults
    );
  };
  render() {
    return (
      <div className="container" style={{ marginTop: "90px" }}>
        <h1 className="text-center my-3">
          NewsBond - Top {this.props.category} headlines
        </h1>

        <InfiniteScroll
          // dataLength={this.state.aricle.length}
          dataLength={this.state.currentlemgth}
          next={this.fetchMoreData}
          hasMore={this.state.currentlemgth <= this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container" key={this.state.page}>
            <div className="row">
              {this.state.articles &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 30) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 60)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage ? element.urlToImage : newsimage
                        }
                        url={element.url}
                        author={element.source.name}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
//https://newsapi.org/v2/top-headlines?country=in&apiKey=36e1ad0f04c24bf185166544ceebcf98
