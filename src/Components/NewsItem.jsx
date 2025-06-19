import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl }) => {
  const default_image = '/Assets/image_converted.jpg';


  const handleImageError = (e) => {
    e.target.src = default_image;
  };

  return (
    <div className="container my-3">
      <div className="card h-100" style={{ width: "18rem" }}>
        <img 
          src={imageUrl || default_image} 
          className="card-img-top" 
          alt="News Thumbnail"
          onError={handleImageError}
          style={{ objectFit: 'cover', height: '200px' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{title ? title.slice(0, 50) : 'Latest News'}...</h5>
          <p className="card-text">{description ? description.slice(0, 100) : 'Stay informed with our latest updates'}...</p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">Read more...</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
