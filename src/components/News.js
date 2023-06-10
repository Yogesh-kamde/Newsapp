import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
 
  constructor(){
    super();
    console.log("Hello Im a constructor from news.js")
    this.state ={
      articles:[],
      loading:false,
      page:1,
      totalResults :0
    }
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.props.apikey}`;
    this.setState({loading: true});
    let data = await fetch(url)
    let parsedata = await data.json()
    console.log(parsedata);
    this.setState({articles: parsedata.articles, totalResults: parsedata.totalResults})
  }

  async componentDidMount(){
  // console.log("CDM")
  this.updateNews();
  // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fe330dea57d843d384884a9b0276b54e`;
  // let data = await fetch(url)
  // let parsedata = await data.json()
  // console.log(parsedata);
  // this.setState({articles: parsedata.articles, totalResults: parsedata.totalResults})
}

 handleNextClick =async()=>{
  // if(this.state.page +1 >Math.ceil(this.state.totalResults/20)){
  // // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=b{country}iness&apiKey=fe330dea57d843d384884a9b0276b54e&page=${this.state.page+1}&pageSize=20`;
  // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fe330dea57d843d384884a9b0276b54e&page=${this.state.page + 1}`;
  // let data = await fetch(url)
  // let parsedata = await data.json()
  // console.log(parsedata);
  // this.setState({
  //   page:this.state.page + 1,
  //   articles: parsedata.articles
  // })}
  this.setState({page: this.state.page + 1});
  this.updateNews();
 }
 handlePrevClick =async()=>{
  // let url = `https://newsapi.org/v2/top-headlines?country={country}&category=b{country}iness&apiKey=fe330dea57d843d384884a9b0276b54e&page=${this.state.page-1}&pageSize=20`;
  // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fe330dea57d843d384884a9b0276b54e&page=${this.state.page - 1}`;
  // let data = await fetch(url)
  // let parsedata = await data.json()
  // console.log(parsedata);
  // this.setState({
  //   page:this.state.page - 1,
  //   articles: parsedata.articles
  // })
  this.setState({page: this.state.page - 1});
  this.updateNews();
 }
  fetchMoreData =async()=>{
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.props.apikey}`;
    this.setState({loading: true});
    let data = await fetch(url)
    let parsedata = await data.json()
    // console.log(parsedata);
    this.setState({articles: this.state.articles.concat(parsedata.articles) , totalResults: parsedata.totalResults})
    // this.updateNews();
  };
  render() {
    return (
      <div className='container'>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
        return <div className="col-md-4" key ={element.url}>
        <NewsItem  title = {element.title?element.title:""} description={element.description?element.description:""} imageUrl= {element.urlToImage} newsUrl={element.url}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex j{country}tify-content-between" >
        <button  disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; prev</button>
        <button   type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div> */}
        
      </div>
    )
  }
}

export default News