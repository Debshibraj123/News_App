import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
   let {title,description, imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div>
       <div className="card" style={{width: "18rem"}}>
       <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{
        left:'85%',
        zIndex:'1'
         }}>
     {source}
  </span>

  <img src= {!imageUrl?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}  </h5>
    <p className="card-text">{description}</p>
    <p className='card-text text-blue'><small>By  {author} <br />on {date}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
