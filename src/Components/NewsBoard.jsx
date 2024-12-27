import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
const NewsBoard = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);  
    const [page,setPage]=useState(1);
    const [totalResults, setTotalResults] = useState(0); 
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=20&apiKey=d27bf13b3d8548d8950b00c24c1ef33d`;
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setArticles(data.articles || []);  
                setTotalResults(data.totalResults || 0);  
                setLoading(false);

            } catch (err) {
                console.error(err);
                setError("Failed to fetch news. Please try again later.");
            }
        };
        fetchArticles();
    }, [category,page]);

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }
 const  handlePrevClick= async()=>{
    if(! page+1 > Math.ceil(totalResults/20)){ 

   
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page-1}&pageSize=20&apiKey=d27bf13b3d8548d8950b00c24c1ef33d`;
            setLoading(true);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setArticles(data.articles || []);  
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch news. Please try again later.");
        }
    }

    };
  const   handleNextClick=async()=>{

    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page+1}&pageSize=20&apiKey=d27bf13b3d8548d8950b00c24c1ef33d`;
        setLoading(true);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setArticles(data.articles || []);  
        setLoading(false);
    } catch (err) {
        console.error(err);
        setError("Failed to fetch news. Please try again later.");
    }
    };

    return (
        <div className="container my-3">
            <h3 className="text-center text-light">
                Get Latest <span className="badge bg-danger text-light">News</span>
            </h3>
            { loading && < Spinner/>}
            <div className="row">
                {!loading && articles.map((element) => (
                    <div className="col-md-4" key={element.url}>
                        <NewsItem
                            title={element.title ? element.title.slice(0, 50) : "Latest news"}
                            description={element.description ? element.description.slice(0, 100) : "Get the latest news from all over the world. Stay informed with our updates."}
                            imageUrl={element.urlToImage || "https://via.placeholder.com/150"}
                            newsUrl={element.url}
                        />
                    </div>
                ))}
            </div>
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={page==1} className="btn btn-dark  " onClick={handlePrevClick}> &larr; Back</button>
            <button type="button" disabled={page+1 > Math.ceil(totalResults/20)} className="btn btn-dark " onClick={handleNextClick}>Next &rarr; </button>
            </div>
        </div>
    );
};

export default NewsBoard;
