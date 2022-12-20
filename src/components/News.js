import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export default class News extends Component {

static defaultProps = 
{
  country:'in',
  pageSize:6,
  category: 'general',
}

static propTypes = 
{
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

capitalizeFirstLetter= (string)=>
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    this.state =
    {
      articles: [],
      loading: true,
      page: 1,
      totalResult:0
    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=219e63872288454daf92f4e208c7f95e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({ articles: parseData.articles, 
      totalResult: parseData.totalResult,
      loading:false })
  }

  handleNextClick = async () => {
 
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)))
    {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=219e63872288454daf92f4e208c7f95e&page=${ this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      // console.log(parseData);
       this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading:false
  })
    }
}

 
handlePrevClick =async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=219e63872288454daf92f4e208c7f95e&page=${ this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
     this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading:false
     })

  }

  fetchMoreData = async () => {
    
    this.setState({page:this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=219e63872288454daf92f4e208c7f95e&page=${ this.state.page}&pageSize=${this.props.pageSize}`;
     
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
     this.setState({
      articles:this.state.articles.concat(parseData.articles),
      totalResult:parseData.totalResult,
     })

  };



  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>Top Headlines on {this.capitalizeFirstLetter(this.props.category)}  </h2>
        {this.state.loading && <Spinner/>} 

       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner/>}
        >
<div className="container">
     <div className="row">
{this.state.articles.map((element) => {

            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author?"unknown": element.author}  date={element.publishedAt} source={element.source.name}/>
            </div>

          })}



        </div>
        </div>
</InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Prev</button>


          <button className='btn btn-dark' onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} >Next &rarr;</button>
        </div> */}

      </div>
    )
  }
}




