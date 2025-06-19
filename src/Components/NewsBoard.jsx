import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noMoreData, setNoMoreData] = useState(false);

  const apiKey = '00654db19d91db0075fcb6dc3d4413ac';
  const pageSize = 9;

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&page=${page}&max=${pageSize}&token=${apiKey}`;
      if (category !== 'general') {
        url = `https://gnews.io/api/v4/search?q=${category}&country=in&lang=en&page=${page}&max=${pageSize}&token=${apiKey}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      // Filter out duplicates
      const newArticles = data.articles.filter(
        (newItem) => !articles.some((existingItem) => existingItem.url === newItem.url)
      );

      if (newArticles.length === 0) {
        setNoMoreData(true);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to fetch news.');
    }
    setLoading(false);
  };

  useEffect(() => {
    // Reset everything on category change
    setArticles([]);
    setPage(1);
    setNoMoreData(false);
  }, [category]);

  useEffect(() => {
    fetchArticles();
  }, [category, page]);

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container my-3">
      <h3 className="text-center text-dark">
        Get Latest <span className="badge bg-danger text-light">Indian News</span>
      </h3>

      {loading && <Spinner />}

      <div className="row">
        {!loading &&
          articles.map((element) => (
            <div className="col-md-4 mb-3" key={element.url}>
              <NewsItem
                title={element.title}
                description={element.content}
                imageUrl={element.image}
                newsUrl={element.url}
              />
            </div>
          ))}
      </div>

      <div className="container d-flex justify-content-between my-4">
        <button
          disabled={page === 1 || loading}
          className="btn btn-dark"
          onClick={() => setPage(page - 1)}
        >
          &larr; Previous
        </button>

        <button
          disabled={noMoreData || loading}
          className="btn btn-dark"
          onClick={() => setPage(page + 1)}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default NewsBoard;
